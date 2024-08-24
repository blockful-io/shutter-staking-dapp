/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { NumberValue, ShutterCurrencySymbol } from "../atoms";
import { NumberDisplaySize } from "@/types/numberDisplaySize";
import { NumberDisplayStyle } from "@/types/numberDisplayStyle";

export const MIN_STAKING_VALUE = 1;
export const MAX_STAKING_VALUE = 1000000;
export const DEBOUNCE_TIME = 1000;

interface NumberInputSliderProps {
  label?: string;
  minAmount?: number;
  maxAmount?: number;
  onAmountChange: (amount: number) => void;
}

export const NumberInputSlider = ({
  minAmount = MIN_STAKING_VALUE,
  maxAmount = MAX_STAKING_VALUE,
  label = "Amount to stake",
  onAmountChange,
}: NumberInputSliderProps) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState(minAmount);
  const [value, setValue] = useState<number>(minAmount);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const diffBetweenMinAndMax = maxAmount - minAmount;
      const blocksSpacing = 100 / diffBetweenMinAndMax;
      const currentBlockLocation = value - minAmount;
      const percentage = blocksSpacing * (currentBlockLocation || 1);
      sliderRef.current.style.setProperty("--value", `${percentage}%`);

      const numberDebounce = setTimeout(() => {
        setDebouncedInputValue(value);
      }, DEBOUNCE_TIME);
      return () => clearTimeout(numberDebounce);
    }
  }, [value]);

  useEffect(() => {
    setValue(minAmount);
  }, [minAmount]);

  useEffect(() => {
    onAmountChange(debouncedInputValue);
  }, [debouncedInputValue]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value.replace(/[^\d]/g, ""));
    if (newValue >= minAmount && newValue <= maxAmount) {
      setValue(newValue);
    } else if (newValue > maxAmount) {
      setValue(maxAmount);
    } else if (newValue < minAmount) {
      setValue(minAmount);
    }
  };

  return (
    <div className="flex flex-col items-start w-full mx-auto bg-gray-800 rounded-lg">
      <label className="text-white text-start text-sm" htmlFor="stake-input">
        {label}
      </label>

      <div className="w-full relative my-3">
        <input
          id="stake-input"
          type="number"
          value={value}
          min={minAmount}
          onChange={handleInputChange}
          className="w-full bg-secondary text-center text-[36px] font-dm border border-white border-opacity-10 text-white rounded no-spinner outline-none focus:border-opacity-100"
        />
        <span className="absolute text-base bottom-2 right-4 p-0 text-white pointer-events-none font-dm">
          <ShutterCurrencySymbol />
        </span>
      </div>

      <div className="flex justify-between w-full my-1 mb-2.5 text-white">
        <span>
          <NumberValue
            label={minAmount}
            displaySize={NumberDisplaySize.Small}
            numberDisplayStyle={NumberDisplayStyle.PrimaryNumber}
          />
        </span>
        <span>
          <NumberValue
            label={maxAmount}
            displaySize={NumberDisplaySize.Small}
            numberDisplayStyle={NumberDisplayStyle.PrimaryNumber}
          />
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={minAmount}
        ref={sliderRef}
        max={maxAmount}
        onChange={handleSliderChange}
        className="w-full h-2 bg-primary rounded-lg appearance-none cursor-pointer accent-white"
      />
    </div>
  );
};
