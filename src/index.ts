import axios from 'axios';
import getMe from './get-me';
import createInvoice from './create-invoice';
import getInvoices from './get-invoices';
import getPayments from './get-payments';
import confirmPayment from './confirm-payment';
import getBalance from './get-balance';
import getExchangeRates from './get-exchange-rates';
import getCurrencies from './get-currencies';

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
