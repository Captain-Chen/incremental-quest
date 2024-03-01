import React, { ReactNode, Dispatch } from "React";

type Action = {
    item?: string;
    amount?: number;
    type: string;
}

interface ButtonProps {
    children: ReactNode;
    dispatch: Dispatch<Action>;
    action: Action;
}

const Command = ({ children, dispatch, action }: ButtonProps) => (
    <button onClick={() => dispatch(action)}>
        {children}
    </button>
);

export default Command;