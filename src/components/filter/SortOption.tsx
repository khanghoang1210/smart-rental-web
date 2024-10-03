import { useState } from 'react';

const SortOptions = () => {
  const [selectedOption, setSelectedOption] = useState("Liên quan nhất");

  const sortOptions = [
    "Liên quan nhất",
    "Mới nhất",
    "Giá thấp đến cao",
    "Giá cao xuống thấp",
  ];

  return (
    <div className="flex items-center space-x-8">
      <span className="font-semibold text-blue-10">Sắp xếp</span>

      {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => setSelectedOption(option)}
          className={`px-6 py-2 rounded-lg text-sm font-bold ${
            selectedOption === option
              ? 'bg-blue-40 text-[#FFFFFF]'
              : 'bg-gray-90 text-gray-40'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
