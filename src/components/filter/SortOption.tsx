
type SortOptionsProps = {
  selectedOption: string;
  onSort: (option: string) => void;
};

const SortOptions = ({ selectedOption, onSort }: SortOptionsProps) => {

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
          onClick={() => onSort(option)}
          className={`px-6 py-2 rounded-lg text-sm font-semibold ${
            selectedOption === option
              ? "bg-blue-40 text-[#FFFFFF]"
              : "bg-gray-90 text-gray-40"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;
