import React, { useEffect, useState } from "react";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import four from "../../assets/4.png";
import five from "../../assets/5.png";

const images = [one, two, three, four, five];
const labels = ["Cực kỳ tệ", "Tệ", "Bình thường", "Tốt", "Xuất sắc"];

interface CustomRateProps {
  onChange?: (value: number) => void;
  value?: number; // Callback when the rating changes
}

const CustomRate: React.FC<CustomRateProps> = ({ value = 0, onChange }) => {
  const [selected, setSelected] = useState<number | null>(value);

  useEffect(() => {
    setSelected(value); // Update selected state when value prop changes
  }, [value]);

  const handleClick = (index: number) => {
    const newValue = index + 1; // Calculate rating from index
    setSelected(newValue); // Update local state
    if (onChange) onChange(newValue); // Trigger callback
  };

  return (
    <div className="flex space-x-4">
      {images.map((image, index) => (
        <div className="flex flex-col items-center" key={index}>
          <div
            className={`rounded-full p-2 cursor-pointer transition-colors hover:bg-blue-80 duration-300 ${
              selected === index + 1 ? "bg-blue-80" : "bg-gray-90"
            }`}
            onClick={() => handleClick(index)}
          >
            <img
              src={image}
              alt={`Star ${index + 1}`}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <span
            className={`text-[10px] ${
              selected === index + 1 ? "text-blue-80" : "text-gray-60"
            }`}
          >
            {labels[index]}
          </span>
        </div>
      ))}
    </div>
  );
};


export default CustomRate;
