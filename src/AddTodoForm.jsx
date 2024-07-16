const AddTodoForm = ({onAddTodo}) => {

    const handleAddTodo = (e) => {
        e.preventDefault();
        const todoTitle = e.target.elements.title.value;
        onAddTodo(todoTitle);
        e.target.elements.title.value = ''

    }

    return (
        <>
            <form onSubmit={handleAddTodo} action="">
                <label title="Title">
                    <input name="title" id="todoTitle"/>
                </label>

                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddTodoForm;