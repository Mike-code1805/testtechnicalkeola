import { userRequest } from './requestMethods';
import { GetAllProductsServiceSuccessProps } from './services.product.interface';

export const getAllProductsService = async () => {
  console.log('IM IN getAllProductsService');
  const response = await userRequest.get<GetAllProductsServiceSuccessProps[]>(`products`);
  return response.data;
};
