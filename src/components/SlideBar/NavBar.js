import React from "react";
import logo from "../../assets/img/nubi-logo-bright.png";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light shadow rounded mb-4 d-md-none">
            <div className="container-fluid py-1 px-3">
                <div className="align-items-center d-flex">
                    <img src={logo} className="logo" alt="" />
                    <a className="slidebar-brand m-0 text-primary" href="index.html">
                        Nubi
                        <span className="analytics ms-1 d-lg-inline">
                            Connector
                        </span>
                    </a>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mt-2">
                            <a className="nav-link active" aria-current="page"  href="/">
                                <i className="fa-solid fa-house"></i>{" "}
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="necessity" href="#necessity">
                                <i className="fa-solid fa-clipboard-question"></i>{" "}
                                Necessity
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="howToUse" href="#howToUse">
                            <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                                How to use
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="implementation" href="#implementation">
                            <i className="fa-solid fa-code"></i>{" "}
                                Implementation
                            </a>
                        </li>                        
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/opium-deposit">
                                <i className="fa-solid fa-sack-dollar"></i>{" "}
                                Opium Example
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_blank" href="https://github.com/T7TLabs/contract-bridge">
                                <i className="fa-solid fa-code-branch"></i>{" "}
                                GitHub
                            </a>
                        </li>                                                                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
