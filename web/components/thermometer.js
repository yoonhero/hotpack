import styled, { keyframes } from "styled-components";

const one_anim = keyframes`
0%{
    height: 0%;
}
70%{
    height: 42px;
}

100%{
    height: 45px;
}
`;

const two_anim = keyframes`
0%{
    height: 0%;
}
70%{
    height: 63px;
}

100%{
    height: 68px;
}`;

const three_anim = keyframes`
0%{
    height: 0%;
}
70%{
    height: 88px;
}

100%{
    height: 90px;
}
`;

const four_anim = keyframes`
0%{
    height: 0%;
}
70%{
    height: 100px;
}

100%{
    height: 101px;
}`;

const five_anim = keyframes`
0%{
    height: 0%;
}
70%{
    height: 110px;
}

100%{
    height: 112px;
}`;

const Logo = styled.div`
    position: relative;
    height: 160px;
    width: 40px;
`;

const Bar = styled.div`
    height: 130px;
    width: 28px;
    background-color: #fefbf3;
    border-radius: 25px 25px 0 0;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);

    &::after {
        content: "";
        display: block;
        height: 0px;
        width: 10px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 5px;
        border-radius: 10px 10px 0 0;
        background-color: #ff3d00;

        animation: ${(props) => (props.t <= 1 ? one_anim : props.t <= 2 ? two_anim : props.t <= 3 ? three_anim : props.t <= 4 ? four_anim : five_anim)} 3s
            linear;
        animation-fill-mode: forwards;
    }
`;

const Circle = styled.div`
    height: 40px;
    width: 40px;
    background-color: #fefbf3;
    position: absolute;
    bottom: 0;
    border-radius: 50%;

    &::after {
        z-index: 20;
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ff3d00;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const Thermometer = ({ temperature }) => {
    return (
        <Logo>
            <Circle />
            <Bar t={temperature} />
        </Logo>
    );
};

export { Thermometer };
