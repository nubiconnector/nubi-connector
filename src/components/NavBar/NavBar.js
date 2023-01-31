import React from "react";
import ModalButton from "../Modal/ModalButton";

// Import images
import logo from "../../assets/img/nubi-logo-light.png";
//import logo from '../../assets/img/nubi-logo-small.jpg';
//import avatar from '../../assets/img/undraw_profile_2.svg';

function NavBar() {
    return (
        <nav className="navbar navbar-dark sticky-top navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <img src={logo} className="logo" />
                <a className="navbar-brand" href="#">
                    Nubi Analytics
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav my-2 mx-4 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <a
                                className="nav-link fs-5 text-white"
                                aria-current="page"
                                href="#"
                            >
                                <i className="fa-solid fa-chart-simple"></i>{" "}
                                Dashboard
                            </a>
                        </li>
                        {/** 
                         <li className="nav-item dropdown">
                            <a className="nav-link fs-5 text-white dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-sack-dollar"></i> Investments
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#">Funds</a>
                                <a className="dropdown-item" href="#">Derivatives</a>
                                <a className="dropdown-item" href="#">Staking</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">All Products</a>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link fs-5 text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user"></i> Account
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Wallets</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                            </ul>
                        </li>                        
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link fs-5 text-white dropdown-toggle" href="#" data-toggle="dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-receipt"></i> Resources
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="https://github.com/T7TLabs" target="_blank" rel="noreferrer">Github</a></li>
                                <li><a className="dropdown-item" href="https://www.t7tlabs.com">About T7T</a></li>
                            </ul>
                        </li>
                         */}
                    </ul>
                    <ModalButton
                        classNames="btn-light"
                        target="modal1"
                        buttonName="Test Modal Window"
                    />
                    {/** <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                            <img src={avatar} className="logo" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">My Wallets</a></li>
                            <li><a className="dropdown-item" href="#">Add New Wallet</a></li>
                            <li><a className="dropdown-item" href="#">Log Out</a></li>
                        </ul>
    </div> **/}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
