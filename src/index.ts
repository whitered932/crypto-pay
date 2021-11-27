import axios from 'axios';
import {
  getMe,
  getPayments,
  createInvoice,
  confirmPayment,
  getExchangeRates,
  getBalance,
  getCurrencies,
  getInvoices,
} from './lib';

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

export {
  getMe,
  getPayments,
  createInvoice,
  confirmPayment,
  getExchangeRates,
  getBalance,
  getCurrencies,
  getInvoices,
  Asset,
  Status,
} from './lib';
