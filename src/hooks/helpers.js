import { BLOCKCHAINS, ETH_NETWORKS_COINGEKO_TOKENS } from "../constants";

export const isNearProtocolWallet = (wallet) => {
    return wallet.blockchain === "NEAR";
};

export const isLoggedInWallet = (
    wallet,
    newWalletAddress,
    newWalletProtocol
) => {
    return (
        wallet.address.toLowerCase() === newWalletAddress &&
        wallet.protocol === newWalletProtocol
    );
};

export const sortWallets = (wallets) => {
    const loggedInWallets = wallets.filter(
        (wallet) => wallet.status === "loggedIn"
    );
    const loggedOutWallets = wallets.filter(
        (wallet) => wallet.status === "notLoggedIn"
    );
    return [...loggedInWallets, ...loggedOutWallets];
};

export const isWalletExisted = (otherWallets, networkProto, address) =>
    otherWallets.find(wallet => {
        if (wallet.blockchain === BLOCKCHAINS.NEAR) {
            return wallet.address === address && wallet.protocol === networkProto;
        } else {
            return wallet.address?.toLowerCase() === address && wallet.protocol === networkProto;
        }
    });

export const informativeMessage = (messageCase, addr, proto) => {
    switch (messageCase) {
        case 'walletExisted':
            return `Wallet ${addr} already existed for protocol ${proto}.`;
        default:
            return '';
    }
};

export const getValidTokens = (allTokens, activeNetwork) => {
    const coinGeckoNetworkId = ETH_NETWORKS_COINGEKO_TOKENS[activeNetwork];

    return allTokens
        .filter(tok => tok.platforms[coinGeckoNetworkId])
        .map(tok => ({
            ...tok,
            address: tok.platforms[coinGeckoNetworkId]
        }));
};
