import { userRequest } from './requestMethods';
import {
  CreateOneOrderServiceDataProps,
  CreateOneOrderServiceSuccessProps,
  GetAllOrdersByUserIdServiceSuccessProps,
} from './services.order.interface';

export const createOneOrderService = async (data: CreateOneOrderServiceDataProps) => {
  console.log('IM IN createOneOrderService');
  const response = await userRequest.post<CreateOneOrderServiceSuccessProps[]>(`order`, data);
  return response.data;
};

export const getAllOrdersByUserIdService = async () => {
  console.log('IM IN getAllOrdersByUserIdService');
  const response = await userRequest.get<GetAllOrdersByUserIdServiceSuccessProps[]>(`order`);
  return response.data;
};
