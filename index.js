"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Asset = void 0;
var axios_1 = require("axios");
var queryString = require("querystring");
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
var getDataOrFail = function (responseData) {
    var _a, _b;
    if (!responseData.ok) {
        throw new Error("".concat((_a = responseData.error) === null || _a === void 0 ? void 0 : _a.name, " ").concat((_b = responseData.error) === null || _b === void 0 ? void 0 : _b.code));
    }
    return responseData.result;
};
exports.default = (function (token, net) {
    if (net === void 0) { net = 'main'; }
    var url = net === 'main' ? 'https://pay.crypt.bot/' : 'https://testnet-pay.crypt.bot/';
    var instance = axios_1.default.create({
        baseURL: url,
    });
    return {
        getMe: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.get("app".concat(token, "/getMe"))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        createInvoice: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.post("app".concat(token, "/createInvoice"), values)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        getInvoices: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var preparedIds, qs, data;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        preparedIds = (_a = values.invoice_ids) === null || _a === void 0 ? void 0 : _a.join(',');
                        qs = queryString.stringify(__assign(__assign({}, values), { invoice_ids: preparedIds || [] }));
                        return [4 /*yield*/, instance.get("app".concat(token, "/getInvoices?").concat(qs))];
                    case 1:
                        data = (_b.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        getPayments: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var qs, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qs = queryString.stringify(values);
                        return [4 /*yield*/, instance.get("app".concat(token, "/getPayments?").concat(qs))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        confirmPayment: function (values) { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.post("app".concat(token, "/confirmPayment"), values)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        getBalance: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.get("app".concat(token, "/getBalance"))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        getExchangeRates: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.get("app".concat(token, "/getExchangeRates"))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
        getCurrencies: function () { return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, instance.get("app".concat(token, "/getCurrencies"))];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, getDataOrFail(data)];
                }
            });
        }); },
    };
});
