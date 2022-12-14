const TemperatureBox = ({ temperature }) => {
    return (
        <>
            {/* 온도 */}
            <div className='px-[1.234rem] py-[0.5213rem] border border-[3px] border-red-500 rounded-2xl'>
                <span className='text-2xl font-bold text-red-500 '>{temperature}°</span>
            </div>
        </>
    );
};

export { TemperatureBox };
