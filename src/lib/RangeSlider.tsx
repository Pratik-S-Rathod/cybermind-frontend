import React, { useState, useEffect, useCallback } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  onChange?: (values: { min: number; max: number }) => void;
}

export function RangeSlider({ min, max, onChange }: RangeSliderProps) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(Number(e.target.value), maxVal - 1);
      setMinVal(value);
    },
    [maxVal]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(Number(e.target.value), minVal + 1);
      setMaxVal(value);
    },
    [minVal]
  );

  // Reset values when min/max props change
  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  // Only trigger onChange after initial render and when values actually change
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }
    onChange?.({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  // Calculate slider background gradients
  const minPercentage = ((minVal - min) / (max - min)) * 100;
  const maxPercentage = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="relative">
      {/* Track background */}
      <div className="absolute w-full h-1 bg-gray-300 rounded-full"></div>

      {/* Selected range */}
      <div
        className="absolute h-1 bg-gray-500 rounded-full"
        style={{
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`,
        }}
      ></div>

      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="absolute -mt-1 w-full appearance-none pointer-events-none 
        bg-transparent [&::-webkit-slider-thumb]:appearance-none 
        [&::-webkit-slider-thumb]:pointer-events-auto 
                     [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
             [&::-webkit-slider-thumb]:rounded-full 
             [&::-webkit-slider-thumb]:bg-white 
             [&::-webkit-slider-thumb]:border-4
             [&::-webkit-slider-thumb]:border-black 
        [&::-webkit-slider-thumb]:cursor-pointer 
        [&::-moz-range-thumb]:cursor-pointer"
      />

      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute -mt-1 w-full appearance-none pointer-events-none bg-transparent 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:pointer-events-auto 
          [&::-webkit-slider-thumb]:w-3 
          [&::-webkit-slider-thumb]:h-3 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border-4 
          [&::-webkit-slider-thumb]:border-black 
          [&::-moz-range-thumb]:cursor-pointer"

      />
    </div>
  );
}
