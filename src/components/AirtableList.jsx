import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ModalWrapper from "./ModalWrapper.jsx";
import AddListForm from "./AddListForm.jsx";

const AirTableList = () => {

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false)
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);

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
    const deleteRecord = async (recordId) => {

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${recordId}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json()
    }
    const addRecord = async (title) => {

        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

        const data = {
            records: [
                {
                    fields: {
                        title
                    }
                }
            ]
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }


    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {

        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }

    }, [todoList]);
    const addToDo = async (newToDo) => {
        await addRecord(newToDo.title)
        setTodoList(prevState => [...prevState, newToDo])
        setModalOpen(false);
    }
    const removeHandler = async (e, id) => {
        await deleteRecord(id);
        setTodoList(prev => prev.filter((e) => id !== e.id))
    }

    const handleNavigateHome = () => {
        navigate("/");
    }

    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    return (
        <>
            <div className="container">
                <div className="header-container">
                    <h1>Air Table List</h1>
                </div>

                <nav className="nav-wrapper">
                    <div>
                        <button onClick={handleModal}>Add Task</button>
                    </div>

                    <div>
                        <button onClick={handleNavigateHome}>See All Lists</button>
                    </div>
                </nav>

                <section className="wrapper">
                    {isLoading ? (<p>Loading...</p>) : (<section className="list-item-wrapper">
                        <TodoList onRemoveTodo={removeHandler} todoList={todoList}></TodoList>
                    </section>)}
                </section>
            </div>

            {isModalOpen && <ModalWrapper handleModal={handleModal} modalHeader="Enter Task">
                <AddTodoForm onAddTodo={addToDo}></AddTodoForm>
            </ModalWrapper>
            }
        </>
    )
}

export default AirTableList