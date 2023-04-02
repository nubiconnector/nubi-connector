import moment from "moment";

import { PERCENTAGE_SIGN } from "../constants";

export const startMonitoringDateFormatter = (date) => {
    const dateObj = new Date(date);

    return (
        moment(dateObj).format("DD MMM YYYY") +
        " at " +
        moment(dateObj).format("HH:mm")
    );
};

export const haveTokenBalances = (tokenBalances) => {
    const result = Object.keys(tokenBalances).map(
        (tokenName) => tokenBalances[tokenName] !== undefined
    );

    return result.length > 0;
};

export const groupWalletsByNetwork = (walletsData) => {
    return walletsData.reduce((acc, wallet) => {
        const protocol = wallet.protocol.replace(/\s/g, "");

        if (!acc[protocol]) {
            acc[protocol] = [];
            acc[protocol].push(wallet);
        } else {
            acc[protocol].push(wallet);
        }

        return acc;
    }, {});
};

export const convertNetworkName = (network) => {
    const [base, suffix] = network.split("-");

    return (
        base + "\n" + suffix[0].toUpperCase() + suffix.slice(1, suffix.length)
    );
};

export const printChangePercentage = (value) => {
    if (value !== 0) {
        return `${value > 0 ? "+" : "-"}${(value < 0
            ? value * -1
            : value
        ).toFixed(2)}${PERCENTAGE_SIGN}`;
    }

    return `0${PERCENTAGE_SIGN}`;
};
