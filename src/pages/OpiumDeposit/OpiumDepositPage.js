import React, { useState, useEffect } from "react";

import { crossContractOpiumDeposit } from "../../assets/js/near/utils";

import nearLogo from "../../assets/img/near.png";
import auroraLogo from "../../assets/img/aurora.png";

const OpiumDepositPage = () => {
    const [callArguments, setCallArguments] = useState({
        spenderAddr: null,
        approverAddr: null,
        walletAddr: null
    });
    const [amount, setAmount] = useState(0);

    const scheduleDepositToOpium = () => {
        if (amount && callArguments.approverAddr && callArguments.spenderAddr && callArguments.walletAddr) {
            localStorage.setItem("lastAmountToDeposit", amount);
            localStorage.setItem("depositStep", "approve");
            localStorage.setItem("approverAddr", callArguments.approverAddr);
            localStorage.setItem("walletAddr", callArguments.walletAddr);
            localStorage.setItem("spenderAddr", callArguments.spenderAddr);

            crossContractOpiumDeposit(amount.toString());
        }
    };

    const handleChange = (value, name) => {
        setCallArguments(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        // TODO: handle transaction hash in route params after successfull deposit.
        // Show message with transaction hash:
        // toast.success("Deposited. Transaction hash is: {}.");

        const lastAmount = localStorage.getItem("lastAmountToDeposit");
        const depositStep = localStorage.getItem("depositStep");

        if (depositStep) {
            if (depositStep === "approve") {
                localStorage.setItem("depositStep", "schedule");
            } else if (depositStep === "schedule") {
                localStorage.removeItem("depositStep");
            }
        }
    }, []);

    return (
        <div className="m-0 p-0 col-md-12">
            <div className="m-0 p-4 shadow rounded">
                <img src={nearLogo} className="bl vendor-logo d-inline-flex m-0 p-0" alt="" />
                <img src={auroraLogo} className="bl vendor-logo d-inline-flex m-0 p-0" alt="" />
                <h3 className="mt-2 mb-4">Deposit example to <code><b>Opium Finance</b></code></h3>
                <p>Below, you can find an use case example of the Connector smart contract for depositing into <a href="https://app.opium.finance/">Opium.Finance</a> -  from Near Protocol to Aurora blockchain and back (Testnet).</p>

                <div className="form-floating mb-1">
                    <input
                        type="number"
                        placeholder="Deposit amount (NEAR)"
                        className="form-control mxw-400 mb-2 bg-success text-white"
                        onChange={e => setAmount(e.target.value)}
                        id="in1"
                    />
                    <label for="in1" className="text-white">Deposit amount (NEAR)</label>
                </div>

                <div className="form-floating mb-1 ">
                    <input
                        type="text"
                        placeholder="Token approver address (0x..)"
                        className="form-control mxw-400 mb-2 bg-success text-white"
                        onChange={e => handleChange(e.target.value, 'approverAddr')}
                        id="in2"
                    />
                    <label for="in2" className="text-white">Token approver address (0x..)</label>
                </div>

                <div className="form-floating mb-1">
                    <input
                        type="text"
                        placeholder="Token spender (protocol) address (0x..)"
                        className="form-control mxw-400 mb-2  bg-success text-white"
                        onChange={e => handleChange(e.target.value, 'spenderAddr')}
                        id="in3"
                    />
                    <label for="in3" className="text-white">Token spender (protocol) address (0x..)</label>
                </div>

                <div className="form-floating mb-1">
                    <input
                        type="text"
                        placeholder="Near related address (0x..)"
                        className="form-control mxw-400 mb-2  bg-success text-white"
                        onChange={e => handleChange(e.target.value, 'walletAddr')}
                        id="in4"
                    />
                    <label for="in4" className="text-white">Near related address (0x..)</label>
                </div>

                <button
                    className="mt-3 mb-4 px-4 btn btn-primary"
                    onClick={scheduleDepositToOpium}
                >Deposit</button>
            </div>
        </div>
    );
};

export default OpiumDepositPage;
