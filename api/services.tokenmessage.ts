import { userRequest } from './requestMethods';
import {
  TokenmessageCreateServiceDataProps,
  TokenmessageCreateServiceSuccessProps,
} from './services.tokenmessage.interface';

export const tokenmessageCreateService = async (data: TokenmessageCreateServiceDataProps) => {
  console.log('IM IN tokenmessageCreateService');
  const response = await userRequest.post<TokenmessageCreateServiceSuccessProps>(`tokenmessage`, data);
  return response.data;
};
