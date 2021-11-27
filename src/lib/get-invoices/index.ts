import * as queryString from 'querystring';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Asset, Status, getResultOrFail, ResponseData } from '../common';

export interface GetInvoices {
  asset: Asset;
  invoice_ids?: Array<string | number>;
  status?: Status;
  offset?: number;
  count?: number;
}

export const getInvoices = (instance: AxiosInstance, token: string) => async (values: GetInvoices) => {
  let qs: string;
  if (values.invoice_ids) {
    qs = queryString.stringify({ ...values, invoice_ids: values.invoice_ids?.join(',') });
  } else {
    qs = queryString.stringify(values as any);
  }
  const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getInvoices?${qs}`);
  return getResultOrFail(data);
};
