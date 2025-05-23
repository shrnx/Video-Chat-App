import { Server } from "socket.io";

const io = new Server(8000, {
    cors: true
})

const emailToSocketIdMap = new Map();       // Email se socketId nikal sakte hai 
const SocketIdToEmailMap = new Map();       // Vice versa

io.on("connection", socket => {
    console.log("Socket Connected", socket.id);
    socket.on("room:join", data => {        // Basically users enters some data and we let them join that particular room
        const { email, room } = data
        emailToSocketIdMap.set(email, socket.id)
        SocketIdToEmailMap.set(socket.id, email)

        // Now when another person joins the room, send info to existing joined members
        io.to(room).emit("user:joined", { email, id: socket.id});
        socket.join(room);

        io.to(socket.id).emit("room:join", data)
    })
})