import { useEffect, useState } from "react";

import { getValidatorsForCurrentEpoch } from "../assets/js/near/utils";

const useNetwork = () => {
    const [networkRpc, setNetworkRpc] = useState();
    const [nearNodeState, setNearNodeState] = useState(null);
    const [nearEpochValidators, setNearEpochValidators] = useState(null);

    const requestNearEpochValidators = async () => {
        const validatorsInfo = await getValidatorsForCurrentEpoch(networkRpc);
        const validatorsReadable = await validatorsInfo.body.getReader().read();
        const textValue = new TextDecoder().decode(validatorsReadable.value);
        const parsed = JSON.parse(textValue);
        const { validators, sync_info: latestNodeState } = parsed?.result;

        setNearEpochValidators(validators);
        setNearNodeState(latestNodeState);
    };

    useEffect(() => {
        requestNearEpochValidators();
    }, []);

    return {
        networkRpc,
        nearNodeState,
        nearEpochValidators,
        setNetworkRpc,
    };
};

export default useNetwork;
