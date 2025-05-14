import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider.jsx'

function Lobby() {

    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const socket = useSocket();

    // Use callback hook prevents unnecessary re-renders of components
    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket])

    useEffect(() => {
        socket.on("room:join", data => {
            console.log("Data from BE: ",data)
        })
    }, [])

    return (
        <>
            <div>Lobby</div>
            <form onSubmit={handleSubmitForm} >
                <label htmlFor="email">Email ID</label>
                {/* Here we linked label with input */}
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="room">Room Number</label>
                {/* Here we linked label with input */}
                <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} />
                <button>Join</button>
            </form>
        </>
    )
}

export default Lobby