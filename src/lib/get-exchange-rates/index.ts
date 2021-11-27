import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';

export default (instance: AxiosInstance, token: string) => async () => {
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getExchangeRates`);
  return getResultOrFail(data);
};
