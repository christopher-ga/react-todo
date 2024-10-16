import PropTypes from 'prop-types';

import ToDoListItem from "./ToDoListItem.jsx";

const TodoList = ({todoList, onRemoveTodo}) => {
    return (
        <>
            {todoList.map((el) => <ToDoListItem onRemoveTodo={onRemoveTodo} key={el.id} id={el.id} listItem={el.title}></ToDoListItem> )}
        </>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;

