import { AnyAction } from "redux";

export const modal = (state: boolean = false, action: AnyAction) => {
    switch (action.type) {
        case "OPEN_CLOSE_MODAL":
            return !state;
        default:
            return state;
    }
};
