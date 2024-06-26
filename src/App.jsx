import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";

function App() {


    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm></AddTodoForm>
            <TodoList></TodoList>
        </>
    )
}

export default App
