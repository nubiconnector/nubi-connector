import React, { useState, useEffect } from "react";
//import { JsonEditor } from 'rc-json-editor';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import nearLogo from "../../assets/img/near.png";
import auroraLogo from "../../assets/img/aurora.png";
import sequence from "../../assets/img/sequence.png";
import "./ChartsAndWalletsPanel.sass";

import { crossChainNearAurora__Call } from '../../assets/js/near/utils';

function ChartsAndWalletsPanel() {
    const [nearCallParams, setNearCallParams] = useState({});
    const [auroraCallJSON, setAuroraCallJSON] = useState(null);
    const [auroraCallParams, setAuroraCallParams] = useState({});
    const [callData, setCallData] = useState(null);

    let sampleObject = new Object();

    const handleParametersChange = (AuroraParamsRaw) => {
        console.log("Aurora object from the JSON editor: ", AuroraParamsRaw); // to delete
        let AuroraParamsJSON = AuroraParamsRaw.json;
        console.log(AuroraParamsJSON); // to delete

        localStorage.setItem('auroraCallParameters', JSON.stringify(AuroraParamsJSON)); // please check if this is the correct way to store the JSON object in the local storage

        // newParams[0].sub_object.forEach(param => {
        //     delete param.parent;
        //     delete param.sub_object;
        // });

        //localStorage.setItem('auroraCallParameters', JSON.stringify(newParams[0].sub_object));
    };

    const submitTestCall = () => {
        const callAsString =
            `near call ${nearCallParams.nearDeployedAccount} ${nearCallParams.nearFCall} '${JSON.stringify(auroraCallParams)}'`;

        if (
            nearCallParams.nearFCall &&
            nearCallParams.nearDeployedAccount &&
            Object.keys(auroraCallParams).length
        ) {
            setCallData(callAsString);
        }
    };

    const handleAuroraParamChange = (value, name) => {
        setAuroraCallParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const lockAuroraCallParameters = () => {
        setAuroraCallJSON(
            JSON.parse(localStorage.getItem('auroraCallParameters'))
        );
    };

    useEffect(() => {
        if (callData) {
            crossChainNearAurora__Call(
                nearCallParams.nearDeployedAccount,
                nearCallParams.nearFCall,
                auroraCallParams
            );
        }
    }, [callData]);

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="m-0 p-0 col-md-12">
                        <div className="m-0 p-4 shadow rounded text-justify">
                            <img src={nearLogo} className="bl vendor-logo d-inline-flex m-0 p-0" alt="" />
                            <img src={auroraLogo} className="bl vendor-logo d-inline-flex m-0 p-0" alt="" />
                            <h3 className="mt-2 mb-4 " id="home">NEAR-AURORA Connector Contract</h3>

                            <p>A smart contract that facilitates cross-contract communication for Near Dapps or Users with Aurora smart contracts.</p>

                            <p>To use the Smart Contract, Dapps or Users can simply use 2 methods with input parameters for Aurora calls.</p>

                            <br />
                            <h5 className="fw-bold">Writable <code>near call</code> methods</h5>

                            <div className="form-floating mb-1">
                                <input
                                    type="text"
                                    className="form-control mxw-400 bg-success text-white"
                                    id="nearAccountId"
                                    placeholder="mycontract.testnet"
                                    onChange={e => setNearCallParams(prev => ({
                                        ...prev,
                                        nearDeployedAccount: e.target.value
                                    }))}
                                />
                                <label htmlFor="nearAccountId" className="text-white fw-bold">deployedTo_NearAccountId</label>
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    type="text"
                                    className="form-control mxw-400 bg-success text-white"
                                    id="nearFCall"
                                    placeholder="getBalanceOf"
                                    onChange={e => setNearCallParams(prev => ({
                                        ...prev,
                                        nearFCall: e.target.value
                                    }))}
                                />
                                <label htmlFor="nearFCall" className="text-white fw-bold">function_call</label>
                            </div>

                            {auroraCallJSON && (
                                <div className="mb-4">
                                    <h5 className="mb-2 fw-bold">Aurora call parameters</h5>
                                    {
                                        auroraCallJSON.map(parametr => (
                                            <div className="form-floating mb-1">
                                                <input
                                                    type="text"
                                                    className="form-control in bg-success text-white"
                                                    id={parametr.key}
                                                    placeholder={parametr.key}
                                                    onBlur={e => handleAuroraParamChange(e.target.value, parametr.key)}
                                                />
                                                <label className="text-white fw-bold" htmlFor={parametr.key}>{parametr.key}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}


                            <h5 className="mt-4 fw-bold">Build Aurora call parameters (JSON format)</h5>
                            <div className="form-floating mb-1 json-editor rounded shadow">
                                {/* <JsonEditor
                                    data={{
                                        parameters: {}
                                    }}
                                    onChange={e => handleParametersChange(e)}
                                /> */}
                                <JSONInput
                                    id='json-editor'
                                    placeholder={sampleObject}                                    
                                    locale={locale}
                                    height='150px'
                                    width='100%'
                                    //theme='light_mitsuketa_tribute'
                                    //theme='dark_vscode_tribute'                                    
                                    colors={{
                                        background:"#71dd37",
                                        background_warning:"red",
                                        default:"#fff",
                                        string:"navy",
                                        primitive:"navy",
                                        number:"navy", 
                                        colon:"navy",                                       
                                        keys:"#111",
                                        error:"red"
                                    }}
                                    onChange={e => handleParametersChange(e)}
                                />
                            </div>
                            <button className="btn btn-primary px-4 mt-4" onClick={lockAuroraCallParameters}>Lock Aurora call parameters</button>
                            <button className="btn btn-primary px-4 mt-4 mx-sm-4" onClick={submitTestCall}>Test call</button>
                            {callData ? <div className="form-floating mt-2">
                                <span>Actual call</span> <br />
                                <code>{callData}</code>
                            </div> : <br />}


                            <br />
                            <h4 className="mt-4" id="necessity">Necessity</h4>
                            <p>A classic example is managing Near User's assets (NEP141), bridged using either Rainbow bridge interface or programatically within a Near Dapp, on Aurora (ERC20). Managing the assets requires Near to Aurora cross-contract calls that would trigger either Read-only or Write (state changing) methods of a corresponding ERC20 contract.</p>

                            <p>To deal with both type of methods, a proper construction of a cross-contract call combining address of a recipient contract and an input data properly hashing and concatenating called method's name and its input parameters is required. The proposed smart contract eases such cross-contract communication for Near smart contract developers by taking care of properly contructing the calls. Developers are required only to provide an address of an Aurora smart contract, method's name that needs to be called and specify its parameters, while verctorization of the data and serialization into Aurora structs are done by the proposed smart contract.</p>

                            <img src={sequence} className="w-100 d-flex rounded shadow diagram" alt="Near Aurora bridge contract" />
                            <p className="text-center text-secondary"><i>Sequence diagram of the NEAR-Aurora contract bridge</i></p>

                            <p>To deal with Write (state changing) methods, ownership requirements are a Must for a Near Dapp/User to be able to manage assets on Aurora. Deployment of the proposed smart contract to Near address on Near, owning ERC20 assets on Aurora, would make sure that Near Dapp/User can manage the assets directly from Near smart contract. In this way, developers can focus on Near smart contracts development and manage the assets on Aurora directly and securely, thus eliminating extra steps of using aurora-is-near javascript libraries thereby reducing room for potential errors.</p>

                            <p>Example of a Read-only method, checking allowance of <i className="word-break">"A5C7FDbe2a8B814369e89EAed7EE52630fcb4C59"</i>(USN) ERC20 token by an owner <i className="word-break">"6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474"</i> to spender <i className="word-break">"ffffffffffffffffffffffffffffffffffffffff"</i>:</p>

                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>near call deployedTo_NearAccountId function_call '&#123;"aurora_contract_address": <i className="word-break">"A5C7FDbe2a8B814369e89EAed7EE52630fcb4C59"</i>, "function": "allowance(address,address)", "parameters": [<i className="word-break">"6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474"</i>,<i className="word-break">"ffffffffffffffffffffffffffffffffffffffff"</i>],"&#125;' --accountId deployedTo_NearAccountId</code>
                            </div>
                            <br />

                            <p>Example of a Write (state changing method) method, approving <i className="word-break">"A5C7FDbe2a8B814369e89EAed7EE52630fcb4C59"</i> ERC20 (USN) token owned by owner <i>"6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474"</i> to be spend by spender <i>"ffffffffffffffffffffffffffffffffffffffff"</i>:</p>

                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>near call deployedTo_NearAccountId function_call '&#123;"aurora_contract_address": <i className="word-break">"A5C7FDbe2a8B814369e89EAed7EE52630fcb4C59"</i>, "function": "approve(address,uint256)", "parameters": [<i className="word-break">"6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474"</i>,"1"],"&#125;' --accountId deployedTo_NearAccountId</code>
                            </div>
                            <br />

                            <p><b>Note:</b> owner's address must be equal to the last 20-bytes of a <code className="word-break">deployedTo_NearAccountId</code>'s keccak hash (e.g., for <code className="word-break">deployedTo_NearAccountId=account.testnet</code> the last 20-bytes of <code>keccak(account.testnet)</code> is equal to <i className="word-break">6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474</i>), otherwise the ownership would not hold true and the cross-contract call would fail.</p>

                            <p>Where:<br />
                                - <code>deployedTo_NearAccountId</code> is an account id to which the smart contract is deployed<br />
                                - <code>aurora_contract_address</code> is the Aurora contract's address to which a cross-contract call is made<br />
                                - <code>function</code> is a <code>aurora_contract_address</code>'s function name<br />
                                - <code>parameters</code> is a list of parameters passed to the <code>function</code></p>

                            <br />
                            <h4 className="mt-4" id="howToUse">How to use our solution</h4>

                            <p>First, one needs to deploy the contract to the Account Id owned:</p>
                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>near deploy --wasmFile target/wasm32-unknown-unknown/release/ProxyContract.wasm --accountId deployedTo_NearAccountId</code>
                            </div>
                            <br />

                            <p>Initialize the contract:</p>
                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>near call deployedTo_NearAccountId new '{ }' --accountId deployedTo_NearAccountId</code>
                            </div>
                            <br />

                            <p>Make a desired cross-contract call:</p>
                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>near call deployedTo_NearAccountId function_call '&#123;"function": "function_name(type of parameter 1, type of parameter 2, ...)", "parameters": [parameter 1, parameter 2, ...]&#125;' --accountId deployedTo_NearAccountId</code>
                            </div>
                            <br />

                            <p>The contract does a thorough check of the input parameters to verify they correctness. In case they are incorrect, the cross-contract call is reverted (avoiding extra gas fee costs), and a clear error message is shown.</p>


                            <br />
                            <h4 className="mt-4" id="implementation">Implementation within a NEAR contract</h4>

                            <p>The example before showed the benefits of using this dynamic cross-contract call bridge while using the CLI. But its real benefits come when using it inside a smart contract in NEAR.</p>

                            <p>Someone who needs to implement a cross-contract function call between NEAR and Aurora would need to pack, encode and parse all the data to binary correctly (proper keccak, get correctly the selector bytes, etc), and proceed with calling Aurora.</p>

                            <p>In contrast, by deploying the proposed contract to owned account id, the person just needs to make a call within the contract as follows:</p>

                            <div className="shadow rounded bg-grey-900 p-4 word-break">
                                <code>function_call("aurora_contract_address", "approve(address,uint256)", &["6eba6ef721bd532ca8e5d5ec8faf7f0fa0dac474","1"]);</code>
                            </div>
                            <br />

                            <p>In contrast, by deploying the proposed contract to owned account id, the person just needs to make a call within the contract as follows:</p>


                            <p>More information can be found in the public <a href="https://drive.google.com/file/d/1B1Qy9XuKl3FYziHLFbbkQ_NfBVUFfOYm/view">.PDF presentation</a> or in our <a href="https://github.com/T7TLabs/contract-bridge">Github</a>.</p>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartsAndWalletsPanel;
