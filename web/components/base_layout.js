const BaseLayout = ({ children }) => {
    return (
        <main className='flex w-screen h-screen items-center justify-center'>
            <div className='relative flex flex-col max-h-screen min-h-[95vh] max-w-[780px] min-w-[680px] items-center m-10'>{children}</div>
        </main>
    );
};

export { BaseLayout };
