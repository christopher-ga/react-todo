import {Server} from "socket.io"

const io = new Server(8080, {  cors: {
        origin: "*",
        credentials: true
    }})

const listStorage = {}

io.on("connection", (socket) => {

    socket.on("joinList", (listData) => {

        socket.join(listData.id)

        if (!listStorage[listData.id]) {
            listStorage[listData.id] = {
                ...listData
            }
        }

        socket.emit("set-data", listStorage[listData.id])
    })

    socket.on('add-todo', (listData) => {

        console.log('meow');
        listStorage[listData.id] = {
            ...listData
        }
        socket.to(listData.id).emit("set-data", listData)

    })

    socket.on("remove-todo", (listId, todoId) => {

        let todosArray = listStorage[listId].todos

        listStorage[listId].todos = todosArray.filter((e) => todoId !== e.id)

    })

    socket.on("leave-room", (listId) => {

        const listSize = io.sockets.adapter.rooms.get(listId)?.size - 1 || 0; // Number

        if (listSize === 0) {
            delete listStorage[listId]
        }

    })

    socket.on('disconnect', (reason) => {
    })
})

