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

/**
 * Use this method to create a new pay-instance. Returns an object containing all the methods listed below
 * @param token
 * @param net
 */
export default (token: string, net: 'main' | 'test' = 'main') => {
  const url = net === 'main' ? 'https://pay.crypt.bot/' : 'https://testnet-pay.crypt.bot/';
  const instance = axios.create({
    baseURL: url,
  });

  return {
    /**
     * A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the app.
     */
    getMe: getMe(instance, token),
    /**
     * Use this method to create a new invoice. Returns object of created invoice.
     * @param {CreateInvoice} params
     */
    createInvoice: createInvoice(instance, token),
    /**
     * Use this method to get invoices of your app. On success, the returns array of invoices.
     * @param {GetInvoices} params
     */
    getInvoices: getInvoices(instance, token),
    /**
     * Use this method to get paid and unconfirmed invoices of your app. On success, the returns array of paid and unconfirmed invoices.
     * @param {GetPayments} params
     */
    getPayments: getPayments(instance, token),
    /**
     * Use this method to confirm paid invoice of your app. On success, the return confirmed invoice.
     * @param {Number} invoice_id
     */
    confirmPayment: confirmPayment(instance, token),
    /**
     * Use this method to get balance of your app. Returns array of assets.
     */
    getBalance: getBalance(instance, token),
    /**
     * Use this method to get exchange rates of supported currencies. Returns array of currencies.
     */
    getExchangeRates: getExchangeRates(instance, token),
    /**
     * Use this method to supported currencies. Returns array of currencies.
     */
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
