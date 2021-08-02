import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { SavedPalette } from "../reducers/save";
import styled from "styled-components";

const StyledLibrary = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    padding: 3rem;
    border-radius: 12px;
    background-color: var(--bg);
    h1 {
        font-size: 2.25rem;
    }
    .palette-container {
        margin-top: 1rem;
        .palette-details {
            margin-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .palette-preview {
                display: flex;
                height: 100%;
                width: 100%;
                .color {
                    width: 100%;
                    height: 50px;
                }
            }
            button {
                cursor: pointer;
                color: var(--text-100);
                padding: 0.5rem 1rem;
                border-radius: 6px;
                &:hover {
                    background-color: var(--bg-100);
                    color: var(--text);
                }
            }
        }
    }
`;

const Library = () => {
    const dispatch = useDispatch();
    const savedColors: SavedPalette[] = useSelector(
        (state: RootStateOrAny) => state.save
    );

    if (!savedColors) return null;

    return (
        <StyledLibrary>
            <h1>Select from your saved palettes</h1>
            {savedColors.map((colorArr, index) => (
                <div className="palette-container" key={index}>
                    <h3 className="palette-name">{colorArr.name}</h3>
                    <div className="palette-details">
                        <div className="palette-preview">
                            {colorArr.palettes.map((color, index) => (
                                <div
                                    className="color"
                                    style={{ backgroundColor: color.hexName }}
                                    key={index}
                                ></div>
                            ))}
                        </div>
                        <button
                            className="select"
                            onClick={() =>
                                dispatch({
                                    type: "APPLY_SAVED",
                                    payload: { colors: savedColors[index] },
                                })
                            }
                        >
                            Select
                        </button>
                        <button
                            className="remove"
                            onClick={() => {
                                dispatch({
                                    type: "REMOVE_SAVED",
                                    payload: { index: index },
                                });

                                dispatch({ type: "GET_COLORS" });
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </StyledLibrary>
    );
};

export default Library;
