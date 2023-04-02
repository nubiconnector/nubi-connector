import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
    ETH_NETWORKS,
    NEAR_NETWORKS,
    NEAR_CONTRACTS,
    BLOCKCHAINS,
} from "../constants";
import {
    getConnectedAccountBalance,
    signInContract as signInNear,
    signOut as signOutNear,
    convertNearToYoctoAndBack,
    connectNear,
} from "../assets/js/near/utils";
import { WalletDBModel } from "../models/WalletDBModel";
import { EthereumService } from "../services/ethereum.service";
import { UserService } from "../services/user.service";
import {
    getValidTokens,
    informativeMessage,
    isLoggedInWallet,
    isNearProtocolWallet,
    isWalletExisted,
    sortWallets
} from "./helpers";

const useUserWallets = (userWallets, updateUserWallets) => {
    const [nearNetworkId, setNearNetworkId] = useState(null);
    const [ethNetworkId, setEthNetworkId] = useState(null);
    const [changesInProgress, setChangesInProgress] = useState(true);
    const ethUserWallets = userWallets.filter(wallet => !isNearProtocolWallet(wallet));
    const nearUserWallets = userWallets.filter(wallet => isNearProtocolWallet(wallet));

    const initNearFlow = async () => {
        const accountId = window.walletConnection._authData.accountId;
        const networkId = window.walletConnection._networkId;

        if (!networkId || !accountId) {
            toast.warn("It's not possible to determine account or network.");
        } else {
            if (networkId) {
                setNearNetworkId(networkId);
            }

            const existed = isWalletExisted(nearUserWallets, networkId, accountId);
    
            if (accountId && !existed) {
                updateNearAccounts(networkId, accountId);
            } else {
                toast.warning(informativeMessage('walletExisted', accountId, networkId));
            }
        }
    };

    const loginNear = async () => {
        await connectNear();

        if (window.walletConnection.isSignedIn()) {
            initNearFlow();
        } else {
            const networkId = window.walletConnection._networkId;

            toast.success(
                `Connection in progress to network: ${networkId}. Base contract would be ${NEAR_CONTRACTS[networkId].T7T}.`
            );

            if (networkId !== NEAR_NETWORKS.Mainnet) {
                localStorage.setItem("nearConnectionInProgress", true);
                signInNear(NEAR_CONTRACTS[networkId].T7T);
            } else {
                toast.warn("NEAR mainnet does not supportable at the moment.");
            }
        }
    };

    const logoutNear = async () => {
        const loggedOutSuccess = signOutNear();

        if (loggedOutSuccess) {
            const toUpdate = nearUserWallets.find(wallet => wallet.blockchain === BLOCKCHAINS.NEAR && wallet.status === "loggedIn");
            const updated = await UserService.updateUserWallet({ ...toUpdate, status: "notLoggedIn"});

            updateUserWallets(
                sortWallets([
                    ...updated,
                    ...ethUserWallets,
                ])
            );
        }
    };

    const openTokensSelectorModal = () => {
        const button = document.querySelector(
            `button[data-bs-target='#tokenSelectorModal']`
        );

        if (button) {
            button.click();
        }
    };

    const loginWeb3 = async tokensInWallet => {
        EthereumService.setWeb3Provider();

        if (window.web3) {
            const networkID = await window.web3.eth.getChainId();
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const existed = isWalletExisted(
                ethUserWallets,
                ETH_NETWORKS[networkID],
                accounts[0]
            );

            if (!accounts[0]) {
                toast.info("No active account has been found.");
            } else if (!existed) {
                updateEthAccounts(networkID, accounts[0], tokensInWallet);
            } else {
                toast.warn(
                    informativeMessage('walletExisted', existed.address, existed.protocol),
                    {
                        className: "toast-large",
                    }
                );
            }
        }
    };

    const updateNearAccounts = async (networkId, accountId) => {
        let { available, stateStaked, total } = (await getConnectedAccountBalance()) ?? {};

        if (available === undefined && stateStaked === undefined && total === undefined) {
            toast.warn(`[NEAR] Error fetch balances for account ${accountId}.`);

            return;
        } else {
            available = convertNearToYoctoAndBack(available);
            stateStaked = convertNearToYoctoAndBack(stateStaked);
            total = convertNearToYoctoAndBack(total);

            setChangesInProgress(true);

            const newNearUserWallets = await UserService.saveUserWallet(
                WalletDBModel.create(
                    accountId,
                    networkId,
                    BLOCKCHAINS.NEAR,
                    localStorage.getItem("userVaultIdentifier"),
                    total,
                    []
                )
            );
            const walletsToUpdate = newNearUserWallets.map((wallet, index) => ({
                ...newNearUserWallets[index],
                ...(!isLoggedInWallet(wallet, accountId, networkId) && {
                    status: "notLoggedIn",
                }),
            }));
            const response = await Promise.all(
                walletsToUpdate.map((wallet) =>
                    UserService.updateUserWallet(wallet)
                )
            );

            updateUserWallets(
                sortWallets([
                    ...response[response.length - 1],
                    ...ethUserWallets,
                ])
            );
            setTimeout(() => setChangesInProgress(false), 2000);
        }
    };

    const updateEthAccounts = async (networkId, accountId, userTokensInWallet) => {
        setEthNetworkId(networkId);
        setChangesInProgress(true);
        
        const networkName = ETH_NETWORKS[networkId];
        const newWalletBalance = await EthereumService.getEthAccountBalance(accountId);
        let newWalletTokenBalances = null;

        if (userTokensInWallet.length) {
            const validTokensForNetwork = getValidTokens(userTokensInWallet, ethNetworkId);

            if (validTokensForNetwork.length) {
                newWalletTokenBalances = await EthereumService.getEthAccount_TokenBalances(
                    accountId,
                    validTokensForNetwork
                );
            }
        }
    
        const newUserWallets = await UserService.saveUserWallet(
            WalletDBModel.create(
                accountId,
                networkName,
                BLOCKCHAINS.ETH,
                localStorage.getItem("userVaultIdentifier"),
                newWalletBalance,
                newWalletTokenBalances
            )
        );
        const walletBalancesToUpdate = await Promise.all(
            newUserWallets.map((wallet) =>
                wallet.protocol === ETH_NETWORKS[ethNetworkId]
                    ? EthereumService.getEthAccountBalance(wallet.address)
                    : wallet.lastBalance
            )
        );
        const walletsToUpdate = newUserWallets.map((wallet, index) => ({
            ...newUserWallets[index],
            lastBalance: walletBalancesToUpdate[index],
            ...(!isLoggedInWallet(wallet, accountId, networkName) && {
                status: "notLoggedIn",
            }),
        }));
        const response = await Promise.all(
            walletsToUpdate.map((wallet) =>
                UserService.updateUserWallet(wallet)
            )
        );

        updateUserWallets(
            sortWallets([...response[response.length - 1], ...nearUserWallets])
        );
        setTimeout(() => setChangesInProgress(false), 2000);
    };

    const logoutWeb3 = () => {
        toast.success("You can disconnect wallet only via MetaMask.");
    };

    useEffect(() => {
        setTimeout(() => setChangesInProgress(false), 1000);
        EthereumService.setWeb3Provider();
        connectNear();

        if (!ethNetworkId) {
            window.web3.eth.getChainId().then(chainId => {
                setEthNetworkId(chainId);
            });
        }

        if (localStorage.getItem("nearConnectionInProgress")) {
            connectNear().then(initNearFlow);
            localStorage.removeItem("nearConnectionInProgress");
        }

        window.ethereum.on("chainChanged", (newChainId) => {
            setEthNetworkId(Number(newChainId));
        });
    }, []);

    return {
        loginWeb3,
        logoutWeb3,
        loginNear,
        logoutNear,
        selectEthTokens: openTokensSelectorModal,
        nearNetworkId,
        ethActiveNetwork: ETH_NETWORKS[ethNetworkId],
        changesInProgress,
    };
};

export default useUserWallets;
