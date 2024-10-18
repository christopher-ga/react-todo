import ListsPageComponent from "./components/pages/ListsPageComponent.jsx";
import TodoListPageComponent from "./components/pages/TodoListPageComponent.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AirTableList from "./components/AirtableList.jsx";
import SharedListPageComponent from "./components/pages/SharedListPageComponent.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ListsPageComponent />,
    },
    {
        path: '/lists/:listId',
        element: <TodoListPageComponent />,
    },
    {
        path: '/airtable',
        element: <AirTableList />,
    },
    {
        path: '/shared/:listId',
        element: <SharedListPageComponent />,
    },

]);
function App() {
    return <RouterProvider router={router} />;
}

export default App

