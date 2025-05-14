import React, { createContext, useContext, useMemo } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null);

// Now we will create a custom hook so that whenever we want to use socket we can simply use it directly
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket
}

export const SocketProvider = (props) => {
    // useMemo is a react hook which makes sure our socket does not gets reinitialised everytime
    const socket = useMemo(() => io('localhost:8000'))     // Where our backend is running(localhost at start)

    return (
        // Here value is actual socket only imported from socket.io-client
        <SocketContext.Provider value={socket}>   
            {props.children}
        </SocketContext.Provider>
        // We are using Context API here so that every component can use the data of sockets 
    )
}