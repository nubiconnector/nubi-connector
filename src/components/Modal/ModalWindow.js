import React from "react";

function ModalWindow(props) {
    return (
        <div
            class={`modal fade ${props.classNames}`}
            id={props.target}
            tabIndex="-1"
            aria-labelledby="nubiModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="nubiModalLabel">
                            {props.modalTitle}
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">{props.modalBody}</div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={props.okFunction}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;
