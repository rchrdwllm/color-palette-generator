import { AnyAction } from "redux";

export const library = (state: boolean = false, action: AnyAction) => {
    switch (action.type) {
        case "OPEN_CLOSE_LIBRARY":
            return !state;
        default:
            return state;
    }
};
