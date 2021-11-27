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
     * @type {Function}
     */
    getMe: getMe(instance, token),
    /**
     * Use this method to create a new invoice. Returns object of created invoice.
     * @type {Function}
     */
    createInvoice: createInvoice(instance, token),
    /**
     * Use this method to get invoices of your app. On success, the returns array of invoices.
     * @type {Function}
     */
    getInvoices: getInvoices(instance, token),
    /**
     * Use this method to get paid and unconfirmed invoices of your app. On success, the returns array of paid and unconfirmed invoices.
     * @type {Function}
     */
    getPayments: getPayments(instance, token),
    /**
     * Use this method to confirm paid invoice of your app. On success, the return confirmed invoice.
     * @type {Function}
     * @param {Number} invoice_id
     */
    confirmPayment: confirmPayment(instance, token),
    /**
     * Use this method to get balance of your app. Returns array of assets.
     * @type {Function}
     */
    getBalance: getBalance(instance, token),
    /**
     * Use this method to get exchange rates of supported currencies. Returns array of currencies.
     * @type {Function}
     */
    getExchangeRates: getExchangeRates(instance, token),
    /**
     * Use this method to supported currencies. Returns array of currencies.
     * @type {Function}
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
