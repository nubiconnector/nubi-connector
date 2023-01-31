import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import networks from "./reducers/networks";
import tokens from "./reducers/tokens";
import wallets from "./reducers/wallets";

const middleware = [];

middleware.push(createLogger());

export default configureStore({
    reducer: {
        networks,
        tokens,
        wallets,
    },
    middleware,
});
