import {
    connect,
    Contract,
    keyStores,
    WalletConnection,
    utils,
} from "near-api-js";
import { toast } from "react-toastify";
import {
    BLOCKS_INTERVAL_FETCHES_PER_HOUR_APPROX,
    BLOCKS_INTERVAL_FETCHES_PER_DAY_APPROX,
    QUERY_PERIODS,
} from "../../../constants";
import { getConfig, getCommonRPCHeaders } from "./config";
import {
    Near_Contracts,
    Near_DEFAULT_GAS_PRICE,
    Near_SupportedNetwork_V0,
    NearUSDNContract_WRITE_METHODS,
    NearValidatorContract_READ_METHODS,
    NearProxyContract_WRITE_METHODS,
} from "./constants";

const nearConfig = getConfig(Near_SupportedNetwork_V0);
const fetchIntervals = {
    perDay: BLOCKS_INTERVAL_FETCHES_PER_DAY_APPROX,
    perHour: BLOCKS_INTERVAL_FETCHES_PER_HOUR_APPROX,
};

async function parseResponse(response) {
    const responseReadable = await response.body.getReader().read();
    const responseValue = new TextDecoder().decode(responseReadable.value);
    const parsed = JSON.parse(responseValue);

    return parsed;
}

export async function getCurrentBlockInfo(networkUrl) {
    const response = await fetch(networkUrl, {
        ...getCommonRPCHeaders(),
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0.1",
            method: "block",
            params: {
                finality: "final",
            },
        }),
    });

    return response;
}

export async function getChanges(networkUrl, accountId) {
    const response = await fetch(networkUrl, {
        ...getCommonRPCHeaders(),
        body: getAccountChangesRequestPayload(null, accountId),
    });

    return response;
}

export async function getPoolBalance(poolAddress, networkUrl) {
    const response = await fetch(networkUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0.1",
            method: "query",
            params: {
                request_type: "call_function",
                finality: "final",
                block_id: 98384873,
                account_id: poolAddress,
                method_name: "get_total_staked_balance",
                args_base64: btoa(JSON.stringify({})),
            },
        }),
    });

    return response;
}

export async function getValidatorsForCurrentEpoch(networkUrl) {
    const response = await fetch(networkUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0.1",
            method: "status",
            params: [],
        }),
    });

    return response;
}

export async function getPoolAccountBalance(
    poolAddress,
    networkUrl,
    method,
    blockId
) {
    const response = await fetch(networkUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0.1",
            method: "query",
            params: {
                request_type: "call_function",
                finality: "final",
                block_id: blockId,
                account_id: poolAddress,
                method_name: method,
                args_base64: btoa(
                    JSON.stringify({
                        account_id: window.accountId,
                    })
                ),
            },
        }),
    });

    return response;
}

export async function ping(stakingContract) {
    await initContract(stakingContract, [], NearValidatorContract_READ_METHODS);

    await window.contract.ping({});
}

export async function stake(stakingContract, amount) {
    const yocto = utils.format.parseNearAmount(amount);

    await initContract(stakingContract, [], NearValidatorContract_READ_METHODS);
    await window.contract.deposit_and_stake({}, Near_DEFAULT_GAS_PRICE, yocto);
}

export async function unstake(stakingContract, amount) {
    await initContract(stakingContract, [], NearValidatorContract_READ_METHODS);

    if (!amount) {
        await window.contract.unstake_all({}, Near_DEFAULT_GAS_PRICE);
    } else {
        const yocto = utils.format.parseNearAmount(amount);

        await window.contract.unstake(
            {
                amount: yocto,
            },
            Near_DEFAULT_GAS_PRICE
        );
    }
}

export async function withdraw(stakingContract, amount) {
    const yocto = utils.format.parseNearAmount(amount);

    await initContract(stakingContract, [], NearValidatorContract_READ_METHODS);
    await window.contract.withdraw(
        {
            amount: yocto,
        },
        Near_DEFAULT_GAS_PRICE
    );
}

export async function connectNear() {
    // Initialize connection to the NEAR testnet
    const near = await connect(
        Object.assign(
            {
                deps: {
                    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
                },
            },
            nearConfig
        )
    );

    window.near = near;
    // Initializing Wallet based Account. It can work with NEAR testnet wallet that
    // is hosted at https://wallet.testnet.near.org
    window.walletConnection = new WalletConnection(near);

    // Getting the Account ID. If still unauthorized, it's just empty string
    window.accountId = window.walletConnection.getAccountId();
}

export function getAccountChangesRequestPayload(blockId, accountId) {
    return JSON.stringify({
        jsonrpc: "2.0",
        id: "0.1",
        method: "EXPERIMENTAL_changes",
        params: {
            changes_type: "account_changes",
            account_ids: [accountId],
            finality: 'final',
        },
    });
}

function getAccountStateRequestPayload(blockId, accountId) {
    return JSON.stringify({
        jsonrpc: "2.0",
        id: "0.1",
        method: "query",
        params: {
            request_type: "view_account",
            block_id: blockId,
            account_id: accountId,
        },
    });
}

export async function getAccountPeriodBalance(
    accountId,
    period = QUERY_PERIODS.Day
) {
    // eslint-disable-next-line no-unused-vars
    const blockInfoResponse = await getCurrentBlockInfo(nearConfig.nodeUrl);

    try {
        /* const { result, error } = await parseResponse(blockInfoResponse);

    if (error) {
      throw new Error(`Can't get block id ${JSON.stringify(error)}.`);
    } */

        let blockHeight = 103293643; // result?.header?.height;

        let callsConfig;
        let calls = [];

        if (period === QUERY_PERIODS.Day) {
            callsConfig = {
                count: 24,
                mode: "perHour",
            };
        } else if (period === QUERY_PERIODS.Week) {
            callsConfig = {
                count: 7,
                mode: "perDay",
            };
        } else if (period === QUERY_PERIODS.Month) {
            callsConfig = {
                count: 30, // average
                mode: "perDay",
            };
        } else if (period === QUERY_PERIODS.Year) {
            callsConfig = {
                count: 365,
                mode: "perDay",
            };
        }

        for (let i = 0; i < callsConfig.count; i++) {
            calls = [
                ...calls,
                fetch(nearConfig.archivalNodeUrl, {
                    ...getCommonRPCHeaders(),
                    body: getAccountStateRequestPayload(blockHeight, accountId),
                }),
            ];
            blockHeight -= fetchIntervals[callsConfig.mode];
        }

        let balancesForCertainPeriods = await Promise.all(calls);
        balancesForCertainPeriods = (
            await Promise.all(
                balancesForCertainPeriods.map((singleResponse) =>
                    parseResponse(singleResponse)
                )
            )
        )
            .map((balanceResponse) =>
                parseFloat(
                    convertNearToYoctoAndBack(balanceResponse.result?.amount)
                )
            )
            .filter((amount) => !Number.isNaN(amount));

        return balancesForCertainPeriods;
    } catch (err) {
        console.log(
            "Error processing balances for period ",
            period,
            err.message
        );
    }
}

// Initialize contract & set global variables
export async function initContract(
    contractName,
    viewOnlyMethods,
    readMethods
) {
    if (contractName) {
        await connectNear();

        // Initializing our contract APIs by contract name and configuration
        window.contract = new Contract(
            window.walletConnection.account(),
            contractName,
            {
                // View methods are read only. They don't modify the state, but usually return some value.
                viewMethods: viewOnlyMethods,
                // Change methods can modify the state. But you don't receive the returned value when called.
                changeMethods: readMethods,
            }
        );
    }
}

export function signOut() {
    if (window.walletConnection.isSignedIn()) {
        window.walletConnection.signOut();
    }

    return true;
}

export async function signInContract(contractName) {
    if (contractName) {
        window.walletConnection.requestSignIn(
            contractName,
            "Sign in to Near on behalf on Near user."
        );
    }
}

export const getConnectedAccountBalance = async () => {
    const balance = await (
        await window.walletConnection.account()
    ).getAccountBalance();

    return balance;
};

export const convertNearToYoctoAndBack = (amount, toYocto = false) => {
    const converted = toYocto
        ? utils.format.parseNearAmount(amount)
        : utils.format.formatNearAmount(amount);

    if (!toYocto) {
        return converted;
    } else {
        return converted;
    }
};

export function transfer() {
    window.walletConnection.account().sendMoney(
        "muftiev.testnet", // receiver account
        "1000000000000000000000000" // amount in yoctoNEAR
    );
}

export async function crossContractOpiumDeposit(amount, protocol = "testnet") {
    // "7fA040f81Facd0eDD0bEf9544238775F7562e756"
    // Connect Near browser API.
    await connectNear();

    // Check if account ID is connected.
    if (!window.walletConnection?.isSignedIn()) {
        await signInContract(Near_Contracts[protocol].USDN);
    } else {
        // Deposit flow:
        // 1. ft_transfer_call()
        // 2. aurora_call_methodAddrUint(approve)
        // 3. aurora_call_methodAddrUint(scheduleDeposit)
        await initContract(Near_Contracts[protocol].USDN, [], NearUSDNContract_WRITE_METHODS);

        const txFee = convertNearToYoctoAndBack("0.000000000000000000000001", true);

        await window.contract.ft_transfer_call({
            receiver_id: "aurora",
            amount: amount,
            msg: "",
        }, Near_DEFAULT_GAS_PRICE, txFee);
    }
}

export async function crossChainNearAurora__Call(nearDeployedAccount, nearFunction, auroraCallArgs, onSuccess) {
    await connectNear();

    if (auroraCallArgs.uint_) {
        auroraCallArgs.uint_ = Number(auroraCallArgs.uint_);
    }

    if (!window.walletConnection?.isSignedIn()) {
        await signInContract(nearDeployedAccount);
    } else {
        await initContract(
           nearDeployedAccount,
            [],
            NearProxyContract_WRITE_METHODS
        );

        try {
            if (window.contract[nearFunction]) {
                await window.contract[nearFunction](auroraCallArgs);

                onSuccess();
            }
        } catch (err) {
            onSuccess();
        }
    }
}
