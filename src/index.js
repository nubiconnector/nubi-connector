import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/sass/index.sass";
import "./assets/sass/colors.css";

// Import Buffer due to the known Webpack v5 issue with Near-js-lib
// https://github.com/near/near-api-js/issues/757
// https://github.com/randlabs/myalgo-connect/issues/27
// https://github.com/isaacs/core-util-is/issues/27#issuecomment-878969583
// https://github.com/diegomura/react-pdf/issues/1029#issuecomment-740607786
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

//
