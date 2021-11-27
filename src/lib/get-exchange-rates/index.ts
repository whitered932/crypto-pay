import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';

export const getExchangeRates = (instance: AxiosInstance, token: string) => async () => {
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getExchangeRates`);
  return getResultOrFail(data);
};
