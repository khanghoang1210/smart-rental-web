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


const Filter = () => {

  const location = useLocation();
  const roomData: RoomRes[] = location.state?.roomData || [];
  console.log("room ====", roomData)
  return (
    <>
      {" "}
      <Navbar />
      <div className="flex justify-center mt-12 space-x-14">
        <div className="flex flex-col">
          <div>
            <PriceRange />
          </div>

          <div>
            <RoomType />
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
          <SortOptions />
          <RoomSearchList roomData={roomData} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Filter;
