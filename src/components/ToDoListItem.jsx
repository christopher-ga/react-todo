import style from "./TodoListItem.module.css"
import PropTypes from "prop-types";
const ToDoListItem = ({listItem, onRemoveTodo, id}) => {
    return (
        <>
            <li className={style.ListItem}>{listItem}</li>
            <button className={style.button} onClick={() => onRemoveTodo(id)}>Remove</button>
        </>


    )
}

ToDoListItem.propTypes = {
    listItem: PropTypes.string.isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};


export default ToDoListItem;