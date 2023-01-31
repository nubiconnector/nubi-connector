import {
    convertToNativeCurrency,
    getAmountChangePercentage,
} from "../../utils/numbers";
import { ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS } from "../../constants";

export const proccessTotalBalance = (checkedState, wallets, currencyRates) => {
    return checkedState.reduce((acc, checked, index) => {
        if (checked) {
            acc += convertToNativeCurrency(
                wallets[index].lastBalance,
                currencyRates,
                ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS[wallets[index].protocol]
            );
        }

        return acc;
    }, 0);
};

export const proccessTotalPercentage = (checkedState, wallets) => {
    return checkedState.reduce((acc, checked, index) => {
        if (checked) {
            const checkedWallet = wallets[index];
            acc += getAmountChangePercentage(
                checkedWallet.initialBalance,
                checkedWallet.lastBalance
            );
        }

        return acc;
    }, 0);
};
