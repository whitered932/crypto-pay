import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../common';
import { Asset } from '../common';

export interface CreateInvoice {
  asset: Asset;
  amount: string | number;
  description?: string;
  paid_btn_name?: "viewItem" | "openChannel" | "openBot" | "callback";
  paid_btn_url?: string;
  payload?: string;
}

export const createInvoice = (instance: AxiosInstance, token: string) => async (values: CreateInvoice) => {
  const { data } = (await instance.post(`app${token}/createInvoice`, values)) as AxiosResponse<ResponseData>;
  return getResultOrFail(data);
};
