//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import "./Sidebar.css";
import Logo from "../assets/img/salad3.png";

function Sidebar(props) {
    const classes = props.className;

    return (
        <Col className={classes}>
            <div className="sidebar shadow flex-shrink-0 p-3 text-salad-grey">
                <a
                    href="/"
                    className="d-flex align-items-center mt-2 mb-4 text-salad-grey text-decoration-none border-bottom"
                >
                    <h3 className="text-salad-green">
                        <img src={Logo} className="logo" alt="" /> NUBI
                    </h3>
                </a>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn btn-toggle align-items-center text-salad-grey rounded">
                            <i className="fa-solid fa-chart-pie"></i> Dashboard
                        </button>
                    </li>
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center text-salad-grey rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#dashboard-collapse"
                            aria-expanded="true"
                        >
                            <i className="fa-solid fa-bowl-food"></i> Products
                        </button>
                        <div className="collapse show" id="dashboard-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a
                                        href="#staking-near"
                                        className="text-salad-grey rounded"
                                    >
                                        Staking NEAR
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#staking-erc-20"
                                        className="text-salad-grey rounded"
                                    >
                                        Staking ERC20
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#deriv-near"
                                        className="text-salad-grey rounded"
                                    >
                                        DAOs NEAR
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#deriv-erc-20"
                                        className="text-salad-grey rounded"
                                    >
                                        NFTs Aurora ERC20
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#deriv-custom"
                                        className="text-salad-grey rounded"
                                    >
                                        Your own Salad
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center text-salad-grey rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#orders-collapse"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-flask"></i> Experiments
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        NEAR via Metamask
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Lauchpad
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center text-salad-grey rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#account-collapse"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-user"></i> Account
                        </button>
                        <div className="collapse" id="account-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        New account
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3"></li>
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center text-salad-grey rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#utils-collapse"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-circle-info"></i>{" "}
                            Resources
                        </button>
                        <div className="collapse" id="utils-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Whitepaper
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        More about T7T
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        More about NEAR
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        More about Blockchain
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button
                            className="btn btn-toggle align-items-center text-salad-grey rounded collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#media-collapse"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-thumbs-up"></i> Social
                            Media
                        </button>
                        <div className="collapse" id="media-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Telegram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-salad-grey rounded"
                                    >
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </Col>
    );
}

export default Sidebar;
