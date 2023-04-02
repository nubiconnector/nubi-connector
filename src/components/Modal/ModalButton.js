import React from "react";

function ModalButton(props) {
    return (
        <button
            type="button"
            class={`btn ${props.classNames}`}
            data-bs-toggle="modal"
            data-bs-target={`#${props.target}`}
        >
            {props.buttonName}
        </button>
    );
}

export default ModalButton;
