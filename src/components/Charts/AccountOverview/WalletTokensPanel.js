import React from "react";

import Accordion from "../../Accordion/Accordion";

import './AccountsOverview.sass';

const WalletTokensPanel = ({ tokenAssets }) => {
    return (
        <Accordion title="Toggle token balances" className="wallets-panel__tokens">
            <div className="row mt-2">
                <div className="col-md-12">
                    <div class="card card-body">
                        <div className="row">
                            {tokenAssets.map(
                                ({ name, balanceNative, balance }) => {
                                    return (
                                        <div key={name} className="col-md-2">
                                            <b className="wallets-panel__tokens__token-balance">{balanceNative ?? balance}</b>
                                            <b className="wallets-panel__tokens__token-name">{name}</b>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Accordion>
    );
};

export default WalletTokensPanel;
