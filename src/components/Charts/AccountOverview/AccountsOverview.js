import React, { useEffect, useState } from "react";

import LoginWallet from "../../LoginWallet/LoginWallet";
import BlockchainsSelector from "../../BlockchainsSelector/BlockchainsSelector";
import NetworkInformation from "../../NetworkInformation/NetworkInformation";
import WalletButton from "./WalletButton";
import WalletTokensPanel from "./WalletTokensPanel";
import WalletsChangesProgress from "../../WalletsChangesProgress/WalletsChangesProgress";
import "./AccountsOverview.sass";

import {
    printChangePercentage,
    startMonitoringDateFormatter,
} from "../../../utils/ui";
import { catWalletAddr, copyTextToClipboard } from "../../../utils/text";
import {
    convertToNativeCurrency,
    getAmountChangePercentage,
} from "../../../utils/numbers";
import { ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS } from "../../../constants";
import { proccessTotalBalance, proccessTotalPercentage } from "../helpers";

function AccountOverview(props) {
    const classNames = props.className;
    const wallets = props.data;
    const checkedState = props.stateArray;
    const setCheckedState = props.stateFunction;
    const totalLoggedIn = wallets.filter(
        (wallet) => wallet.status === "loggedIn"
    ).length;
    const totalNonLoggedIn = wallets.filter(
        (wallet) => wallet.status === "notLoggedIn"
    ).length;
    const [isAddWalletProccess, setIsAddWalletProccess] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);

    const earlierWalletAdded = wallets.reduce(
        (acc, wallet) =>
            wallet.addedTimestamp < acc.addedTimestamp ? wallet : acc,
        wallets[0]
    );

    const handleOnChange = (position) => {
        const nextChecked = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(nextChecked);
        setTotalBalance(
            proccessTotalBalance(nextChecked, wallets, props.currencyRates)
        );
        setTotalPercentage(proccessTotalPercentage(nextChecked, wallets));
    };

    const onEthereumLogin = () => {
        setIsAddWalletProccess(false);
        props.loginWeb3();
    };

    const onNearLogin = () => {
        setIsAddWalletProccess(false);
        props.loginNear();
    };

    useEffect(() => {
        if (props.currencyRates && wallets?.length) {
            setTotalBalance(
                proccessTotalBalance(checkedState, wallets, props.currencyRates)
            );
            setTotalPercentage(proccessTotalPercentage(checkedState, wallets));
        }
    }, [props.currencyRates, checkedState]);

    return (
        <div className={`p-0 ${classNames}`}>
            <div className="my-4 p-4 shadow rounded">
                <NetworkInformation activeNetwork={props.ethActiveNetwork} />

                {props.ethActiveNetwork && wallets.length > 0 ? <hr /> : ""}

                {props.changesInProgress ? (
                    <WalletsChangesProgress walletsCount={wallets.length + 1} />
                ) : (
                    wallets.map((wallet, index) => {
                        let walletBalance = props.currencyRates
                            ? convertToNativeCurrency(
                                  wallet.lastBalance,
                                  props.currencyRates,
                                  ETH_NETWORKS_NATIVE_TOKENS_TO_PROTOCOLS[
                                      wallet.protocol
                                  ]
                              )
                            : 0;
                        const walletChangePercentage =
                            getAmountChangePercentage(
                                wallet.initialBalance,
                                wallet.lastBalance
                            );
                        walletBalance =
                            walletBalance === 0 ? '0.00' : walletBalance;

                        return (
                            <div className="wallet-info__item" key={wallet.address}>
                                <div className="row m-0 p-0">
                                    <div className="col-md-2 p-0">
                                        <p>
                                            <span>
                                                {wallet.blockchain?.toUpperCase() +
                                                    "\n | \n"}
                                            </span>
                                            <span>{wallet.protocol}</span>
                                        </p>
                                    </div>
                                    <div className="col-md-3 p-0">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={wallet.address}
                                                value={wallet.address}
                                                checked={checkedState[index]}
                                                onChange={() => handleOnChange(index)}
                                                id={`walletCheckList${index}`}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`walletCheckList${index}`}
                                                onClick={() =>
                                                    copyTextToClipboard(
                                                        wallet.address
                                                    )
                                                }
                                            >
                                                {catWalletAddr(wallet.address)}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1 p-0">
                                        <b>
                                            {walletBalance < 1
                                                ? String(walletBalance).slice(
                                                      0,
                                                      10
                                                  )
                                                : walletBalance.toFixed(2)}
                                            $
                                        </b>
                                    </div>
                                    <div className="col-md-2 p-0 text-right">
                                        <p
                                            className={`vault-percentage ${
                                                walletChangePercentage >= 0
                                                    ? "text-success"
                                                    : "text-danger"
                                            }`}
                                        >
                                            {printChangePercentage(
                                                walletChangePercentage
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-md-3 p-0">
                                        <div className="badge bg-primary">
                                            Added on{" "}
                                            {startMonitoringDateFormatter(
                                                wallet.addedTimestamp
                                            )}
                                        </div>
                                    </div>

                                    <WalletButton
                                        {...wallet}
                                        wallets={wallets}
                                        logoutNear={props.logoutNear}
                                        logoutWeb3={props.logoutWeb3}
                                    />

                                    {wallet.tokenAssets?.length && <WalletTokensPanel tokenAssets={wallet.tokenAssets} />}
                                </div>
                            </div>
                        );
                    })
                )}

                <div className="wallet-info__item total">
                    <div className="row m-0 p-0">
                        <div className="col-md-2 p-0">
                            <b>TOTAL</b>
                        </div>
                        <div className="col-md-3 p-0">
                            {totalLoggedIn > 0
                                ? totalLoggedIn.toString() +
                                  " logged-in wallets"
                                : ""}
                            {totalNonLoggedIn > 0 ?
                            (
                                <>
                                    <b> and </b>
                                    <span>
                                        {totalNonLoggedIn.toString() + " view-only wallets"}
                                    </span>
                                </>
                            ) : ""}
                        </div>
                        <div className="col-md-1 p-0">
                            <b>{totalBalance?.toFixed(2)}$</b>
                        </div>
                        <div className="col-md-2 p-0">
                            <p
                                className={`vault-percentage ${
                                    totalPercentage >= 0
                                        ? "text-success"
                                        : "text-danger"
                                }`}
                            >
                                {printChangePercentage(totalPercentage)}
                            </p>
                        </div>
                        <div className="col-md-3 p-0">
                            <div className="badge bg-primary">
                                Monitoring since{" "}
                                {earlierWalletAdded ? (
                                    startMonitoringDateFormatter(
                                        earlierWalletAdded.addedTimestamp
                                    )
                                ) : (
                                    <b>{"\b"}---</b>
                                )}
                            </div>
                        </div>
                        {/** earlierWalletAdded && <WalletButton isTotal /> **/}
                    </div>
                </div>

                <div className="row pt-1 mt-2">
                    <div className="col-md-2" />
                    <div className="col-md-2" />
                    <div className="col-md-4">
                        <div className="text-center">
                            <h4>Connect wallet</h4>
                        </div>
                        {!isAddWalletProccess ? (
                            <LoginWallet
                                handleLoginPress={() =>
                                    setIsAddWalletProccess(true)
                                }
                            />
                        ) : (
                            <BlockchainsSelector
                                handleEthereumLogin={onEthereumLogin}
                                handleNearLogin={onNearLogin}
                            />
                        )}
                    </div>
                    <div className="col-md-3" />
                </div>
            </div>
        </div>
    );
}

export default AccountOverview;
