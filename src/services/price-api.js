import { HmacSHA256 } from "crypto-js";

import { supportedCurrencies } from "../constants";

const API_SECRET = "l6GaaJmeBefrwTfurEn7q72bm5NHuhZ4";
const API_KEY = "NcYornUOt2jEt0G9";

export class PriceAPIService {
    static async getExchangeRates(currencyCode = supportedCurrencies.USD) {
        const timestamp = Math.floor(Date.now() / 1000);
        const requestParams = {
            method: "GET",
            path: `/v2/exchange-rates?currency=${currencyCode}`,
            body: "",
        };
        const message =
            timestamp +
            requestParams.method +
            requestParams.path +
            requestParams.body;
        const signature = HmacSHA256(message, API_SECRET);
        const headers = {
            "CB-ACCESS-SIGN": signature,
            "CB-ACCESS-TIMESTAMP": timestamp,
            "CB-ACCESS-KEY": API_KEY,
            "CB-VERSION": "2015-07-22",
        };

        const response = await fetch(
            `https://api.coinbase.com${requestParams.path}`,
            {
                method: requestParams.method,
                headers,
            }
        );

        return (await response.json())?.data;
    }

    static async getAvailableTokensList(platform = "ethereum") {
        const responseData = await fetch(
            "https://api.coingecko.com/api/v3/coins/list?include_platform=true"
        );
        const ethereumTokens = (await responseData.json()).filter(
            (token) => !!token.platforms[platform]
        );

        return ethereumTokens;
    }
}
