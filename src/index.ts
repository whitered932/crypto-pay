import axios from 'axios';
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

export default (token: string, net: 'main' | 'test' = 'main') => {
  const url = net === 'main' ? 'https://pay.crypt.bot/' : 'https://testnet-pay.crypt.bot/';
  const instance = axios.create({
    baseURL: url,
  });

  return {
    getMe: async () => {
      const response = await instance.get(`app${token}/getMe`);
      return response.data;
    },
    createInvoice: async (values: CreateInvoice) => {
      const res = await instance.post<CreateInvoice>(`app${token}/createInvoice`, values);
      return res.data;
    },
    getInvoices: async (values: GetInvoices) => {
      const preparedIds = values.invoice_ids?.join(',');
      const qs = queryString.stringify({ ...values, invoice_ids: preparedIds });
      const res = await instance.get(`app${token}/getInvoices?${qs}`);
      return res.data;
    },
    getPayments: async (values: GetPayments) => {
      const qs = queryString.stringify(values as any);
      const res = await instance.get(`app${token}/getPayments?${qs}`);
      return res.data;
    },
    confirmPayment: async (values: ConfirmPayment) => {
      const res = await instance.post<ConfirmPayment>(`app${token}/confirmPayment`, values);
      return res.data;
    },
    getBalance: async () => {
      const res = await instance.get(`app${token}/getBalance`);
      return res.data;
    },
    getExchangeRates: async () => {
      const res = await instance.get(`app${token}/getExchangeRates`);
      return res.data;
    },
    getCurrencies: async () => {
      const res = await instance.get(`app${token}/getCurrencies`);
      return res.data;
    },
  };
};
