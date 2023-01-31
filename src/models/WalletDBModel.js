export class WalletDBModel {
    static create(
        address,
        protocol,
        blockchain,
        vaultId,
        initialBalance,
        tokens
    ) {
        return {
            address,
            blockchain,
            protocol,
            vaultId,
            initialBalance,
            status: "loggedIn",
            tokenAssets: tokens
        };
    }

    static update(walletData, lastBalance, status) {
        return {
            ...walletData,
            ...{
                ...(lastBalance && { lastBalance }),
                ...(status && { status }),
            },
        };
    }
}
