import {useState} from "react";
import InputWithLabel from "./InputWithLabel.jsx";
import PropTypes from "prop-types";
import style from "../stylesheets/modal.module.css"

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("")

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTodoTitle(value);
    }
    const handleAddTodo = (e) => {
        e.preventDefault();
        onAddTodo({title: todoTitle, id: Date.now()});
        setTodoTitle("")
    }

    return (
        <>
            <form className={style["modal-form"]} onSubmit={handleAddTodo}>
                <InputWithLabel id="todoTitle" value={todoTitle} handleChange={handleTitleChange}> </InputWithLabel>
                <button className={style["modal-button"]}  type="submit">Add</button>
            </form>
        </>
    )
}

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;