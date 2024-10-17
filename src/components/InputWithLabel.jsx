import React, { useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import style from "../stylesheets/modal.module.css"

const InputWithLabel = ({ value, handleChange, id}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <label>
            <input
                ref={inputRef}
                className={style["modal-input"]}
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
    id: PropTypes.string.isRequired,
};


export default InputWithLabel;