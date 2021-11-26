import axios, { AxiosResponse } from 'axios';
import * as queryString from 'querystring';

export enum Asset {
  BTC = 'BTC',
  TON = 'TON',
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
}

export enum Status {
  ACTIVE = 'active',
  PAID = 'paid',
}

export interface CreateInvoice {
  asset: Asset;
  amount: string;
  // TODO: max length 1024 chars
  description?: string;
  paid_btn_name?: string;
  paid_btn_url?: string;
  payload?: string;
}

export interface GetInvoices {
  asset: Asset;
  invoice_ids?: string[];
  status?: Status;
  offset?: number;
  count?: number;
}

export interface GetPayments {
  offset?: number;
  count?: number;
}

export interface ConfirmPayment {
  invoice_id: number;
}

interface ResponseData<T = any> {
  ok: boolean;
  error?: {
    code: number;
    name: string;
  };
  result: T;
}

const getDataOrFail = (responseData: ResponseData) => {
  if (!responseData.ok) {
    throw new Error(`${responseData.error?.name} ${responseData.error?.code}`);
  }
  return responseData.result;
};

export default (token: string, net: 'main' | 'test' = 'main') => {
  const url = net === 'main' ? 'https://pay.crypt.bot/' : 'https://testnet-pay.crypt.bot/';
  const instance = axios.create({
    baseURL: url,
  });

  return {
    getMe: async () => {
      const { data } = (await instance.get(`app${token}/getMe`)) as AxiosResponse<ResponseData>;
      return getDataOrFail(data);
    },
    createInvoice: async (values: CreateInvoice) => {
      const { data } = (await instance.post(`app${token}/createInvoice`, values)) as AxiosResponse<ResponseData>;
      return getDataOrFail(data);
    },
    getInvoices: async (values: GetInvoices) => {
      const preparedIds = values.invoice_ids?.join(',');
      const qs = queryString.stringify({ ...values, invoice_ids: preparedIds });
      const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getInvoices?${qs}`);
      return getDataOrFail(data);
    },
    getPayments: async (values: GetPayments) => {
      const qs = queryString.stringify(values as any);
      const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getPayments?${qs}`);
      return getDataOrFail(data);
    },
    confirmPayment: async (values: ConfirmPayment) => {
      const { data }: AxiosResponse<ResponseData> = await instance.post(`app${token}/confirmPayment`, values);
      return getDataOrFail(data);
    },
    getBalance: async () => {
      const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getBalance`);
      return getDataOrFail(data);
    },
    getExchangeRates: async () => {
      const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getExchangeRates`);
      return getDataOrFail(data);
    },
    getCurrencies: async () => {
      const { data }: AxiosResponse<ResponseData> = await instance.get(`app${token}/getCurrencies`);
      return getDataOrFail(data);
    },
  };
};
