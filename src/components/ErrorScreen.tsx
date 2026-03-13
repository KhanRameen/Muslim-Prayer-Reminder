export const ErrorScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center align-middle h-full gap-y-2 text-[#3A3843] mt-30">
        <p className="font-numans font-bold text-[16px] text-[#1D596D]">Could not load prayer times!</p>
        <p className="font-numans text-[12px] text-center">Please update your settings, try changing city/country to one nearby</p>
    </div>
    )
}