export const NearValidatorContract_READ_METHODS = [
    "deposit_and_stake",
    "unstake_all",
    "unstake",
    "withdraw",
    "ping",
];

export const NearProxyContract_WRITE_METHODS = [
    "aurora_call_methodAddrUint",
    "aurora_call_balanceOf"
];

export const NearUSDNContract_WRITE_METHODS = [
    "ft_transfer_call"
];

export const Near_DEFAULT_GAS_PRICE = "300000000000000";

export const Near_SupportedNetwork_V0 = "development";

export const Near_Contracts = {
    testnet: {
        'usdn.testnet': 'usdn.testnet',
        'test1.gaziz20.testnet': 'test1.gaziz20.testnet'
    },
    // TODO: mainnet
};

export const Aurora_Contracts = {
    testnet: {
        OpiumFinance: "7fA040f81Facd0eDD0bEf9544238775F7562e756"
    },
    // TODO: mainnet
};
