import style from "./TodoListItem.module.css"
const ToDoListItem = ({listItem, onRemoveTodo, id}) => {
    return (
        <>
            <li className={style.ListItem}>{listItem}</li>
            <button className={style.button} onClick={() => onRemoveTodo(id)}>Remove</button>
        </>


    )
}

export default ToDoListItem;