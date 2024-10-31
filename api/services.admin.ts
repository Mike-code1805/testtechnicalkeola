import { userRequest } from './requestMethods';
import {
  GetOneOrderByIdServiceSuccessProps,
  UpdateOneOrderServiceDataProps,
  UpdateOneOrderServiceSuccessProps,
  AdminGetAllOrdersByUserIdServiceSuccessProps,
} from './services.admin.interface';

export const adminGetAllOrdersByUserIdService = async () => {
  console.log('IM IN adminGetAllOrdersByUserIdService');
  const response = await userRequest.get<AdminGetAllOrdersByUserIdServiceSuccessProps[]>(`admin/order`);
  return response.data;
};

export const getOneOrderByIdService = async (id: string) => {
  console.log('IM IN getOneOrderByIdService');
  const response = await userRequest.get<GetOneOrderByIdServiceSuccessProps>(`order/${id}`);
  return response.data;
};

export const updateOneOrderService = async (id: string, data: UpdateOneOrderServiceDataProps) => {
  console.log('IM IN updateOneOrderService');
  const response = await userRequest.put<UpdateOneOrderServiceSuccessProps>(`order/${id}`, data);
  return response.data;
};
