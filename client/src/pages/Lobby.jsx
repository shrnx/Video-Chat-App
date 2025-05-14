import { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider.jsx'
import { useNavigate } from 'react-router-dom';

function Lobby() {

    const [email, setEmail] = useState("")
    const [room, setRoom] = useState("")

    const socket = useSocket();
    const navigate = useNavigate();

    // Use callback hook prevents unnecessary re-renders of components
    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket])

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data
        // Since till now user has entered the required data to join the room, we should route them to that room
        navigate(`/room/${room}`);
    }, [navigate])

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom)     // We did this to prevent multiple socket listeners
        }
    }, [socket, handleJoinRoom])

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