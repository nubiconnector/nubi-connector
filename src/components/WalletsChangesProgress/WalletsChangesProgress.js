import React from "react";

import "./WalletsChangesProgress.sass";

const WalletsChangesProgress = ({ walletsCount }) => {
    return (
        <div className="wallets-changes-progress">
            {new Array(walletsCount).fill(null).map((_, index) => (
                <div className="wallets-changes-progress__item" key={index}>
                    <div />
                    <div />
                </div>
            ))}
        </div>
    );
};

export default WalletsChangesProgress;
