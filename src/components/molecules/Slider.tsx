import React, { useEffect, useRef, useState } from "react";

const StakingComponent: React.FC = () => {
  const [value, setValue] = useState<number>(5400);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const percentage = (value / 13500) * 100;
      sliderRef.current.style.setProperty("--value", `${percentage}%`);
    }
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value.replace(/[^\d]/g, ""));
    if (newValue >= 1 && newValue <= 13500) {
      setValue(newValue);
    } else if (newValue > 13500) {
      setValue(13500);
    } else if (newValue < 1) {
      setValue(1);
    }
  };

  return (
    <div className="flex flex-col items-start w-full mx-auto bg-gray-800 rounded-lg">
      <label
        className="text-white text-start text-lg mb-2"
        htmlFor="stake-input"
      >
        Amount to stake
      </label>

      <div className="w-full relative my-3">
        <input
          id="stake-input"
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-full bg-black text-center text-[48px] border border-primary text-white rounded no-spinner outline-none focus:border-white"
        />
        <span className="absolute text-2xl bottom-2 right-4 p-0 text-white pointer-events-none">
          $shu
        </span>
      </div>
      <div className="flex justify-between w-full my-1 text-white">
        <span>1</span>
        <span>13,500</span>
      </div>
      <input
        ref={sliderRef}
        type="range"
        min="1"
        max="13500"
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-white"
      />
    </div>
  );
};

export default StakingComponent;