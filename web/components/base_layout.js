const BaseLayout = ({ children }) => {
    return (
        <main className='flex w-[100vw] h-[100vh] items-center justify-center '>
            <div className='w-full relative flex flex-col max-h-screen min-h-[95vh] max-w-[780px] items-center overflow-auto'>{children}</div>
        </main>
    );
};

export { BaseLayout };
