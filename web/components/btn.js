const Button = ({ disabled = false, bgColor, txtColor, onClickFunction, children, hover }) => {
    return (
        <button
            onClick={() => onClickFunction()}
            className={`rounded-2xl w-full max-w-[23.5rem] h-[3.5rem] disabled:opacity-50 ${txtColor || "text-white"} ${bgColor} ${hover}`}
            disabled={disabled}>
            {children}
        </button>
    );
};

export { Button };
