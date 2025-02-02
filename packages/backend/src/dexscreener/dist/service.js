"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.DexscreenerService = void 0;
var core_1 = require("@goat-sdk/core");
var DexscreenerService = /** @class */ (function () {
    function DexscreenerService() {
        this.baseUrl = "https://api.dexscreener.com/latest/dex";
        this.tokenBaseUrl = "https://api.dexscreener.com/tokens/v1";
    }
    DexscreenerService.prototype.fetchDexscreener = function (url, action) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP status " + response.status);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log("Token Details: ", data);
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            throw new Error("Failed to " + action + ": " + error_1.message);
                        }
                        throw new Error("Failed to " + action + ": Unknown error");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DexscreenerService.prototype.extractTokenData = function (data) {
        var _a, _b;
        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error("Invalid data format received");
        }
        var tokenData = data[0];
        var extracted = {
            dex: tokenData.dexId,
            pairName: tokenData.baseToken.symbol + "/" + tokenData.quoteToken.symbol,
            pairAddress: tokenData.pairAddress,
            priceUsd: "$" + Number(tokenData.priceUsd).toFixed(6),
            volume24h: tokenData.volume.h24,
            marketCap: tokenData.marketCap,
            pairCreatedAt: new Date(tokenData.pairCreatedAt).toISOString(),
            socials: {
                websites: ((_a = tokenData.info) === null || _a === void 0 ? void 0 : _a.websites) || [],
                socialLinks: ((_b = tokenData.info) === null || _b === void 0 ? void 0 : _b.socials) || []
            }
        };
        console.log("Data Format: ", extracted);
        return extracted;
    };
    DexscreenerService.prototype.getPairsByChainAndPair = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.baseUrl + "/pairs/" + parameters.chainId + "/" + parameters.pairId;
                return [2 /*return*/, this.fetchDexscreener(url, "fetch pairs")];
            });
        });
    };
    DexscreenerService.prototype.searchPairs = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = this.baseUrl + "/search?q=" + encodeURIComponent(parameters.query);
                return [2 /*return*/, this.fetchDexscreener(url, "search pairs")];
            });
        });
    };
    DexscreenerService.prototype.get_token_pairs_by_token_address = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var addresses, url;
            return __generator(this, function (_a) {
                if (parameters.tokenAddresses.length > 30) {
                    throw new Error("Maximum of 30 token addresses allowed per request");
                }
                addresses = parameters.tokenAddresses.join(",");
                url = this.baseUrl + "/tokens/" + addresses;
                return [2 /*return*/, this.fetchDexscreener(url, "get token pairs")];
            });
        });
    };
    DexscreenerService.prototype.fetchTokenDetails = function (parameters) {
        return __awaiter(this, void 0, Promise, function () {
            var url, rawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.tokenBaseUrl + "/mode/" + parameters.tokenAddress;
                        console.log("Url: ", url);
                        return [4 /*yield*/, this.fetchDexscreener(url, "fetch token")];
                    case 1:
                        rawData = _a.sent();
                        return [2 /*return*/, this.extractTokenData(rawData)];
                }
            });
        });
    };
    __decorate([
        core_1.Tool({
            description: "Fetch pairs by chainId and pairId from Dexscreener"
        })
    ], DexscreenerService.prototype, "getPairsByChainAndPair");
    __decorate([
        core_1.Tool({
            description: "Search for DEX pairs matching a query string on Dexscreener"
        })
    ], DexscreenerService.prototype, "searchPairs");
    __decorate([
        core_1.Tool({
            description: "Get all DEX pairs for given token addresses (up to 30) from Dexscreener"
        })
    ], DexscreenerService.prototype, "get_token_pairs_by_token_address");
    __decorate([
        core_1.Tool({
            description: "Get detailed analysis for a token address from dexscreener"
        })
    ], DexscreenerService.prototype, "fetchTokenDetails");
    return DexscreenerService;
}());
exports.DexscreenerService = DexscreenerService;
