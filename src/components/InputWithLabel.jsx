import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";

const InputWithLabel = ({ value, handleChange, children, id}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <label>
            {children}
            <input
                ref={inputRef}
                value={value}
                onChange={handleChange}
                id={id}
            />
        </label>
    );
}

InputWithLabel.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
};


export default InputWithLabel;