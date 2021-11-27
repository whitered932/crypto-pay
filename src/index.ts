import axios from 'axios';
import getMe from './lib/get-me';
import createInvoice from './lib/create-invoice';
import getInvoices from './lib/get-invoices';
import getPayments from './lib/get-payments';
import confirmPayment from './lib/confirm-payment';
import getBalance from './lib/get-balance';
import getExchangeRates from './lib/get-exchange-rates';
import getCurrencies from './lib/get-currencies';

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
