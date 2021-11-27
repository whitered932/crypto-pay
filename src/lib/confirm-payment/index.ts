import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';

export interface ConfirmPayment {
  invoice_id: number;
}

export const confirmPayment = (instance: AxiosInstance, token: string) => async (invoice_id: number) => {
  const { data }: AxiosResponse<ResponseData> = await instance.post(`app${token}/confirmPayment`, { invoice_id });
  return getResultOrFail(data);
};
