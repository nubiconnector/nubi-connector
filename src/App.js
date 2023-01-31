import React from "react";
import "regenerator-runtime/runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import OpiumDepositPage from "./pages/OpiumDeposit/OpiumDepositPage";
import SlideBar from "./components/SlideBar/SlideBar";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: undefined,
    });
    React.useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth });
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return windowSize;
};

function App() {
    const { width } = useWindowSize();
    const breakpoint = 767;

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div
                        className={`col-${
                            width > breakpoint ? "2" : "1"
                        } p-0 position-fixed`}
                    >
                        <SlideBar width={width} />
                    </div>
                    <div
                        className={`col-${
                            width > breakpoint ? "10" : "11"
                        } px-4 mt-4 offset-${width > breakpoint ? "2" : "1"}`}
                    >
                        <Router>
                            <Routes>
                                <Route
                                    path="/opium-deposit"
                                    element={<OpiumDepositPage />}
                                    key="OpiumDepositPage"
                                />
                                <Route
                                    path="/"
                                    element={<DashboardPage />}
                                    key="Dashboard"
                                />
                            </Routes>
                        </Router>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default App;
