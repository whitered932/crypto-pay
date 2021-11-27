"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Asset = void 0;
var axios_1 = require("axios");
var get_me_1 = require("./lib/get-me");
var create_invoice_1 = require("./lib/create-invoice");
var get_invoices_1 = require("./lib/get-invoices");
var get_payments_1 = require("./lib/get-payments");
var confirm_payment_1 = require("./lib/confirm-payment");
var get_balance_1 = require("./lib/get-balance");
var get_exchange_rates_1 = require("./lib/get-exchange-rates");
var get_currencies_1 = require("./lib/get-currencies");
var Asset;
(function (Asset) {
    Asset["BTC"] = "BTC";
    Asset["TON"] = "TON";
    Asset["ETH"] = "ETH";
    Asset["USDT"] = "USDT";
    Asset["USDC"] = "USDC";
    Asset["BUSD"] = "BUSD";
})(Asset = exports.Asset || (exports.Asset = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "active";
    Status["PAID"] = "paid";
})(Status = exports.Status || (exports.Status = {}));
exports.default = (function (token, net) {
    if (net === void 0) { net = 'main'; }
    var url = net === 'main' ? 'https://pay.crypt.bot/' : 'https://testnet-pay.crypt.bot/';
    var instance = axios_1.default.create({
        baseURL: url,
    });
    return {
        getMe: (0, get_me_1.default)(instance, token),
        createInvoice: (0, create_invoice_1.default)(instance, token),
        getInvoices: (0, get_invoices_1.default)(instance, token),
        getPayments: (0, get_payments_1.default)(instance, token),
        confirmPayment: (0, confirm_payment_1.default)(instance, token),
        getBalance: (0, get_balance_1.default)(instance, token),
        getExchangeRates: (0, get_exchange_rates_1.default)(instance, token),
        getCurrencies: (0, get_currencies_1.default)(instance, token),
    };
});
