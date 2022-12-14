import styled from "styled-components";

const Paper = styled.div`
    position: relative;
    max-width: 800px;

    height: 480px;
    margin: 0 auto;
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow: auto;

    background-position: center;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 60px;
        background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
        background-size: 30px 30px;
        border-right: 3px solid #d44147;
        box-sizing: border-box;
    }

    @media only screen and (max-width: 780px) {
        width: 100%;
    }
`;

const PaperContent = styled.div`
    position: absolute;

    top: 90px; 
    right: 0;
    bottom: 30px;
    left: 0px;
    background: linear-gradient(transparent, transparent 28px, #91d1d3 28px);
    background-size: 30px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LetterText = styled.textarea`
    width: 80%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    line-height: 30px;

    padding: 0px 10px 0 10px;
    border: 0;
    outline: 0;
    background: transparent;
    font-family: "Jua", sans-serif;
    font-weight: 600;
    font-size: 20px;
    box-sizing: border-box;
    z-index: 1;
    resize: none;
    color: rgba(0, 0, 0, 0.7);
    @media only screen and (max-width: 580px) {
        width: 70%;
    }
`;

export { Paper, PaperContent, LetterText };
