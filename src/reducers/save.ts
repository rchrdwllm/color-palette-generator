import { AnyAction } from "redux";
import { ModifiedColor } from "./colors";

export interface SavedPalette {
    name: string;
    palettes: ModifiedColor[];
}

export const save = (state: SavedPalette[] = [], action: AnyAction) => {
    switch (action.type) {
        case "SAVE_COLORS":
            if (!localStorage.getItem("colors")) {
                const savedPalettes: SavedPalette[] = [];
                const toSave: SavedPalette = {
                    name: action.payload.paletteName,
                    palettes: action.payload.colors,
                };

                savedPalettes.push(toSave);

                localStorage.setItem("colors", JSON.stringify(savedPalettes));
            } else {
                const savedPalettes: SavedPalette[] = JSON.parse(
                    localStorage.getItem("colors") as string
                );
                const toSave: SavedPalette = {
                    name: action.payload.paletteName,
                    palettes: action.payload.colors,
                };

                savedPalettes.push(toSave);

                localStorage.setItem("colors", JSON.stringify(savedPalettes));
            }

            return null;
        case "REMOVE_SAVED":
            const savedColors: ModifiedColor[][] = JSON.parse(
                localStorage.getItem("colors") as string
            );

            savedColors.splice(action.payload.index, 1);

            localStorage.setItem("colors", JSON.stringify(savedColors));

            return null;
        case "GET_COLORS":
            if (localStorage.getItem("colors")) {
                return JSON.parse(localStorage.getItem("colors") as string);
            }

            return null;
        default:
            return state;
    }
};
