import './App.css'

const todoList = [
    {
        id: 1,
        title: 'Complete CTD Hawk assignment'
    },
    {
        id: 2,
        title: 'Call vet'
    },
    {
        id: 3,
        title: 'Cook family dinner'
    }
];

function App() {

    return (
        <>
            <h1>Todo List</h1>
            <ul>
                {
                    todoList.map((el) => <li key={el.id}>{el.title}</li>)
                }
            </ul>
        </>
    )
}

export default App
