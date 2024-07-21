import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useState} from "react";

function App() {

    const [todoList, setTodoList] = useState([])

    const addToDo = (newToDo) => {
        setTodoList(prevState => [...prevState, newToDo])
    }

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addToDo}></AddTodoForm>
            <TodoList todoList = {todoList}></TodoList>
        </>
    )
}

export default App
