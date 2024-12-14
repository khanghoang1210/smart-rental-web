type RoomTypeProps = {
  selectedType: string;
  onTypeChange: (type: string) => void;
};

const RoomType = ({ selectedType, onTypeChange }: RoomTypeProps) => {
  const roomTypes = [
    "Kí túc xá/Homestay",
    "Phòng cho thuê",
    "Nhà nguyên căn",
    "Căn hộ",
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4 text-blue-10">Loại phòng</h2>
      <div className="space-y-4">
        {roomTypes.map((type) => (
          <div key={type} className="mb-2 border-b-[1px] border-gray-90">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="roomType"
                value={type}
                checked={selectedType === type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="form-radio mb-3 text-blue-40 accent-blue-40"
              />
              <span className="ml-2 mb-3">{type}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomType;
