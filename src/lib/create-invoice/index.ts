import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';
import { Asset } from '../common';

export interface CreateInvoice {
  asset: Asset;
  amount: string;
  // TODO: max length 1024 chars
  description?: string;
  paid_btn_name?: string;
  paid_btn_url?: string;
  payload?: string;
}

export const createInvoice = (instance: AxiosInstance, token: string) => async (values: CreateInvoice) => {
  const { data } = (await instance.post(`app${token}/createInvoice`, values)) as AxiosResponse<ResponseData>;
  return getResultOrFail(data);
};
