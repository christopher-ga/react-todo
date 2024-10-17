import '../App.css'
import {useEffect, useState} from "react";
import AddListForm from "../AddListForm.jsx";
import CurrentLists from "../CurrentLists.jsx";
import {useNavigate} from "react-router-dom";
import ModalWrapper from "../ModalWrapper.jsx";

function ListsPageComponent() {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false)

    const [isLoading, setLoading] = useState(true);
    const [lists, setLists] = useState([]);

    const generateId = () => Math.floor(Math.random() * 1000 + 1);

    const addList = (title) => {

        const id = generateId();

        const newList = {
            id,
            title,
            todos: []
        };

        setLists((prevLists) => ([
            ...prevLists,
            newList
        ]));

        setModalOpen(false);
    }

    const removeHandler = (e, id) => {
        e.stopPropagation();


        setLists(prev => prev.filter((e) => id !== e.id))
    }

    const handleModal = (e) => {
        setModalOpen(!isModalOpen)
    }

    const handleClickList = (id) => {
        if (id === "airtable") {
            navigate(`/airtable`)
        } else {

            navigate(`/lists/${id}`)
        }
    }

    useEffect(() => {
        const storedLists = localStorage.getItem('savedList');
        if (storedLists) {
            const parsedLists = Object.values(JSON.parse(storedLists));
            setLists(parsedLists)
        }

        setLoading(false);
    }, [])

    useEffect(() => {
        if (!isLoading) {
            const listStorage = {};
            lists.forEach((e) => {
                listStorage[e.id] = e;
            })
            localStorage.setItem('savedList', JSON.stringify(listStorage));
        }
    }, [lists]);


    return (
        <>
            <div className="container">
                <div className="header-container">
                    <h1>TO DO HOME</h1>
                </div>

                <nav className="nav-wrapper">
                    <div>
                        <button onClick={handleModal}>Add List</button>
                    </div>
                </nav>

                <section className="wrapper">
                    {isLoading ? (<p>Loading...</p>) : (<section className="list-item-wrapper">
                        <CurrentLists onListClick={handleClickList} onRemoveTodo={removeHandler}
                                      lists={lists}></CurrentLists>
                    </section>)}
                </section>
            </div>

            {isModalOpen && <ModalWrapper handleModal={handleModal} modalHeader="Enter List Name">
                <AddListForm onAddList={addList}></AddListForm>
            </ModalWrapper>
            }
        </>
    )
}

export default ListsPageComponent
