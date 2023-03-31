import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ChartsAndWalletsPanel from "../../components/ChartsAndWalletsPanel/ChartsAndWalletsPanel";
import { sortWallets } from "../../hooks/helpers";

import { setNetworkPlatformTokens, setPrices } from "../../redux/reducers/tokens";
import { setUserWallets } from "../../redux/reducers/wallets";
import { PriceAPIService } from "../../services/price-api";
import { UserService } from "../../services/user.service";

const DashboardPage = () => {
    const dispatch = useDispatch();

    const getPriceData = async () => {
        const priceData = await PriceAPIService.getExchangeRates();

        dispatch(setPrices(priceData));
    };

    const getTokensData = async () => {
        const ethereumTokens = await PriceAPIService.getAvailableTokensList(
            "ethereum"
        );

        dispatch(setNetworkPlatformTokens(ethereumTokens));
    };

    const requestUserVault = async () => {
        const wallets = await UserService.getUserVault();

        dispatch(setUserWallets(sortWallets(wallets)));
    };

    useEffect(() => {
        // getPriceData();
        // getTokensData();
        // requestUserVault();
    }, []);

    return <ChartsAndWalletsPanel />;
};

export default DashboardPage;
