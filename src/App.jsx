import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useEffect, useState} from "react";


function App() {

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        const response = new Promise((resolve, reject) => {
            setTimeout(() => {
                const savedTodoList = localStorage.getItem('savedTodoList');
                const todoList = savedTodoList ? JSON.parse(savedTodoList) : [];
                resolve({data: {
                    todoList
                    }})
            }, 2000)
        })

        response.then((result) => {
            setTodoList(result.data.todoList)
            setLoading(false);
        })

    }, [])

    useEffect(() => {

        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }

    }, [todoList]);

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
            {isLoading ? <p>Loading...</p> : <TodoList onRemoveTodo={removeHandler} todoList={todoList}></TodoList> }
        </>
    )
}

export default App
