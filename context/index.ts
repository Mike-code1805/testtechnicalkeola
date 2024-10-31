import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { ActionBurguerContext } from './ActionBurguerContext';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import { ProductContext } from './ProductContext';

export const useActionBurguerContext = () => {
  return useContext(ActionBurguerContext);
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
