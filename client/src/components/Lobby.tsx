import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Lobby = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error(err.message);
    });
  }, []);

  const joinRoom = (e) => {
    e.preventDefault();
    socket.auth = {username};
    socket.connect();
    // TODO: Check before navigating?
    navigate("/town");
  }

  return (
    <div className="flexWrapper">
      <h1>Welcome to Incremental Quest!</h1>
      <form className="formWrapper" onSubmit={joinRoom}>
        <input placeholder="Enter a username" onChange={e => setUsername(e.target.value)} />
        <button type="submit" className="btn" onClick={joinRoom}>Join Room</button>
      </form>
    </div>
  );
};

export default Lobby;