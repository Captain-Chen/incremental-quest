import { useEffect, useState } from "react";
import { Navigate }  from "react-router-dom";
import socket from "../socket";

import ConnectionStatus from "./ConnectionStatus";
import Command from "./Command";
import Stocks from "./Stocks";
import EventLog from "./EventLog";
import UserList from "./UserList";

import React from "react";

const Game = () => {
    const [gameState, setState] = useState({});
    const [users, setUsers]  = useState({});// local list of users per client
    const [isConnected, setIsConnected] = useState(socket.connected);

    const updateStocks = (action) => {
        // Events won't be sent if the connection is not ready instead of using default behavior of buffering while offline
        socket.volatile.emit("updateStocks", action);
    };

    // Set-up during initial render (once)
    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };
    
        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onStateUpdate = (data) => {
            setState(data);
        }

        socket.on("state", onStateUpdate);

        // used to indicate connection status to the server
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            // TODO: Listener cleanup? Is this required? Need to read up on it.
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("state", onStateUpdate);
        };
    }, []);   
    
    useEffect(() => {
        // TODO: Need to correctly populate the "users list"
        socket.on("users", (users) => {
            setUsers(users);
        });

        socket.on("userConnected", (user) => {
            setUsers(user);
        });
    }, [users]);

    return (
        <div className="gridWrapper">
            <UserList data={users}></UserList>
            <Stocks state={gameState}></Stocks>
            <ConnectionStatus isConnected={isConnected}/>
            <fieldset className="commands">
                <Command dispatch={updateStocks} action={{ type: 'increase', item: 'wood', amount: 2 }}>Chop wood</Command>
                <Command dispatch={updateStocks} action={{ type: 'increase', item: 'meat' }}>Go hunting</Command>
                <Command dispatch={updateStocks} action={{ type: 'increase', item: 'ore', amount: 3 }}>Mine ore</Command>
                <Command dispatch={updateStocks} action={{ type: 'increase', item: 'wool' }}>Shave sheep</Command>
            </fieldset>
            <EventLog data={{}}></EventLog>
        </div>
    );
};

export default Game;