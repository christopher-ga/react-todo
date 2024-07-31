const ToDoListItem = ({listItem, onRemoveTodo, id}) => {
    return (
        <>
            <li>{listItem}</li>
            <button onClick={() => onRemoveTodo(id)}>Remove</button>
        </>


    )
}

export default ToDoListItem;