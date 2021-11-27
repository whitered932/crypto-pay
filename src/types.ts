export enum Status {
  ACTIVE = 'active',
  PAID = 'paid',
}

export enum Asset {
  BTC = 'BTC',
  TON = 'TON',
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC',
  BUSD = 'BUSD',
}

export interface GetPayments {
  offset?: number;
  count?: number;
}

export interface CreateInvoice<T> {
  asset: Asset;
  amount: string | number;
  description?: string;
  paid_btn_name?: 'viewItem' | 'openChannel' | 'openBot' | 'callback';
  paid_btn_url?: string;
  payload?: Record<string, T>;
}

export interface GetInvoices {
  asset?: Asset;
  invoice_ids?: Array<string | number>;
  status?: Status;
  offset?: number;
  count?: number;
}

export interface ResponseData<T = never> {
  ok: boolean;
  error?: {
    code: number;
    name: string;
  };
  result: T;
}

export interface GetMeResponse {
  app_id: number;
  name: string;
  payment_processing_bot_username: string;
}

export interface GetInvoicesResponse {
  count: number;
  items: Array<Invoice>;
}

export interface GetPaymentsResponse {
  count: number;
  items: Array<PaidInvoice>;
}

export interface CurrencyBalance {
  currency_code: Asset;
  available: string;
}

export interface Currency {
  is_blockchain: boolean;
  is_stablecoin: boolean;
  is_fiat: boolean;
  name: string;
  code: string;
  decimals: number;
}
export interface ExchangeRate {
  is_valid: boolean;
  source: string;
  target: string;
  rate: string;
}

export interface Invoice {
  invoice_id: number;
  status: Status;
  hash: string;
  asset: Asset;
  amount: string;
  pay_url: string;
  created_at: string;
}

export interface PaidInvoice extends Invoice {
  paid_at: string;
  paid_anonymously: boolean;
  is_confirmed: boolean;
}

export interface ConfirmedInvoice extends PaidInvoice {
  confirmed_at: string;
}
