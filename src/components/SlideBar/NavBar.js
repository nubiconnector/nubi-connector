import React from "react";
import logo from "../../assets/img/nubi-logo-bright.png";

let url = window.location.href;
if (url.includes('#')) {
    url = url.split('#')[0];
}
if (url.includes('opium-deposit')) {
    url = url.split('opium-deposit')[0];
}

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
                            <a className="nav-link active" aria-current="page" href={url}>
                                <i className="fa-solid fa-house"></i>{" "}
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="necessity" href={url + '#necessity'}>
                                <i className="fa-solid fa-clipboard-question"></i>{" "}
                                Necessity
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="howToUse" href={url + '#howToUse'}>
                                <i className="fa-solid fa-screwdriver-wrench"></i>{" "}
                                How to use
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="implementation" href={url + '#implementation'}>
                                <i className="fa-solid fa-code"></i>{" "}
                                Implementation
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href={url + 'opium-deposit'}>
                                <i className="fa-solid fa-sack-dollar"></i>{" "}
                                Opium Example
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" target="_blank" href="https://github.com/T7TLabs/nubi-connector-contract-bridge">
                                <i className="fa-solid fa-code-branch"></i>{" "}
                                GitHub
                            </a>
                        </li>
                        <hr className="my-1 p-0"/>
                        <li className="nav-item">
                            <span className="t7t text-secondary">Powered by T7T Labs© </span><br/>
                            <a className="nav-link d-inline-flex" target="_blank" href="mailto:contact@t7tlabs.com">
                                <i className="fa-regular fa-envelope"></i>
                            </a>
                            <a className="nav-link  d-inline-flex mx-2" target="_blank" href="https://t.me/t7tlabs">
                                <i className="fa-brands fa-telegram"></i>
                            </a>
                            <a className="nav-link  d-inline-flex" target="_blank" href="https://t7tlabs.com/">
                                <i className="fa-solid fa-globe"></i>
                            </a>                            
                            <a className="nav-link  d-inline-flex mx-2" target="_blank" href="https://www.instagram.com/t7tlabs/">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a className="nav-link  d-inline-flex" target="_blank" href="https://twitter.com/t7tlabs">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a className="nav-link  d-inline-flex mx-2" target="_blank" href="https://www.linkedin.com/company/t7tlabs/">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                            <a className="nav-link  d-inline-flex" target="_blank" href="https://discord.com/channels/966275181502935060/966275181981089794">
                                <i className="fa-brands fa-discord"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default NavBar;
