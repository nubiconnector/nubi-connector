import React from "react";

import "./LoginWallet.sass";

const LoginWallet = ({ handleLoginPress }) => {
    return (
        <div className="row show-user-balance-container">
            <button
                onClick={handleLoginPress}
                className="btn btn-success btn-add-wallet"
            >
                Login new wallet
            </button>
        </div>
    );
};

export default LoginWallet;
