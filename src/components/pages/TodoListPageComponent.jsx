import TodoList from "../TodoList.jsx";
import AddTodoForm from "../AddTodoForm.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ModalWrapper from "../ModalWrapper.jsx";
import AddListForm from "../AddListForm.jsx";

const TodoListPageComponent = () => {

    const navigate = useNavigate();


    let {listId} = useParams();
    const listTitle = JSON.parse(localStorage.getItem("savedList"))[listId].title
    const [isModalOpen, setModalOpen] = useState(false)
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        if (!isLoading) {
            const lists = JSON.parse(localStorage.getItem("savedList"));
            lists[listId]["todos"] = todoList
            localStorage.setItem("savedList", JSON.stringify(lists));
        }
    }, [todoList]);


    useEffect(() => {
        const listItems = JSON.parse(localStorage.getItem("savedList"))
        setTodoList(listItems[listId]["todos"])
        setLoading(false);
    }, [])

    const addToDo = (newToDo) => {
        setTodoList(prevState => [...prevState, newToDo])
        setModalOpen(false);
    }

    const removeHandler = (e, id) => {
        e.stopPropagation()
        setTodoList(prev => prev.filter((e) => id !== e.id))
    }

    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const handleNavigateHome = () => {
        navigate("/");
    }
    return (
        <>
            <div className="container">
                <div className="header-container">
                    <h1>{listTitle}</h1>
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

export default TodoListPageComponent