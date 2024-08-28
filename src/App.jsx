import './App.css'
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useEffect, useState} from "react";


function App() {

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
            }
        };

        console.log(import.meta.env.VITE_AIRTABLE_API_TOKEN)

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            const todos = data.records.map(record => ({
                title: record.fields.title,
                id: record.id
            }));

            setTodoList(todos);
            setLoading(false);

        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    };


    useEffect(() => {
        fetchData()
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
