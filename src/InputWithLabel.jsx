import React, { useEffect, useRef } from 'react';

const InputWithLabel = ({ listTitle, handleTitleChange, children }) => {
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
                value={listTitle}
                onChange={handleTitleChange}
                name="title"
                id="todoTitle"
            />
        </label>
    );
}

export default InputWithLabel;