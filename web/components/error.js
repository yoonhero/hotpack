const ErrorMessage = ({ error }) => {
    return <>{error && <p className='ml-4 text-left text-red-400 text-md font-md'>{error}</p>}</>;
};

export { ErrorMessage };
