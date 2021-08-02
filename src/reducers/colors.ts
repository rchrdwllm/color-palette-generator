import { AnyAction } from "redux";
import { Color } from "chroma-js";
import chroma from "chroma-js";

export interface ModifiedColor extends Color {
    hexName?: string;
    hueValue?: number;
    satValue?: number;
    briValue?: number;
    locked?: boolean;
    satScale?: any;
    briScale?: any;
}

const initialState = ["", "", "", "", ""];

export const colors = (
    state: string[] | ModifiedColor[] = initialState,
    action: AnyAction
) => {
    switch (action.type) {
        case "GENERATE_COLORS":
            if ((state as ModifiedColor[]).every((color) => color)) {
                const withLockedUnlocked = (state as ModifiedColor[]).map(
                    (color) => {
                        if (color.locked) return color;

                        const randomColor: ModifiedColor = chroma.random();

                        randomColor.hexName = randomColor.hex().toUpperCase();
                        randomColor.hueValue = randomColor.get("hsl.h");
                        randomColor.satValue = randomColor.get("hsl.s");
                        randomColor.briValue = randomColor.get("hsl.l");
                        randomColor.locked = false;
                        randomColor.satScale = chroma
                            .scale([
                                randomColor.set("hsl.s", 0).hex(),
                                randomColor.hex(),
                                randomColor.set("hsl.s", 1).hex(),
                            ])
                            .colors(3);
                        randomColor.briScale = chroma
                            .scale([
                                randomColor.set("hsl.l", 0).hex(),
                                randomColor.hex(),
                                randomColor.set("hsl.l", 1).hex(),
                            ])
                            .colors(3);

                        return randomColor;
                    }
                );

                return withLockedUnlocked;
            }

            const colorArr: ModifiedColor[] = [];

            state.forEach(() => {
                const randomColor: ModifiedColor = chroma.random();

                randomColor.hexName = randomColor.hex().toUpperCase();
                randomColor.hueValue = randomColor.get("hsl.h");
                randomColor.satValue = randomColor.get("hsl.s");
                randomColor.briValue = randomColor.get("hsl.l");
                randomColor.locked = false;
                randomColor.satScale = chroma
                    .scale([
                        randomColor.set("hsl.s", 0).hex(),
                        randomColor.hex(),
                        randomColor.set("hsl.s", 1).hex(),
                    ])
                    .colors(3);
                randomColor.briScale = chroma
                    .scale([
                        randomColor.set("hsl.l", 0).hex(),
                        randomColor.hex(),
                        randomColor.set("hsl.l", 1).hex(),
                    ])
                    .colors(3);

                colorArr.push(randomColor);
            });

            return colorArr;
        case "LOCK_UNLOCK":
            const withLockedUnlocked = (state as ModifiedColor[]).map(
                (color, index) => {
                    if (index === action.payload.index) {
                        const lockedColor: ModifiedColor = color;

                        lockedColor.hexName = chroma(color.hexName as string)
                            .hex()
                            .toUpperCase();
                        lockedColor.hueValue = chroma(
                            color.hexName as string
                        ).get("hsl.h");
                        lockedColor.satValue = chroma(
                            color.hexName as string
                        ).get("hsl.s");
                        lockedColor.briValue = chroma(
                            color.hexName as string
                        ).get("hsl.l");
                        lockedColor.locked = !color.locked;
                        lockedColor.satScale = color.satScale;
                        lockedColor.briScale = color.briScale;

                        return lockedColor;
                    }

                    return color;
                }
            );

            return withLockedUnlocked;
        case "UPDATE_HUE":
            const withNewHue = (state as ModifiedColor[]).map(
                (color, index) => {
                    if (index === action.payload.index) {
                        const newHue: ModifiedColor = chroma(
                            color.hexName as string
                        ).set("hsl.h", action.payload.hueValue);

                        newHue.hexName = newHue.hex().toUpperCase();
                        newHue.hueValue = newHue.get("hsl.h");
                        newHue.satValue = newHue.get("hsl.s");
                        newHue.briValue = newHue.get("hsl.l");
                        newHue.locked = color.locked;
                        newHue.satScale = chroma
                            .scale([
                                newHue.set("hsl.s", 0).hex(),
                                newHue.hex(),
                                newHue.set("hsl.s", 1).hex(),
                            ])
                            .colors(3);
                        newHue.briScale = chroma
                            .scale([
                                newHue.set("hsl.l", 0).hex(),
                                newHue.hex(),
                                newHue.set("hsl.l", 1).hex(),
                            ])
                            .colors(3);

                        console.log(newHue.hex(), color.hex());

                        return newHue;
                    }

                    return color;
                }
            );

            return withNewHue;
        case "UPDATE_SAT":
            const withNewSat = (state as ModifiedColor[]).map(
                (color: ModifiedColor, index) => {
                    if (index === action.payload.index) {
                        const newSat: ModifiedColor = chroma(
                            color.hexName as string
                        ).set("hsl.s", action.payload.satValue);

                        newSat.hexName = newSat.hex().toUpperCase();
                        newSat.hueValue = newSat.get("hsl.h");
                        newSat.satValue = (state as ModifiedColor[])[
                            action.payload.index
                        ].get("hsl.s");
                        newSat.briValue = newSat.get("hsl.l");
                        newSat.locked = color.locked;
                        newSat.satScale = color.satScale;
                        newSat.briScale = chroma
                            .scale([
                                newSat.set("hsl.l", 0).hex(),
                                newSat.hex(),
                                newSat.set("hsl.l", 1).hex(),
                            ])
                            .colors(3);

                        console.log(
                            newSat.hex(),
                            color.hex(),
                            (state as ModifiedColor[])[
                                action.payload.index
                            ].hex()
                        );

                        return newSat;
                    }

                    return color;
                }
            );

            return withNewSat;
        case "UPDATE_BRI":
            const withNewBri = (state as ModifiedColor[]).map(
                (color: ModifiedColor, index) => {
                    if (index === action.payload.index) {
                        const newBri: ModifiedColor = chroma(
                            color.hexName as string
                        ).set("hsl.l", action.payload.briValue);

                        newBri.hexName = newBri.hex().toUpperCase();
                        newBri.hueValue = newBri.get("hsl.h");
                        newBri.satValue = newBri.get("hsl.s");
                        newBri.briValue = newBri.get("hsl.l");
                        newBri.locked = color.locked;
                        newBri.satScale = chroma
                            .scale([
                                newBri.set("hsl.s", 0).hex(),
                                newBri.hex(),
                                newBri.set("hsl.s", 1).hex(),
                            ])
                            .colors(3);
                        newBri.briScale = chroma
                            .scale([
                                newBri.set("hsl.l", 0).hex(),
                                newBri.hex(),
                                newBri.set("hsl.l", 1).hex(),
                            ])
                            .colors(3);

                        console.log(newBri, color);

                        return newBri;
                    }

                    return color;
                }
            );

            return withNewBri;
        case "APPLY_SAVED":
            return action.payload.colors.palettes;
        default:
            return state;
    }
};
