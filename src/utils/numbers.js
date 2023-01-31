import { ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS } from "../constants";

export const excludeComission = (amount, percentage) => amount * percentage;

export const getAmountChangePercentage = (startAmount, currentAmount) => {
    startAmount = Number(startAmount);
    currentAmount = Number(currentAmount);
    const changeRange = startAmount - currentAmount;

    if (changeRange !== 0) {
        const changed = (changeRange / startAmount) * 100;

        return changed;
    }

    return 0;
};

export const getDecimalFromAmount = (amountAsString) => {
    if (amountAsString === "0") {
        return amountAsString;
    }

    const amountAsDecimal = amountAsString
        .replace(".", "")
        .split("")
        .reduceRight(
            (acc, substr) => {
                let count = acc.count + 1;
                const newStr = acc.value + substr;
                const isDecimalIndex = count === 3;

                if (isDecimalIndex) {
                    count = 0;
                }

                const currentPayload = {
                    count: count,
                    value: isDecimalIndex ? `${newStr}.` : newStr,
                };

                return currentPayload;
            },
            {
                count: 0,
                value: "",
            }
        )
        .value.split("")
        .reverse()
        .join("");

    let [base, base_2, base_3] = amountAsDecimal.split(".");

    if (base_2 || base_3) {
        return `${base}.${base_2}${base_3 ? Number(base_3[0]) + 1 : ""}`;
    }

    return base;
};

export const convertToNativeCurrency = (
    amount,
    currencyRates,
    cryptoCurrencyCode
) => {
    const convertedAmount =
        parseFloat(amount) * (currencyRates[cryptoCurrencyCode] ?? 1);

    return convertedAmount;
};

export const uniteEthWalletBalances = (
    walletBalances,
    wallets,
    currencyRates
) => {
    return Object.entries(walletBalances).reduce(
        (acc, [walletAddr, walletBalance]) => {
            const networkNativeToken =
                ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS[
                    wallets.find((_wallet) => _wallet.tableKey === walletAddr)
                        .protocol
                ];
            const nextBalance = convertToNativeCurrency(
                walletBalance.ETH || walletBalance.MATIC || walletBalance.USN,
                currencyRates,
                networkNativeToken
            );

            return acc + parseFloat(nextBalance.slice(1, nextBalance.length));
        },
        0
    );
};

export const uniteNearWalletBalances = (walletBalances, currencyRates) => {
    return Object.entries(walletBalances).reduce((acc, [_, { total }]) => {
        const converted = parseFloat(
            convertToNativeCurrency(total, currencyRates, "NEAR").replace(
                "$",
                ""
            )
        );

        return acc + converted;
    }, 0);
};

export const uniteNetworkBalances = (
    prices,
    ethWalletBalances,
    ethWallets,
    nearWalletBalances
) => {
    return (
        "$" +
        (
            uniteNearWalletBalances(nearWalletBalances, prices) +
            uniteEthWalletBalances(ethWalletBalances, ethWallets, prices)
        ).toFixed(2)
    );
};
