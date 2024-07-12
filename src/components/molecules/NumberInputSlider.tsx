import React, { useEffect, useRef, useState } from "react";
import {
  NumberDisplaySize,
  NumberDisplayStyle,
  NumberValue,
  ShutterCurrencySymbol,
} from "../atoms";

const MAX_VALUE = 13500;

export const NumberInputSlider = () => {
  const [value, setValue] = useState<number>(5400);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const percentage = (value / MAX_VALUE) * 100;
      sliderRef.current.style.setProperty("--value", `${percentage}%`);
    }
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value.replace(/[^\d]/g, ""));
    if (newValue >= 1 && newValue <= MAX_VALUE) {
      setValue(newValue);
    } else if (newValue > MAX_VALUE) {
      setValue(MAX_VALUE);
    } else if (newValue < 1) {
      setValue(1);
    }
  };

  return (
    <div className="flex flex-col items-start w-full mx-auto bg-gray-800 rounded-lg">
      <label className="text-white text-start text-sm" htmlFor="stake-input">
        Amount to stake
      </label>

      <div className="w-full relative my-3">
        <input
          id="stake-input"
          type="number"
          value={value}
          onChange={handleInputChange}
          className="w-full bg-secondary text-center text-[36px] font-dm border border-white border-opacity-10 text-white rounded no-spinner outline-none focus:border-opacity-100"
        />
        <span className="absolute text-base bottom-2 right-4 p-0 text-white pointer-events-none font-dm">
          <ShutterCurrencySymbol />
        </span>
      </div>

      <div className="flex justify-between w-full my-1 text-white">
        <span>1</span>
        <span>
          <NumberValue
            label={MAX_VALUE}
            displaySize={NumberDisplaySize.Small}
            numberDisplayStyle={NumberDisplayStyle.PrimaryNumber}
          />
        </span>
      </div>
      <input
        min="1"
        type="range"
        value={value}
        ref={sliderRef}
        max={MAX_VALUE}
        onChange={handleSliderChange}
        className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-white"
      />
    </div>
  );
};
