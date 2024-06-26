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

const TodoList = () => {

    return (
        <>
            <ul>
                {
                    todoList.map((el) => <li key={el.id}>{el.title}</li>)
                }
            </ul>
        </>
    )
}

export default TodoList;

