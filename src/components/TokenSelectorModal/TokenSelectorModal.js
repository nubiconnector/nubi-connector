import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { catWalletAddr } from "../../utils/text";
import TextSearchField from "../TextSearchField/TextSearchField";
import "./TokenSelectorModal.sass";

function TokenSelectorModal({ loginWeb3 }) {
    const [tokens, setTokens] = useState([]);
    const [opened, setOpened] = useState(false);
    const { platformTokens } = useSelector((state) => state.tokens);

    const handleConfirm = () => {
        const closeButton = document.querySelector(
            "button[data-bs-dismiss='modal']"
        );

        closeButton.click();

        setTokens([]);
        loginWeb3(tokens);
    };

    useEffect(() => {
        const listener = document.addEventListener("click", (e) => {
            const className = e.target.className;

            if (!className.includes("text-search-field__item")) {
                setOpened(false);
            }
        });

        return () => clearTimeout(listener);
    }, []);

    const options = (platformTokens.all ?? []).map(tok => tok.name);

    const handleNewToken = tokenSymbol => {
        const token = platformTokens.all.find(tok => tok.name === tokenSymbol);

        if (token) {
            setTokens(prev => [
                ...prev,
                token,
            ]);
        }
    };

    return (
        <>
            <button
                type="button"
                hidden
                data-bs-toggle="modal"
                data-bs-target="#tokenSelectorModal"
            />
            <div
                className="modal token-selector-modal"
                tabIndex="-1"
                id="tokenSelectorModal"
            >
                <div className="modal-dialog">
                    <div className="modal-content container">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <p>
                                <b>Which assets do you keep in the wallet? </b>
                                &#128540;
                            </p>
                            <div>
                                <TextSearchField
                                    options={options}
                                    handleItemsChange={handleNewToken}
                                    setOpened={setOpened}
                                    opened={opened}
                                />
                                <div className="container md-10px">
                                    <div className="row">
                                        {tokens.map(token => (
                                            <div
                                                className="col-md-3 badge bg-primary"
                                                key={token.symbol}
                                            >
                                                <span>
                                                    {catWalletAddr(
                                                        token.symbol,
                                                        12
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleConfirm}
                            >{tokens.length === 0 ? 'I have no tokens' : 'Confirm'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TokenSelectorModal;
