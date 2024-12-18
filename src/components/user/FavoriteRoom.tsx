import { RoomRes } from "@/models/room";
import RoomService from "@/services/RoomService";
import { convertToReadableNumber } from "@/utils/converter";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FavoriteRoom = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [rooms, setRooms] = useState<RoomRes[]>();

  useEffect(() => {
    const roomService = new RoomService();

    const fetchRoom = async () => {
      try {
        const res = await roomService.getFavoriteRoom(token);
        const data = res.data.data;
        const roomsResponse = data.map((room: RoomRes) => ({
          ...room,
        }));
        setRooms(roomsResponse);
        console.log("rooms", rooms);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    fetchRoom();
  }, []);

  const handleRoomClick = (roomId: number) => {
    navigate(`/room/${roomId}`); // Navigate to the dynamic route
  };
  return (
    <div className="container mx-auto py-8 px-8 max-w-[1100px]">
      <h2 className="text-2xl md:text-2xl font-bold mb-6 text-gray-20">
        Phòng yêu thích
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {rooms?.slice(0, 4).map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer transition duration-300 transform hover:scale-105"
          >
            <div className="relative ">
              <img
                src={room.room_images[0]}
                alt={room.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-40 text-gray-90 px-3 py-1 rounded-bl-lg shadow-lg ">
                {convertToReadableNumber(room.total_price)} vnđ
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{room.title}</h3>
              <p className="text-gray-600">{room.address.join(" ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRoom;
