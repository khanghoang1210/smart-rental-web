
const rooms = [
  {
    id: 1,
    imageUrl:
      "https://thietkenhadep.net/wp-content/uploads/2024/07/banner-tc.jpg",
    price: "4.7 triệu vnd",
    title: "Phòng cho thuê Quận 7",
    location: "Đường Nguyễn Văn Linh, Quận 7",
  },
  {
    id: 2,
    imageUrl:
      "https://neohouse.vn/wp-content/uploads/2022/01/thiet-ke-nha-ong-1-tang.jpg",
    price: "4.7 triệu vnd",
    title: "Phòng cho thuê Quận 7",
    location: "Đường Nguyễn Văn Linh, Quận 7",
  },
  {
    id: 3,
    imageUrl:
      "https://thanhvietcorp.vn/uploads/images/Bao%20chi/cac-mau-nha-vuon-dep.jpg",
    price: "4.7 triệu vnd",
    title: "Phòng cho thuê Quận 7",
    location: "Đường Nguyễn Văn Linh, Quận 7",
  },
  {
    id: 4,
    imageUrl:
      "https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2024-01-05/can-xac-dinh-vi-tri-va-dien-tich-xay-dung-truoc-khi-thi-cong-6597a8aa5dd40d59132b2e7f.webp",
    price: "4.7 triệu vnd",
    title: "Phòng cho thuê Quận 7",
    location: "Đường Nguyễn Văn Linh, Quận 7",
  },
];

type FeaturedRoomsProps = {
  title: string
}
const FeaturedRooms = (prop: FeaturedRoomsProps) => {


  return (
    <div className="container mx-auto py-8 px-8 max-w-[1100px]">
      <h2 className="text-2xl md:text-2xl font-bold mb-6 text-blue-10">
        {prop.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:cursor-pointer transition duration-300 transform hover:scale-105"
          >
            <div className="relative ">
              <img
                src={room.imageUrl}
                alt={room.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-40 text-gray-90 px-3 py-1 rounded-bl-lg shadow-lg ">
                {room.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{room.title}</h3>
              <p className="text-gray-600">{room.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
