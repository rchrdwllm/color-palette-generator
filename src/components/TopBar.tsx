import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "./Modal";
import Library from "./Library";

const StyledBar = styled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 10vh;
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
`;

const TopBar = () => {
    const dispatch = useDispatch();
    const modalState = useSelector((state: RootStateOrAny) => state.modal);
    const libraryState = useSelector((state: RootStateOrAny) => state.library);

    return (
        <>
            <StyledBar>
                <button onClick={() => dispatch({ type: "OPEN_CLOSE_MODAL" })}>
                    Save
                </button>
                <button onClick={() => dispatch({ type: "GENERATE_COLORS" })}>
                    Generate
                </button>
                <button
                    onClick={() => {
                        dispatch({ type: "OPEN_CLOSE_LIBRARY" });
                        dispatch({ type: "GET_COLORS" });
                    }}
                >
                    Library
                </button>
            </StyledBar>
            {libraryState ? <Library /> : ""}
            {modalState ? <Modal /> : ""}
        </>
    );
};

export default TopBar;
