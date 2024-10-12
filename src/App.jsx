import './components/App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import style from "./components/TodoListItem.module.css"

function App() {

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    console.log(import.meta.env.VITE_AIRTABLE_API_TOKEN)

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
            }
        };


        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=view&sort[0][field]=title&sort[0][direction]=asc`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            const sortedRecords = data.records.sort((a, b) => {
                const titleA = a.fields.title.toUpperCase();
                const titleB = b.fields.title.toUpperCase();

                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            });

            const todos = sortedRecords.map(record => ({
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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <h1 className={style.headers}>Todo List</h1>
                            <AddTodoForm onAddTodo={addToDo}></AddTodoForm>
                            {isLoading ? <p>Loading...</p> :
                                <TodoList onRemoveTodo={removeHandler} todoList={todoList}></TodoList>}
                        </>

                    }>
                    </Route>

                    <Route path="/new" element={
                        <h1>New Todo List</h1>
                    }>
                    </Route>

                </Routes>

            </BrowserRouter>

        </>
    )
}

export default App
