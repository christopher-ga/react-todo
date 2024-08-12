import {useState} from "react";
import InputWithLabel from "./InputWithLabel.jsx";

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
            <form onSubmit={handleAddTodo}>
                <InputWithLabel id="todoTitle" value={todoTitle} handleChange={handleTitleChange}>Title </InputWithLabel>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddTodoForm;