import { combineReducers } from "redux";
import { colors } from "./colors";
import { save } from "./save";
import { modal } from "./modal";
import { library } from "./library";

export const allReducers = combineReducers({ colors, save, modal, library });
