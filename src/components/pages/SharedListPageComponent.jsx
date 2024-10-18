import TodoList from "../TodoList.jsx";
import AddTodoForm from "../AddTodoForm.jsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ModalWrapper from "../ModalWrapper.jsx";
import { io } from "socket.io-client";

const SharedListPageComponent = () => {

    const socketRef = useRef(null);
    const navigate = useNavigate();

    let {listId} = useParams();

    const [isModalOpen, setModalOpen] = useState(false)
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [listTitle, setListTitle] = useState("");


    useEffect(() => {

        socketRef.current = io("http://localhost:8080");

        socketRef.current.on("connect", () => {
            setLoading(true);
            socketRef.current.emit("joinList", {id: listId, todos: "", title: "" })
            setLoading(false);
        })

        socketRef.current.on("set-data", (data) => {
            setTodoList(data["todos"])
            console.log('woof!', data);
            setListTitle(data.title);
        })


        return () => {
            console.log("Disconnecting socket...");
            socketRef.current.emit("leave-room", listId);
            socketRef.current.disconnect();
        };

    }, []);


    const addToDo = (newToDo) => {
        setTodoList(prevState => {
            const updatedList = [...prevState, newToDo];

            socketRef.current.emit('add-todo', { id: listId, todos: updatedList, title: listTitle });

            return updatedList;
        });
        setModalOpen(false);
    }

    const removeHandler = (e, id) => {
        e.stopPropagation()
        console.log('removing');

        setTodoList(prevState => {
            const updatedList = prevState.filter((e) => id !== e.id);


            socketRef.current.emit("remove-todo", listId, id);

            return updatedList;
        });
    }

    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const handleNavigateHome = () => {
        navigate("/");
    }

    const handleUpdate = (id) => {
        const updatedTodoList = todoList.map((e) => {
            if (e.id === id) {
                return { ...e, checked: !e.checked };
            }
            return e;
        });

        setTodoList(updatedTodoList);
        console.log(updatedTodoList);
        socketRef.current.emit("check-todo", listId, updatedTodoList)
    };

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
                        <TodoList update={handleUpdate} onRemoveTodo={removeHandler} todoList={todoList}></TodoList>
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

export default SharedListPageComponent