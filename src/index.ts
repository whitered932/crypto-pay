import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  Invoice,
  GetInvoicesResponse,
  ResponseData,
  GetMeResponse,
  CreateInvoice,
  GetInvoices,
  CurrencyBalance,
  ExchangeRate,
  Currency,
} from './types';
import * as queryString from 'querystring';
import Joi = require('joi');

/**
 * Use this method to create a new pay-instance
 * @param {String} token
 * @param {('main'|'test')} type default: main
 * @returns {CryptoPay}
 */

// export default (token: string, type: 'test' | 'main' = 'main') => new CryptoPay(token, type);

/**
 * Pay instance
 */
export class CryptoPay {
  private instance: AxiosInstance;

  constructor(token: string, type: 'test' | 'main' = 'main') {
    const baseURL = type === 'main' ? `https://pay.crypt.bot/api` : `https://testnet-pay.crypt.bot/api`;
    this.instance = axios.create({
      baseURL,
      headers: {
        'Crypto-Pay-API-Token': token,
      },
      validateStatus: (status) => {
        return status >= 200;
      },
    });
  }

  /**
   * A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the app.
   * @returns {Promise<GetMeResponse>}
   */
  async getMe(): Promise<GetMeResponse> {
    const { data } = (await this.instance.get(`getMe`)) as AxiosResponse<ResponseData>;
    return this.getResultOrFail<GetMeResponse>(data);
  }

  /**
   * Use this method to create a new invoice. Returns object of created invoice.
   * @param {CreateInvoice} values
   * @returns {Promise<Invoice>}
   */
  async createInvoice<T>(values: CreateInvoice<T>): Promise<Invoice> {
    const schema = Joi.object<CreateInvoice<T>>({
      asset: Joi.string().required(),
      amount: Joi.any().required(),
      description: Joi.string().max(1024).optional(),
      paid_btn_name: Joi.string().valid('viewItem', 'openChannel', 'openBot', 'callback').optional(),
      paid_btn_url: Joi.string().uri().optional().when('paid_btn_name', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      allow_anonymous: Joi.boolean().optional(),
      allow_comments: Joi.boolean().optional(),
      payload: Joi.object().optional(),
    });
    await schema.validateAsync(values);

    let payload: string | undefined;
    if (values.payload) payload = JSON.stringify(values.payload);
    const { data } = (await this.instance.post(`createInvoice`, {
      ...values,
      payload,
    })) as AxiosResponse<ResponseData<Invoice>>;
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get invoices of your app. On success, the returns array of invoices.
   * @param {GetInvoices} values
   * @returns {Promise<GetInvoicesResponse>}
   */
  async getInvoices(values: GetInvoices = {}): Promise<GetInvoicesResponse> {
    const schema = Joi.object<GetInvoices>({
      asset: Joi.string().valid('BTC', 'TON', 'ETH', 'USDT', 'USDC', 'BUSD').optional(),
      invoice_ids: Joi.array().optional(),
      status: Joi.string().valid('PAID', 'ACTIVE').optional(),
      offset: Joi.number().optional(),
      count: Joi.number().max(1000).optional(),
    });
    await schema.validateAsync(values);

    let qs: string;
    if (values.invoice_ids) {
      qs = queryString.stringify({ ...values, invoice_ids: values.invoice_ids?.join(',') });
    } else {
      qs = queryString.stringify(values as never);
    }
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getInvoices?${qs}`);
    return this.getResultOrFail(data);
  }

  /**
   * Use this method to get balance of your app. Returns array of assets.
   * @returns {Promise<Array<CurrencyBalance>>}
   */
  async getBalance(): Promise<Array<CurrencyBalance>> {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getBalance`);
    return this.getResultOrFail<Array<CurrencyBalance>>(data);
  }

  /**
   * Use this method to get exchange rates of supported currencies. Returns array of currencies.
   * @returns {Promise<Array<ExchangeRate>>}
   */
  async getExchangeRates(): Promise<Array<ExchangeRate>> {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getExchangeRates`);
    return this.getResultOrFail<Array<ExchangeRate>>(data);
  }

  /**
   * Use this method to supported currencies. Returns array of currencies.
   * @returns {Promise<Array<Currency>>}
   */
  async getCurrencies(): Promise<Array<Currency>> {
    const { data }: AxiosResponse<ResponseData> = await this.instance.get(`getCurrencies`);
    return this.getResultOrFail<Array<Currency>>(data);
  }

  private getResultOrFail<R = never>(responseData: ResponseData<R>): R {
    if (!responseData.ok) {
      throw new Error(`${responseData.error?.name} ${responseData.error?.code}`);
    }
    return responseData.result;
  }
}

export * from './types';
export const createPayInstance = (token: string, type: 'test' | 'main' = 'main') => new CryptoPay(token, type);
export default createPayInstance;
