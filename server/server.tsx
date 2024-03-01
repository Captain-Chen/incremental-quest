import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { resolve, join } from "path";
import { reducer } from "./reducer";
import { InMemorySessionStore } from "./sessionStore";

const app = express();
const absBasePath = resolve(__dirname, "../client");
const sessionStore = new InMemorySessionStore();

app.use(express.static(absBasePath));

app.get("*", (req, res) => {
    res.sendFile(join(absBasePath, "index.html"));
});

const server = createServer(app);
const port: number = 3000;
const io = new Server(server);
const gameState: any = {}; // TODO: Load from a file or database?
const tickRate = 60; // ms
const minute = 5;
const targetTime = 1000 * 60 * minute; // 1000ms or 1 second * 60 = 1 minute * how many minutes

const generateId = () => {
    return (+new Date).toString(36);
};

// extend interface
declare module 'socket.io' {
    interface Socket {
        uid: string;
        sessionId: string;
        username: string;
    }
}

io.use((socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
        // find the existing session
        const session = sessionStore.findSession(sessionId);
        if (session) {
            socket.sessionId = sessionId;
            socket.uid = session.uid;
            socket.username = session.username;
            return next();
        }
    }

    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }

    // create new session
    socket.sessionId = generateId();
    socket.uid = generateId();
    socket.username = username;
    next();
});

io.on("connection", (socket: Socket) => {
    console.log(`Server: ${socket.id} connected.`);

    // save the user session for lookup later
    sessionStore.saveSession(socket.sessionId, {
        uid: socket.uid,
        username: socket.username,
        connected: true
    });

    // emit session info to client
    socket.emit("session", {
        sessionId: socket.sessionId,
        uid: socket.uid,
    });

    // fetch connected users
    const users: any = {};
    sessionStore.findAllSessions().forEach((session) => {
        if (session.connected) {
            users[session.uid] = { name: session.username };
        }
    });
    socket.emit("users", users);

    // broadcast to existing connections
    socket.broadcast.emit("userConnected", { 
        uid: socket.uid,
        name: socket.username,
        connected: true
    });
    
    socket.on("disconnect", () => {
        console.log(`Server: ${socket.id} disconnected.`);
        sessionStore.saveSession(socket.sessionId, {
            uid: socket.uid,
            username: socket.username,
            connected: false
        });
        delete users[socket.uid];
        socket.broadcast.emit("userDisconnected", socket.uid);
    });

    socket.on("updateStocks", (data) => {
        reducer(gameState, data);
    });

    setInterval(() => {
        socket.emit("state", gameState);
    }, tickRate);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`, )
});