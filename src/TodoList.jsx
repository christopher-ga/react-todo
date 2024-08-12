import ToDoListItem from "./ToDoListItem.jsx";

const TodoList = ({todoList, onRemoveTodo}) => {

    return (
            <ul>
                {todoList.map((el) => <ToDoListItem onRemoveTodo={onRemoveTodo} key={el.id} id={el.id} listItem={el.title}></ToDoListItem> )}
            </ul>
    )
}

export default TodoList;

