import React, { useState } from "react";

import logo from "../../assets/img/nubi-logo-light.png";
import "./SlideBar.sass";

function SlideBar() {

    return (
        <>
            <div className="min-vh-100 bg-primary slidebar">
                <center>
                    <img src={logo} className="slidebar-logo" alt="" />
                    <br />
                    <a className="slidebar-brand text-light" href="#">
                        Nubi
                        <span className="analytics ms-1 d-none d-lg-inline">
                            Connector
                        </span>
                    </a>
                </center>
                <ul className="slidebar-menu">
                    <a className="nav-link text-light mb-1" href="/">
                        <i className="fa-solid fa-house"></i>
                        <span className="ms-1 d-none d-md-inline">
                            {" "}
                            Home
                        </span>
                    </a>
                    <a
                        href="/opium-deposit"
                        className="nav-link text-light mb-1"
                    >
                        <i className="fa-solid fa-sack-dollar"></i>
                        <span className="ms-1 d-none d-md-inline">
                            {" "}
                            Opium Example
                        </span>
                    </a>
                    <a
                        className="nav-link text-light mb-1"
                        href="https://github.com/T7TLabs/contract-bridge"
                    >
                        <i className="fa-solid fa-code-branch"></i>
                        <span className="ms-1 d-none d-md-inline">
                            {" "}
                            Github
                        </span>
                    </a>
                </ul>
                <div className="text-white fixed-bottom slidebar-menu">
                    <span className="t7t">Powered by T7T Labs©</span>
                    <div className="mxw-contacts">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default SlideBar;
