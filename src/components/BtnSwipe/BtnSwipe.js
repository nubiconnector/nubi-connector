import React, { useState, useRef } from "react";
import "./BtnSwipe.css";

const BtnSwipe = ({
    title,
    onPress,
    onChangeState,
    swappableElementWidth = 100,
    disabled,
}) => {
    const [offset, setOffset] = useState(0);
    const [progress, setProgress] = useState(false);
    const buttonRef = useRef();

    const handleSwapOver = (e) => {
        if (!progress) {
            let x = offset - e.clientX;

            if (x < 0) {
                x *= -1;
            }

            if (x > swappableElementWidth) {
                onChangeState();
            }

            setProgress(true);
            setTimeout(() => setProgress(false), 1000);
            setOffset(e.clientX);
        }
    };

    return (
        <button
            ref={buttonRef}
            className="btn swappable-btn btn-outline-grey"
            onMouseMove={handleSwapOver}
            onClick={onPress}
            disabled={disabled}
        >
            {title}
        </button>
    );
};

export default BtnSwipe;
