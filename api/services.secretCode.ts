import { userRequest } from './requestMethods';
import {
  SecretCodeGenerateServiceSuccessProps,
  SecretCodeRegenerateServiceSuccessProps,
  SecretCodeValidateServiceDataProps,
  SecretCodeValidateServiceSuccessProps,
} from './services.secretCode.interface';

export const secretCodeGenerateService = async (email: string) => {
  console.log('IM IN secretCodeGenerateService');
  const response = await userRequest.post<SecretCodeGenerateServiceSuccessProps>(`secretCode/generate`, { email });
  return response.data;
};

export const secretCodeRegenerateService = async (email: string) => {
  console.log('IM IN secretCodeRegenerateService');
  const response = await userRequest.post<SecretCodeRegenerateServiceSuccessProps>(`secretCode/regenerate`, { email });
  return response.data;
};

export const secretCodeValidateService = async (data: SecretCodeValidateServiceDataProps) => {
  console.log('IM IN secretCodeValidateService');
  const response = await userRequest.post<SecretCodeValidateServiceSuccessProps>(`secretCode/validate`, data);
  return response.data;
};
