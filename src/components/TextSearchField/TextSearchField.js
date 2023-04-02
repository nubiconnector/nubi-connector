import React, { useState } from "react";

import "./TextSearchField.sass";

const TextSearchField = ({ handleItemsChange, options, opened, setOpened }) => {
    const [selectOptions, setSelectedOptions] = useState(options);

    const handleTextSearch = (e) => {
        setSelectedOptions(
            options.filter(opt =>
                opt.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    const handleItemSelect = (item) => {
        handleItemsChange(item);
        setOpened(false);
    };

    const handleInputFocus = () => {
        setTimeout(() => setOpened(true), 500);
    };

    return (
        <div className="text-search-field">
            <input
                type="text"
                onChange={handleTextSearch}
                onFocus={handleInputFocus}
                className="form-control search-tokens-input"
                placeholder="Type token name.."
            />
            {opened && (
                <ul className="text-search-field__items">
                    {selectOptions.map(opt => (
                        <li onClick={() => handleItemSelect(opt)} className="text-search-field__item" key={opt}>
                            <b>{opt}</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TextSearchField;
