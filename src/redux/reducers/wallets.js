import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "wallets",
    initialState: {
        userWallets: [],
    },
    reducers: {
        setUserWallets: (state, action) => {
            state.userWallets = action.payload;
        },
    },
});

export const { setUserWallets } = slice.actions;

export default slice.reducer;
