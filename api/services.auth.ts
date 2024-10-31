import { publicRequest, userRequest } from './requestMethods';
import {
  AuthSignupUserServiceSuccessProps,
  AuthSignupUserServiceDataProps,
  AuthLoginUserServiceDataProps,
  AuthLoginUserServiceSuccessProps,
  AuthValidateTokenUserServiceSuccessProps,
  AuthVerifyEmailServiceSuccessProps,
} from './services.auth.interface';

export const authLoginUserService = async (data: AuthLoginUserServiceDataProps) => {
  console.log('IM IN authLoginUserService', data);
  const response = await publicRequest.post<AuthLoginUserServiceSuccessProps>(`auth/login`, data);
  return response.data;
};

export const authSignupUserService = async (data: AuthSignupUserServiceDataProps) => {
  console.log('IM IN authSignupUserService');
  const response = await publicRequest.post<AuthSignupUserServiceSuccessProps>(`auth/register`, data);
  return response.data;
};

export const authValidateTokenUserService = async () => {
  console.log('IM IN authValidateTokenUserService');
  const response = await userRequest.get<AuthValidateTokenUserServiceSuccessProps>(`auth`);
  return response;
};

export const authVerifyEmailService = async (email: string) => {
  console.log('IM IN authVerifyEmailService');
  const response = await userRequest.post<AuthVerifyEmailServiceSuccessProps>(`auth/verifyemail`, { email });
  return response.data;
};
