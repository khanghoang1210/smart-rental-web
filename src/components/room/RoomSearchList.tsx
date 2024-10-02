import RoomCard from './RoomCard';

// type RoomSearchListProps = {
    
// };

const roomData = [
    {
      id: 1,
      title: "Tên phòng trọ được hiển thị tối đa 2 dòng",
      address: "Địa chỉ phòng trọ được hiển thị tối đa 2 dòng",
      price: "2.000.000 đ/phòng",
      maxOccupancy: "SỐ NGƯỜI",
      image: "https://neohouse.vn/wp-content/uploads/2022/01/thiet-ke-nha-ong-1-tang.jpg" 
    },
    {
      id: 2,
      title: "Tên phòng trọ được hiển thị tối đa 2 dòng",
      address: "Địa chỉ phòng trọ được hiển thị tối đa 2 dòng",
      price: "2.000.000 đ/phòng",
      maxOccupancy: "SỐ NGƯỜI",
      image: "https://neohouse.vn/wp-content/uploads/2022/01/thiet-ke-nha-ong-1-tang.jpg" 
    },
    {
      id: 3,
      title: "Tên phòng trọ được hiển thị tối đa 2 dòng",
      address: "Địa chỉ phòng trọ được hiển thị tối đa 2 dòng",
      price: "2.000.000 đ/phòng",
      maxOccupancy: "SỐ NGƯỜI",
      image: "https://neohouse.vn/wp-content/uploads/2022/01/thiet-ke-nha-ong-1-tang.jpg" 
    }
  ];
  

const RoomSearchList = () => {
    
    return <div className="flex justify-center items-center flex-col space-y-4">
    {roomData.map((room) => (
      <RoomCard
        key={room.id}
        title={room.title}
        address={room.address}
        price={room.price}
        maxOccupancy={room.maxOccupancy}
        image={room.image}
      />
    ))}
  </div>
}
export default RoomSearchList;