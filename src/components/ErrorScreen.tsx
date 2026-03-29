import { useState } from "react";
import { Button } from "./ui/button";

export const ErrorScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  
  const handleRefresh = async () => {
      setIsRefreshing(true);
      await sleep(100)

    const res = await chrome.runtime.sendMessage({
        type: "apiDataRefresh",
    })
    
    setIsRefreshing(false)
    
    if (!res?.success) {
      console.log("Refresh failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center align-middle h-full gap-y-2 text-[#3A3843] mt-25 mb-10">
      <p className="font-numans font-bold text-[16px] text-[#1D596D]">
        Could not load prayer times!
      </p>
      <div className="mb-1">
        <Button
          disabled={isRefreshing}
          onClick={handleRefresh}
          className="cursor-pointer"
        >
          {isRefreshing ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white/90" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>
      <p className="font-numans text-[12px] text-center w-2/3">
        try updating your settings by changing city/country to one nearby
      </p>
    </div>
  );
};
