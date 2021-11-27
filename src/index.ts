import axios from 'axios';
import getMe from './lib/get-me';
import createInvoice from './lib/create-invoice';
import getInvoices from './lib/get-invoices';
import getPayments from './lib/get-payments';
import confirmPayment from './lib/confirm-payment';
import getBalance from './lib/get-balance';
import getExchangeRates from './lib/get-exchange-rates';
import getCurrencies from './lib/get-currencies';

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
  invoice_ids?: Array<string | number>;
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
    getMe: getMe(instance, token),
    createInvoice: createInvoice(instance, token),
    getInvoices: getInvoices(instance, token),
    getPayments: getPayments(instance, token),
    confirmPayment: confirmPayment(instance, token),
    getBalance: getBalance(instance, token),
    getExchangeRates: getExchangeRates(instance, token),
    getCurrencies: getCurrencies(instance, token),
  };
};
