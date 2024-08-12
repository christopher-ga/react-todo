import React, { useEffect, useRef } from 'react';

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

export default InputWithLabel;