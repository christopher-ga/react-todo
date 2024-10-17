import ListsPageComponent from "./components/pages/ListsPageComponent.jsx";
import TodoListPageComponent from "./components/pages/TodoListPageComponent.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AirTableList from "./components/AirtableList.jsx";

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
    }
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App

