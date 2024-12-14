import Footer from "@/ui/Footer";
import NumOfPerson from "../components/filter/NumOfPerson";
import PriceRange from "../components/filter/PriceRange";
import RoomType from "../components/filter/RoomType";
import SortOptions from "../components/filter/SortOption";
import UtilitiesList from "../components/filter/UtilitiesList";
import RoomSearchList from "../components/room/RoomSearchList";
import Navbar from "@/components/home/Navbar";
import { RoomRes } from "@/models/room";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Filter = () => {
  const location = useLocation();
  const [roomData, setRoomData] = useState<RoomRes[]>(
    location.state?.roomData || []
  );
  const [roomType, setRoomType] = useState("Kí túc xá/Homestay");
  const [sortOption, setSortOption] = useState("Liên quan nhất");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  console.log("room ====", roomData);

  const handleSort = (option: string) => {
    setSortOption(option);

    const sortedData = [...roomData];
    if (option === "Giá thấp đến cao") {
      sortedData.sort((a, b) => a.total_price - b.total_price);
    } else if (option === "Giá cao xuống thấp") {
      sortedData.sort((a, b) => b.total_price - a.total_price);
    } else if (option === "Mới nhất") {
      sortedData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    setRoomData(sortedData);
  };
  const handlePriceChange = (price: [number, number]) => {
    setPriceRange(price);

    const filteredData = location.state?.roomData.filter(
      (room: RoomRes) =>
        room.total_price >= price[0] && room.total_price <= price[1]
    );
    setRoomData(filteredData || []);
  };

  const handleRoomTypeChange = (type: string) => {
    setRoomType(type);

    const filteredData = location.state?.roomData.filter(
      (room: RoomRes) => room.room_type === type
    );

    console.log(filteredData)
    setRoomData(filteredData || []);
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="flex justify-center mt-12 space-x-14">
        <div className="flex flex-col">
          <div>
            <PriceRange
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
            />
          </div>

          <div>
            <RoomType
              selectedType={roomType}
              onTypeChange={handleRoomTypeChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4 text-blue-10">Tiện ích</h2>
            <UtilitiesList />
          </div>
          <div>
            <NumOfPerson />
          </div>
        </div>
        <div className="flex flex-col space-y-10">
          <SortOptions selectedOption={sortOption} onSort={handleSort} />
          <RoomSearchList roomData={roomData} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Filter;
