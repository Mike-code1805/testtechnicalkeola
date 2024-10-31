import React, { createContext, useEffect, useReducer, useState } from 'react';
import { productReducer, productState } from './productReducer';
import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import { useDebouncedValue, useNavigationHook } from '@/hooks';
import { getAllProductsService } from '@/api';
import { Alert } from 'react-native';
import { MESSAGE_AUTH_TOKEN_NOT_FOUND } from '@/constants';
import { StatusIsLoadingProps } from '@/interfaces';

type ProductContextProps = {
  productData: GetAllProductsServiceSuccessProps[];
  isLoading: StatusIsLoadingProps;
  setIsLoading: (payload: StatusIsLoadingProps) => void;
  handleGetAllProductsService: () => Promise<void>;
};

const authInicialState: productState = {
  productData: [],
  isLoading: 'neutral',
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(productReducer, authInicialState);

  useEffect(() => {
    handleGetAllProductsService();
  }, []);

  const handleGetAllProductsService = async (): Promise<void> => {
    try {
      dispatch({ type: 'setProductData', payload: [] });
      dispatch({ type: 'setIsLoading', payload: 'checking' });

      const response = await getAllProductsService();
      console.log(response);
      dispatch({ type: 'setProductData', payload: response });
      dispatch({ type: 'setIsLoading', payload: 'success' });
    } catch (error: any) {
      console.log(error);
      dispatch({ type: 'setIsLoading', payload: 'failed' });
    }
  };

  const setIsLoading = (payload: StatusIsLoadingProps) => dispatch({ type: 'setIsLoading', payload });

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setIsLoading,
        handleGetAllProductsService,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
