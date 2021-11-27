export const getResultOrFail = <R = any>(responseData: ResponseData): R => {
  if (!responseData.ok) {
    throw new Error(`${responseData.error?.name} ${responseData.error?.code}`);
  }
  return responseData.result;
};

export interface ResponseData<T = any> {
  ok: boolean;
  error?: {
    code: number;
    name: string;
  };
  result: T;
}

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
