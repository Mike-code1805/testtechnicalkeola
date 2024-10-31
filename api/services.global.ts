import { publicRequest } from './requestMethods';
import { GlobalGetServiceSuccessProps } from './services.global.interface';

export const globalGetService = async () => {
  console.log('IM IN globalGetService');
  const response = await publicRequest.get<GlobalGetServiceSuccessProps>(`global`);
  return response.data;
};
