const TemperatureBox = ({ temperature }) => {
    return (
        <>
            {/* 온도 */}
            <div className='px-[0.5rem] py-[0.3rem] md:px-[1.0512rem] md:py-[0.5213rem] border border-[3px] border-red-500 rounded-2xl'>
                <span className='font-mono text-md md:text-2xl font-bold text-red-500 '>{temperature}°</span>
            </div>
        </>
    );
};

export { TemperatureBox };
