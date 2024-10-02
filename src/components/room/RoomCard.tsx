
type RoomCardProps = {
  title: string;
  address: string;
  price: string;
  maxOccupancy: string;
  image: string;
};

const RoomCard = (prop: RoomCardProps) => {
  return (
    <div className="flex justify-center border border-gray-80 rounded-3xl  p-4 w-[790px] h-[180px]">
      <div className="w-1/3 mr-4">
        <img src={prop.image} alt={prop.title} className="h-full rounded-lg" />
      </div>
      <div className="flex flex-col justify-between w-2/3">
        <div>
          <p className="text-xs text-gray-500">{prop.maxOccupancy}</p>
          <h3 className="text-lg font-semibold line-clamp-2">{prop.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{prop.address}</p>
        </div>
        <p className="text-xl font-bold text-blue-60">{prop.price}</p>
      </div>
    </div>
  );
};

export default RoomCard