import React, { useState } from "react";

const Accordion = ({ children, title, className }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(_ => !_);
    };

    return (
        <div className={`accordion ${className}`}>
            <button onClick={toggleExpand} className="btn-dashboard-show-stats btn">
                {title}
            </button>
            <div className={`accordion-container${expanded ? " expanded" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default Accordion;
