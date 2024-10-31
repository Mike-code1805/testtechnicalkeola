import React, { createContext, useEffect, useReducer } from 'react';
import { authReducer, authState } from './authReducer';
import { authLoginUserService, authSignupUserService } from '@/api';
import { AuthLoginUserServiceDataProps, AuthSignupUserServiceDataProps } from '@/api/services.auth.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authValidateTokenUserService } from '@/api/services.auth';

type AuthContextProps = {
  id: string;
  authToken: string;
  username: string;
  lastname: string;
  email: string;
  type_user: 'normal' | 'deliveryman' | 'admin' | 'none';
  handleAuthLoginUserService: (
    data: AuthLoginUserServiceDataProps
  ) => Promise<'normal' | 'deliveryman' | 'admin' | 'none'>;
  handleAuthSignupUserService: (
    data: AuthSignupUserServiceDataProps
  ) => Promise<'normal' | 'deliveryman' | 'admin' | 'none'>;
  handleAuthLogoutUserService: () => Promise<void>;
  handleVerifyToken: () => Promise<'normal' | 'deliveryman' | 'admin' | 'none'>;
};

const authInicialState: authState = {
  id: '',
  authToken: '',
  username: '',
  lastname: '',
  email: '',
  type_user: 'none',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  const handleVerifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        dispatch({
          type: 'setIdAuthTokenUsername',
          payload: { id: '', authToken: '', username: '', lastname: '', email: '', type_user: 'none' },
        });
        return 'none';
      }
      const response = await authValidateTokenUserService();

      if (response.status !== 200) {
        dispatch({
          type: 'setIdAuthTokenUsername',
          payload: { id: '', authToken: '', username: '', lastname: '', email: '', type_user: 'none' },
        });
        return 'none';
      }
      await AsyncStorage.setItem('token', response.data.authToken);
      dispatch({ type: 'setIdAuthTokenUsername', payload: response.data });
      return response.data.type_user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  const handleAuthLoginUserService = async (data: AuthLoginUserServiceDataProps) => {
    try {
      const response = await authLoginUserService(data);
      await AsyncStorage.setItem('token', response.authToken);
      await AsyncStorage.setItem('previousRoute', 'LoginScreen');
      dispatch({ type: 'setIdAuthTokenUsername', payload: response });
      return response.type_user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleAuthSignupUserService = async (data: AuthSignupUserServiceDataProps) => {
    try {
      const response = await authSignupUserService(data);
      await AsyncStorage.setItem('token', response.authToken);
      await AsyncStorage.setItem('previousRoute', 'LoginScreen');
      dispatch({ type: 'setIdAuthTokenUsername', payload: response });
      return response.type_user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleAuthLogoutUserService = async () => {
    try {
      await AsyncStorage.removeItem('token');
      dispatch({
        type: 'setIdAuthTokenUsername',
        payload: { id: '', authToken: '', username: '', lastname: '', email: '', type_user: 'none' },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleAuthLoginUserService,
        handleAuthSignupUserService,
        handleAuthLogoutUserService,
        handleVerifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
