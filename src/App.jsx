import HomePageComponent from "./components/HomePageComponent.jsx";
import ListPageComponent from "./components/ListPageComponent.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AirTableList from "./components/AirtableList.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePageComponent />,
    },
    {
        path: '/lists/:listId',
        element: <ListPageComponent />,
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

