import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Game from "./Game";
import Lobby from "./Lobby";
import socket from "../socket";

const App = () => {
    // should run once on component mount
    useEffect(() => {
        socket.on("session", ({ sessionId, userId }) => {
            socket.auth = { sessionId };
            sessionStorage.setItem("sid", sessionId);
        });

        // TODO: Handle refresh on lobby page i.e. "/"
        const sessionId = sessionStorage.getItem("sid");
        if (sessionId) {
            socket.auth = { sessionId };
            socket.connect();
        }
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Lobby/>} />
            <Route path="/town" element={<Game/>} />
        </Routes>
    );
}

export default App;