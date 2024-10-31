import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import { StatusIsLoadingProps } from '@/interfaces';

export interface productState {
  isLoading: StatusIsLoadingProps;
  productData: GetAllProductsServiceSuccessProps[];
}

type productAction =
  | {
      type: 'setProductData';
      payload: GetAllProductsServiceSuccessProps[];
    }
  | {
      type: 'setIsLoading';
      payload: StatusIsLoadingProps;
    };

export const productReducer = (state: productState, action: productAction): productState => {
  switch (action.type) {
    case 'setProductData':
      return { ...state, productData: action.payload };

    case 'setIsLoading':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
