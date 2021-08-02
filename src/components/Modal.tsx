import { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const StyledModal = styled.div`
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
    form {
        margin-top: 1rem;
        input {
            display: block;
            width: 100%;
            outline: none;
            border: none;
            background-color: var(--bg-100);
            padding: 0.5rem;
            border-radius: 6px;
            font-size: inherit;
        }
        button {
            margin-top: 1rem;
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
`;

const Modal = () => {
    const dispatch = useDispatch();
    const colors = useSelector((state: RootStateOrAny) => state.colors);
    const [paletteName, setPaletteName] = useState<string | number>("");

    return (
        <StyledModal>
            <h1>Enter a palette name:</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    dispatch({
                        type: "SAVE_COLORS",
                        payload: { colors: colors, paletteName: paletteName },
                    });

                    dispatch({
                        type: "OPEN_CLOSE_MODAL",
                    });
                }}
            >
                <input
                    type="text"
                    className="palette-name"
                    value={paletteName}
                    onChange={(e) => setPaletteName(e.target.value)}
                    placeholder="Palette name"
                />
                <button>Okay</button>
            </form>
        </StyledModal>
    );
};

export default Modal;
