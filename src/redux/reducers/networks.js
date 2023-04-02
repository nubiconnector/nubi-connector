import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "network",
    initialState: {
        selectedNetwork: null,
    },
    reducers: {
        setNetworkRPCUrl: (state, action) => {
            state.networkUrl = action.payload;
        },
        setNetworkExplorerUrl: (state, action) => {
            state.explorerUrl = action.payload;
        },
    },
});

export const { setNetworkExplorerUrl, setNetworkRPCUrl } = slice.actions;

export default slice.reducer;
