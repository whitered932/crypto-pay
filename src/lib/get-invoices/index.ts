import * as queryString from 'querystring';
import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../@common';
import { GetInvoices } from '../../index';

export default (instance: AxiosInstance, token: string) => async (values: GetInvoices) => {
  let qs: string;
  if (values.invoice_ids) {
    qs = queryString.stringify({ ...values, invoice_ids: values.invoice_ids?.join(',') });
  } else {
    qs = queryString.stringify(values as any);
  }
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getInvoices?${qs}`);
  return getResultOrFail(data);
};
