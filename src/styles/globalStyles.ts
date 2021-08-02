import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --bg: #fafafa;
        --bg-100: #f3f3f3;
        --text: #1f1f1f;
        --text-100: #8b8b8b;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter';
        will-change: color, background-color, opacity;
    }
    body {
        background-color: var(--bg);
        color: var(--text);
        font-size: 1rem;
        font-weight: 400;
        button {
            background-color: transparent;
            outline: none;
            border: none;
            font-size: inherit;
            font-weight: inherit;
        }
    }
`;

export default GlobalStyles;
