import React, { useState } from "react";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import four from "../../assets/4.png";
import five from "../../assets/5.png";

const images = [one, two, three, four, five];
const labels = ["Cực kỳ tệ", "Tệ", "Bình thường", "Tốt", "Xuất sắc"];

interface CustomRateProps {
  onChange?: (value: number) => void; // Callback khi thay đổi số sao
}

const CustomRate: React.FC<CustomRateProps> = ({ onChange }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelected(index); // Cập nhật chỉ hình được click
    if (onChange) onChange(index + 1);
  };

  return (
    <div className="flex space-x-4">
      {images.map((image, index) => (
        <div className="flex flex-col items-center">
          <div
            key={index}
            className={`rounded-full p-2 cursor-pointer transition-colors duration-300 ${
              selected === index ? "bg-blue-80" : "bg-gray-90"
            }`}
            onClick={() => handleClick(index)}
          >
            <img
              src={image}
              alt={`Star ${index + 1}`}
              className={`w-6 h-6 cursor-pointer `}
              onClick={() => handleClick(index)}
            />
          </div>
          <span
            className={`text-[10px] text-gray-60`}
          >
            {labels[index]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomRate;
