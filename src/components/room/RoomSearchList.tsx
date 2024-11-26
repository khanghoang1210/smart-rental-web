import { RoomRes } from "@/models/room";
import RoomCard from "./RoomCard";

type RoomSearchListProps = {
  roomData: RoomRes[];
};


const RoomSearchList = ({ roomData }: RoomSearchListProps) => {
  return (
    <div className="flex justify-center  flex-col space-y-4">
      <div className="ml-2 font-bold text-gray-20 text-3xl">
        <h1>{roomData.length} Kết quả</h1>
      </div>
      {roomData.map((room) => (
        <RoomCard
          key={room.id}
          id={room.id}
          title={room.title}
          address={room.address?.join(", ") || "Không có địa chỉ"}
          price={room.total_price}
          maxOccupancy={room.capacity}
          image={room.room_images[0]}
        />
      ))}
    </div>
  );
};
export default RoomSearchList;
