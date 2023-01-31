import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { catWalletAddr } from "../../../utils/text";
import { UserService } from "../../../services/user.service";
import { setUserWallets } from "../../../redux/reducers/wallets";
import { BLOCKCHAINS } from "../../../constants";

const WalletButton = ({
    _id: walletDocId,
    address,
    blockchain,
    status,
    isTotal,
    vaultID,
    wallets,
    logoutNear,
    logoutWeb3
}) => {
    const dispatch = useDispatch();

    const handleRemoveWallet = async () => {
        await UserService.removeUserWallet(walletDocId, vaultID);

        toast.success(`Wallet ${catWalletAddr(address)} is removed!`);

        dispatch(
            setUserWallets(
                wallets.filter((wallet) => wallet._id !== walletDocId)
            )
        );
    };

    const handleLogOutWallet = async () => {
        if (blockchain === BLOCKCHAINS.ETH) {
            logoutWeb3();
        } else {
            logoutNear();
        }
    };

    const handleUpdateWallets = () => {
        toast.success("This feature is in progress.");
    };

    const action = () => {
        if (isTotal) {
            return handleUpdateWallets;
        } else {
            return status === "loggedIn"
                ? handleLogOutWallet
                : handleRemoveWallet;
        }
    };

    if (isTotal) {
        return (
            <div className="col-md-1 p-0">
                <button
                    className="btn-dashboard-logout btn"
                    size="sm"
                    onClick={action()}
                >
                    Update
                </button>
            </div>
        );
    }

    return (
        <div className="col-md-1 p-0">
            <button
                className="btn-dashboard-logout btn"
                size="sm"
                onClick={action()}
            >
                {status === "loggedIn" ? "Logout" : "Delete"}
            </button>
        </div>
    );
};

export default WalletButton;
