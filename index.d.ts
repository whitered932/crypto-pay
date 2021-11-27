export declare enum Asset {
    BTC = "BTC",
    TON = "TON",
    ETH = "ETH",
    USDT = "USDT",
    USDC = "USDC",
    BUSD = "BUSD"
}
export declare enum Status {
    ACTIVE = "active",
    PAID = "paid"
}
export interface CreateInvoice {
    asset: Asset;
    amount: string;
    description?: string;
    paid_btn_name?: string;
    paid_btn_url?: string;
    payload?: string;
}
export interface GetInvoices {
    asset: Asset;
    invoice_ids?: string[];
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
declare const _default: (token: string, net?: 'main' | 'test') => {
    getMe: () => Promise<any>;
    createInvoice: (values: CreateInvoice) => Promise<any>;
    getInvoices: (values: GetInvoices) => Promise<any>;
    getPayments: (values: GetPayments) => Promise<any>;
    confirmPayment: (values: ConfirmPayment) => Promise<any>;
    getBalance: () => Promise<any>;
    getExchangeRates: () => Promise<any>;
    getCurrencies: () => Promise<any>;
};
export default _default;
