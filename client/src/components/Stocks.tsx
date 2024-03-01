import { ResourceStore } from "../../../typings"; // TODO: have this point to project path?
import { capitalize } from "../../../utils";
import React from "react";

const Stocks = ({state}) => (
    <fieldset className="stocks">
        <legend>Stocks</legend>
            {Object.keys(state).map(
                (item: keyof ResourceStore, idx) => {
                    const { amount } = state[item];
                    if (typeof state[item] == 'function') { return null; }
                    return (
                        <div key={idx}>{capitalize(item)}: {amount}</div>
                    );
                }
            )}
    </fieldset>
);

export default Stocks;