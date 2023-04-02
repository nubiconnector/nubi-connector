import React from "react";

const NetworkInformation = ({ activeNetwork }) => {
    return (
        <div className="row">
            <div className="col-md-2">
                <h3>Accounts</h3>
            </div>
            <div className="col-md-8"></div>
            {activeNetwork && (
                <div className="col-md-2 position-relative">
                    <div>
                        <b className="text-success">Active network (ETH)</b>
                        <br />
                        <span>{activeNetwork}</span>
                    </div>
                    <div className="active-circle" />
                </div>
            )}
        </div>
    );
};

export default NetworkInformation;
