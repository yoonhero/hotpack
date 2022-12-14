const Button = ({ bgColor, txtColor, onClickFunction, children }) => {
    return (
        <button onClick={() => onClickFunction()} className={`rounded-2xl w-full max-w-[23.5rem] h-[3.5rem] ${txtColor || "text-white"} ${bgColor}`}>
            {children}
        </button>
    );
};

export { Button };
