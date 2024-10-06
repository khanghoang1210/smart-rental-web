
import NumOfPerson from "../components/filter/NumOfPerson";
import PriceRange from "../components/filter/PriceRange";
import RoomType from "../components/filter/RoomType";
import SortOptions from "../components/filter/SortOption";
import UtilitiesList from "../components/filter/UtilitiesList";
import RoomSearchList from "../components/room/RoomSearchList";


const Filter = () => {
  return (
    <div className="flex justify-center mt-12 space-x-14">
      <div className="flex flex-col">
        <div>
          <PriceRange />
        </div>

        <div>
          <RoomType/>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-blue-10">Tiện ích</h2>
          <UtilitiesList />
        </div>
        <div>
          <NumOfPerson/>
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        <SortOptions/>
        <RoomSearchList />
      </div>
      
    </div>
  );
};
export default Filter;
