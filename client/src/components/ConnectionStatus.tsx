import React from "react";

const ConnectionStatus = ({ isConnected }) => (
    <fieldset>
        <legend>Connection</legend>
        <div>{isConnected ? "Online" : "Offline"}</div>
    </fieldset>
);

export default ConnectionStatus;