import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

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

    return (
        <>
            <h1>Todo List</h1>
            <ul>
                {
                    todoList.map((el) => <li id={el.id}>{el.title}</li>)
                }
            </ul>
        </>
    )
}

export default App
