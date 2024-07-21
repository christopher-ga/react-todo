import ToDoListItem from "./ToDoListItem.jsx";

const TodoList = ({todoList}) => {

    return (
            <ul>
                {todoList.map((el) => <ToDoListItem key={el.id} listItem={el.title}></ToDoListItem> )}
            </ul>
    )
}

export default TodoList;

