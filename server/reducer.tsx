import { ResourceStore, Resource } from "../typings";
import { updateObject } from "../utils";

const getValue = (object: ResourceStore, key: keyof ResourceStore, property: keyof Resource) => {
    return object[key] != undefined ? object[key][property] : 0;
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'increase':
            const data = updateObject(state, 
            {
                [action.item]: {
                    amount: getValue(state, action.item, "amount") + (action.amount != undefined ? action.amount : 1)
                }
            });
            return;
        case 'decrease':
            if (getValue(state, action.item, "amount") <= 0) {
                return;
            }

            updateObject(state, 
                {
                    [action.item]: {
                        amount: getValue(state, action.item, "amount") - action.amount
                    }
                });
            return;
        default:
            console.warn("invalid action.type");
            throw new Error();
    }
};

export {reducer}