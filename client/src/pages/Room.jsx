import React, { use, useCallback, useEffect, useState } from 'react'
import ReactPlayer from "react-player"
import { useSocket } from '../context/SocketProvider'

function Room() {

    // Now we need to let another person join from the room id
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState("null");
    const [myStream, setMyStream] = useState()

    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`${email} joined the room`);
        setRemoteSocketId(id)
    }, [])

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);

        return () => {
            socket.off("user:joined", handleUserJoined)
        }
    }, [socket, handleUserJoined])

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        setMyStream(stream)
    }, []);

    return (
        <div>
            <h1>Room Page</h1>
            <h4>{remoteSocketId ? "Connected" : "No one in the room"}</h4>
            {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
            {myStream &&
                <>
                    <h1>My Stream</h1>
                    <ReactPlayer playing muted height="400px" width="400px" url={myStream} />
                </>
            }
        </div>
    )
}

export default Room