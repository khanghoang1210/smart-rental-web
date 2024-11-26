import { toCurrencyFormat } from "@/utils/converter";
import { useNavigate } from "react-router-dom";

type RoomCardProps = {
  id: number;
  title: string;
  address: string;
  price: number;
  maxOccupancy: number;
  image: string;
};

const RoomCard = (prop: RoomCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/room/${prop.id}`); // Chuyển hướng đến route room/:id
  };
  return (
    <div
      className="flex justify-center border border-gray-80 rounded-3xl cursor-pointer p-4 w-[790px] h-[180px]"
      onClick={handleCardClick}
    >
      <div className="w-1/3 mr-4">
        <img src={prop.image} alt={prop.title} className="h-full rounded-lg" />
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <p className="text-xs text-gray-500">{prop.maxOccupancy} người</p>
          <h3 className="text-lg font-semibold line-clamp-2">{prop.title}</h3>
          <p className="text-base text-gray-500 line-clamp-2">{prop.address}</p>
        </div>
        <p className="text-xl font-bold text-blue-60">
          {toCurrencyFormat(prop.price)} đ/phòng
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
