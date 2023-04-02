import React from "react";
import "regenerator-runtime/runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import OpiumDepositPage from "./pages/OpiumDeposit/OpiumDepositPage";
import SlideBar from "./components/SlideBar/SlideBar";
import NavBar from "./components/SlideBar/NavBar";

function App() {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className='col-md-2 p-0 position-fixed d-none d-md-block'>
                        <SlideBar />
                    </div>
                    <div className='col-md-10 px-4 mt-4 offset-md-2'>
                        <NavBar/>
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
