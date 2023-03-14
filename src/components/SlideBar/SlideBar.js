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
                </div>
        </>
    );
}

export default SlideBar;
