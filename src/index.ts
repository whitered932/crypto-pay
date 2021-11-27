import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CreateInvoice, GetInvoices, GetPayments } from './types';
import * as queryString from 'querystring';

interface ResponseData<T = never> {
  ok: boolean;
  error?: {
    code: number;
    name: string;
  };
  result: T;
}

/**
 * Use this method to create a new pay-instance
 * @param {String} token
 * @param {('main'|'test')} type default: main
 * @returns {PayInstance}
 */
export default (token: string, type: 'test' | 'main' = 'main') => new PayInstance(token, type);

/**
 * Pay instance
 */
export class PayInstance {
  private instance: AxiosInstance;

  constructor(token: string, type: 'test' | 'main' = 'main') {
    const baseURL = type === 'main' ? `https://pay.crypt.bot/app${token}` : `https://testnet-pay.crypt.bot/app${token}`;
    this.instance = axios.create({
      baseURL,
    });
  }

  /**
   * A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the app.
   */
  async getMe() {
    const { data } = (await this.instance.get(`getMe`)) as AxiosResponse<ResponseData>;
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to create a new invoice. Returns object of created invoice.
   * @param {CreateInvoice} values
   */
  async createInvoice<T>(values: CreateInvoice<T>) {
    const { data } = (await this.instance.post(`createInvoice`, values)) as AxiosResponse<ResponseData>;
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get invoices of your app. On success, the returns array of invoices.
   * @param {GetInvoices} values
   */
  async getInvoices(values: GetInvoices) {
    let qs: string;
    if (values.invoice_ids) {
      qs = queryString.stringify({ ...values, invoice_ids: values.invoice_ids?.join(',') });
    } else {
      qs = queryString.stringify(values as any);
    }
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getInvoices?${qs}`);
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get paid and unconfirmed invoices of your app. On success, the returns array of paid and unconfirmed invoices.
   * @param {GetPayments} values
   */
  async getPayments(values: GetPayments) {
    const qs = queryString.stringify(values as any);
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getPayments?${qs}`);
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to confirm paid invoice of your app. On success, the return confirmed invoice.
   * @param {number} invoice_id
   */
  async confirmPayment(invoice_id: number) {
    const { data }: AxiosResponse<ResponseData> = await this.instance.post(`confirmPayment`, { invoice_id });
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get balance of your app. Returns array of assets.
   */
  async getBalance() {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getBalance`);
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get exchange rates of supported currencies. Returns array of currencies.
   */
  async getExchangeRates() {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getExchangeRates`);
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to supported currencies. Returns array of currencies.
   */
  async getCurrencies() {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getCurrencies`);
    return this.getResultOrFail(data);
  }

  private getResultOrFail<R = never>(responseData: ResponseData): R {
    if (!responseData.ok) {
      throw new Error(`${responseData.error?.name} ${responseData.error?.code}`);
    }
    return responseData.result;
  }
}

export * from './types';
