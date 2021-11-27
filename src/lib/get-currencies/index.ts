import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';

export const getCurrencies = (instance: AxiosInstance, token: string) => async () => {
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getCurrencies`);
  return getResultOrFail(data);
};
