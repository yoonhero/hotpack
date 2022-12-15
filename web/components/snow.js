import styled, { keyframes } from "styled-components";
import Script from "next/script";
import { useEffect } from "react";
import { useWindowSize } from "../utils/windowSize";

const snow_fall = keyframes`
 0% {
    top: 0;
  }

  100% {
    top: 100vh;
    opacity: 0;
  }
  `;

const snow = styled.div`
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: rgb(57, 131, 226);
    box-shadow: 0 0 10px #fff;
    animation: ${(props) => props.animate && snow_fall} 8.5s infinite ease-in;
    position: absolute;
    top: 0;
    z-index: -1;
    opacity: 0;
`;

const SnowContainer = () => {
    const intViewport = useWindowSize();
    function snow(num, speed) {
        if (num > 0) {
            setTimeout(function () {
                const dropID = "drop_" + randomInt(1, 150);
                document.getElementById(dropID).classList.add("animate");
                const randomOpacity = Math.random();
                document.getElementById(dropID).style.opacity = randomOpacity > 0.5 ? randomOpacity.toFixed(2) : 0.5;
                num--;
                snow(num, speed);
            }, speed);
        }
    }

    function snowDrop(num, position, intViewportWidth) {
        if (num > 0) {
            console.log(intViewportWidth);
            var dropEle = document.createElement("div");

            dropEle.className = "drop snow";
            dropEle.id = `drop_${num}`;

            document.body.appendChild(dropEle);
            const dropID = "drop_" + num;

            document.getElementById(dropID).style.left = position + "px";

            const snowHeight = String(randomInt(6, 16));
            document.getElementById(dropID).style.width = snowHeight + "px";
            document.getElementById(dropID).style.height = snowHeight + "px";

            num--;
            snowDrop(num, randomInt(10, intViewportWidth), intViewportWidth);
        }
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        if (intViewport.width == undefined) {
            return;
        }
        console.log(intViewport.width);
        snowDrop(150, randomInt(0, intViewport.width), intViewport.width);
        snow(150, 100);
    }, [intViewport]);

    return <div></div>;
};

export { SnowContainer };
