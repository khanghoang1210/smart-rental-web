import RoomSearchList from "../room/RoomSearchList";
import UtilitiesList from "./UtilitiesList";
// type FilterProps = {

// };

const Filter = () => {
  return (
    <div className="flex justify-center mt-12 space-x-60">
      
      <div>
        <h2 className="text-lg font-bold mb-4 text-blue-10">Tiện ích</h2>
        <UtilitiesList />
      </div>
      <RoomSearchList />
    </div>
  );
};
export default Filter;
