import {useState} from "react";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = useState("")

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTodoTitle(value);
    }
    const handleAddTodo = (e) => {
        e.preventDefault();
        onAddTodo({title: todoTitle, id: Date.now()});
        setTodoTitle(" ")
    }

    return (
        <>
            <form onSubmit={handleAddTodo} action="">
                <label title="Title">
                    <input value={todoTitle} onChange={handleTitleChange} name="title" id="todoTitle"/>
                </label>

                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddTodoForm;