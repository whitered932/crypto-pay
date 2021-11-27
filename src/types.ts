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
  asset: Asset;
  invoice_ids?: Array<string | number>;
  status?: Status;
  offset?: number;
  count?: number;
}
