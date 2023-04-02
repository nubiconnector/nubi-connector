import React, { useState } from "react";

import { BLOCKCHAINS as blockchainNetworks } from "../../constants";

import "./BlockchainsSelector.sass";

const BlockchainsSelector = ({ handleEthereumLogin, handleNearLogin }) => {
    const networks = Object.values(blockchainNetworks);
    const [network, setNetwork] = useState(null);

    const handleNetworkSelect = (e) => {
        setNetwork(e.target.value);
    };

    const handleNetworkSelectContinue = () => {
        if (network) {
            if (network === blockchainNetworks.ETH) {
                handleEthereumLogin();
            } else {
                handleNearLogin();
            }
        }
    };

    return (
        <div className="row">
            <div className="col-md-9 blockchains-selector-wrapper">
                <select
                    id="blockchainsSelector"
                    className="blockchains-selector"
                    onChange={handleNetworkSelect}
                >
                    <option key="--placeholder--">Network</option>
                    {networks.map((network) => (
                        <option key={network}>{network}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-3">
                <button
                    className="btn-link btn-continue-wallet"
                    onClick={handleNetworkSelectContinue}
                >
                    Select
                </button>
            </div>
        </div>
    );
};

export default BlockchainsSelector;
