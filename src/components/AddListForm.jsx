import style from "./TodoListItem.module.css"
import {useState} from "react";
import InputWithLabel from "./InputWithLabel.jsx";
import PropTypes from "prop-types";

const AddTodoForm = ({onAddList}) => {
    const [todoTitle, setTodoTitle] = useState("")

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTodoTitle(value);
    }

    const handleAddList = (e) => {
        e.preventDefault();
        onAddList(todoTitle);
    }

    return (
        <>
            <form className="modal-form" onSubmit={handleAddList}>
                <InputWithLabel id="todoTitle" value={todoTitle} handleChange={handleTitleChange}> </InputWithLabel>
                <button className="modal-button" type="submit">Add</button>
            </form>
        </>
    )
}

AddTodoForm.propTypes = {
    onAddList: PropTypes.func.isRequired,
};

export default AddTodoForm;