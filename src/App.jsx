import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useEffect, useState} from "react";

function useSemiPersistentState() {

    const [todoList, setTodoList] = useState(() => {
        const savedTodos = localStorage.getItem('savedTodoList');
        return JSON.parse(savedTodos) || []
    });

    useEffect(() => {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }, [todoList]);

    return [todoList, setTodoList];
}
function App() {

    const [todoList, setTodoList] = useSemiPersistentState();

    const addToDo = (newToDo) => {
        setTodoList(prevState => [...prevState, newToDo])
    }

    const removeHandler = (id) => {
        setTodoList(prev => prev.filter((e) => id !== e.id))
    }

    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addToDo}></AddTodoForm>
            <TodoList onRemoveTodo = {removeHandler} todoList = {todoList}></TodoList>
        </>
    )
}

export default App
