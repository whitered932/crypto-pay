import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../@common';
import { ConfirmPayment } from '../../index';

export default (instance: AxiosInstance, token: string) => async (values: ConfirmPayment) => {
  const { data }: AxiosResponse<ResponseData> = await instance.post(`app${token}/confirmPayment`, values);
  return getResultOrFail(data);
}