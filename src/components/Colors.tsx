import { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Color as ColorType } from "chroma-js";
import styled from "styled-components";
import Color from "./Color";

const StyledColors = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90vh;
    width: 100%;
`;

const Colors = () => {
    const dispatch = useDispatch();
    const colors: ColorType[] = useSelector(
        (state: RootStateOrAny) => state.colors
    );

    useEffect(() => {
        dispatch({
            type: "GENERATE_COLORS",
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!colors) {
        return null;
    }

    return (
        <StyledColors>
            {colors.map((color, index) => (
                <Color key={index} color={color} index={index} />
            ))}
        </StyledColors>
    );
};

export default Colors;
