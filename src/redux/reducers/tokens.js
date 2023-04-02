import { createSlice } from "@reduxjs/toolkit";

import { ETH_NETWORKS_COINGEKO_TOKENS, ETH_TOKEN_ADDRESSES } from '../../constants';

const ethNetworks = Object.entries(ETH_NETWORKS_COINGEKO_TOKENS);

const convertTokensToObject = (tokensData, network) => {
    return tokensData.reduce((acc, item) => {
        return {
            ...acc,
            [item.name]: item.platforms[network]
        }   
    }, {});
};

const slice = createSlice({
    name: "tokens",
    initialState: {
        tokenAddresses: null,
        priceData: null,
        platformTokens: {},
    },
    reducers: {
        updateTokenAddresses: (state, action) => {
            state.tokenAddresses = action.payload;
        },
        setPrices: (state, action) => {
            const prices = {};

            for (const i in action.payload.rates) {
                prices[i] = 1 / parseFloat(action.payload.rates[i]);
            }

            state.priceData = prices;
        },
        setNetworkPlatformTokens: (state, action) => {
            ethNetworks.forEach(([networkKey, networkValue]) => {
                if (networkKey !== null) {
                    const tokensForNetwork = action.payload
                        .filter(item => Object.keys(item.platforms).find(tok => tok.includes(networkValue)));

                    state.platformTokens[networkKey] =
                        tokensForNetwork.length ?
                            convertTokensToObject(tokensForNetwork, networkValue) :
                            ETH_TOKEN_ADDRESSES[networkKey];
                }
            });

            const testnetTokens = Object.entries(ETH_TOKEN_ADDRESSES).reduce((acc, [testnetId, testnetTokens]) => {
                const coinGeckoNetworkId = ETH_NETWORKS_COINGEKO_TOKENS[testnetId];
                const testnetTokensForNetwork = Object.entries(testnetTokens).map(([tokenName, tokenAddress]) => ({
                    name: tokenName,
                    platforms: {
                        [coinGeckoNetworkId]: tokenAddress
                    },
                    symbol: tokenName,
                    id: tokenName
                }));

                acc.forEach(i => {
                    const existed = testnetTokensForNetwork.find(n => n.name === i.name);

                    if (existed) {
                        i.platforms[coinGeckoNetworkId] = existed.platforms[coinGeckoNetworkId];
                    }
                });

                return [
                    ...acc,
                    ...testnetTokensForNetwork.filter(tok => !acc.find(n => n.name === tok.name))
                ];
            }, []);

            state.platformTokens.all = [
                ...action.payload,
                ...testnetTokens
            ];
        },
    },
});

export const { updateTokenAddresses, setPrices, setNetworkPlatformTokens } =
    slice.actions;

export default slice.reducer;
