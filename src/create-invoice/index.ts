import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../@common';
import { CreateInvoice } from '../index';

export default (instance: AxiosInstance, token: string) => async (values: CreateInvoice) => {
  const { data } = (await instance.post(`app${token}/createInvoice`, values)) as AxiosResponse<ResponseData>;
  return getResultOrFail(data);
};
