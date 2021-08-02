import { useState } from "react";
import { ModifiedColor } from "../reducers/colors";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BiSlider, BiLockAlt, BiLockOpenAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

const StyledColor = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.25s background-color;
    .hex {
        font-size: 2.5rem;
    }
    .controls {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        button {
            opacity: 0.5;
            cursor: pointer;
            font-size: 1.5rem;
            color: inherit;
            &:hover {
                opacity: 1;
            }
        }
    }
    .slider {
        background-color: #fafafaba;
        width: 90%;
        padding: 1.5rem;
        border-radius: 12px;
        margin-top: 2rem;
        div {
            display: flex;
            flex-direction: column;
            &:not(:first-child) {
                margin-top: 1rem;
            }
            input[type="range"] {
                appearance: none;
                display: block;
                margin-top: 0.5rem;
                border-radius: 100px;
                cursor: pointer;
                &.hue-slider {
                    background-image: linear-gradient(
                        to right,
                        #ff0000,
                        #ffa500,
                        #ffff00,
                        #00ff00,
                        #00ffff,
                        #0000ff,
                        #ff00ff,
                        #ff0000
                    );
                }
            }
        }
    }
`;

const sliderVariants = {
    initial: {
        y: 50,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
    },
};

const Color = ({ color, index }: { color: ModifiedColor; index: number }) => {
    const dispatch = useDispatch();
    const [animate, setAnimate] = useState<boolean>(false);
    const {
        hexName,
        hueValue,
        satValue,
        briValue,
        locked,
        satScale,
        briScale,
    } = color;

    if (
        briValue === undefined ||
        satScale === undefined ||
        briScale === undefined
    )
        return null;

    return (
        <StyledColor style={{ backgroundColor: hexName }}>
            <h1
                className="hex"
                style={{
                    color: briValue >= 0.5 ? "var(--text)" : "var(--bg)",
                }}
            >
                {hexName}
            </h1>
            <div
                className="controls"
                style={{
                    color: briValue >= 0.5 ? "var(--text)" : "var(--bg)",
                }}
            >
                <button
                    className="lock"
                    onClick={() =>
                        dispatch({
                            type: "LOCK_UNLOCK",
                            payload: { index: index },
                        })
                    }
                >
                    {locked ? <BiLockAlt /> : <BiLockOpenAlt />}
                </button>
                <button className="menu" onClick={() => setAnimate(!animate)}>
                    <BiSlider />
                </button>
            </div>
            <motion.div
                className="slider"
                variants={sliderVariants}
                initial="initial"
                animate={animate ? "animate" : "initial"}
            >
                <div className="hue">
                    <label htmlFor="hue-slider">Hue</label>
                    <input
                        type="range"
                        name="hue-slider"
                        id="hue-slider"
                        className="hue-slider"
                        min="0"
                        max="360"
                        value={hueValue}
                        onInput={(e) =>
                            dispatch({
                                type: "UPDATE_HUE",
                                payload: {
                                    index: index,
                                    hueValue: e.currentTarget.value,
                                },
                            })
                        }
                    />
                </div>
                <div className="sat">
                    <label htmlFor="sat-slider">Saturation</label>
                    <input
                        type="range"
                        name="sat-slider"
                        id="sat-slider"
                        className="sat-slider"
                        min="0.01"
                        max="1"
                        step="0.01"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${satScale[0]}, ${satScale[1]}, ${satScale[2]})`,
                        }}
                        value={satValue}
                        onInput={(e) =>
                            dispatch({
                                type: "UPDATE_SAT",
                                payload: {
                                    index: index,
                                    satValue: e.currentTarget.value,
                                },
                            })
                        }
                    />
                </div>
                <div className="bri">
                    <label htmlFor="bri-slider">Brightness</label>
                    <input
                        type="range"
                        name="bri-slider"
                        id="bri-slider"
                        className="bri-slider"
                        min="0.0001"
                        max="0.9999"
                        step="0.0001"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${briScale[0]}, ${briScale[1]}, ${briScale[2]})`,
                        }}
                        value={briValue}
                        onInput={(e) =>
                            dispatch({
                                type: "UPDATE_BRI",
                                payload: {
                                    index: index,
                                    briValue: e.currentTarget.value,
                                },
                            })
                        }
                    />
                </div>
            </motion.div>
        </StyledColor>
    );
};

export default Color;
