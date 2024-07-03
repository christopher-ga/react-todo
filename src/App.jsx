import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useState} from "react";

function App() {

    const [newToDo, setNewToDo] = useState("");

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={setNewToDo}></AddTodoForm>
            <p>{newToDo}</p>
            <TodoList></TodoList>
        </>
    )
}

export default App
