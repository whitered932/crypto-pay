import { AxiosInstance, AxiosResponse } from 'axios';
import * as queryString from 'querystring';
import { getResultOrFail, ResponseData } from '../@common';
import { GetPayments } from '../../index';

export default (instance: AxiosInstance, token: string) => async (values: GetPayments) => {
  const qs = queryString.stringify(values as any);
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getPayments?${qs}`);
  return getResultOrFail(data);
};
