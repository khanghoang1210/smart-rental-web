import homeImage from "../../assets/home_image.png";
import heroImage1 from "../../assets/hero_img1.png";
import PrimaryButton from "../../ui/PrimaryButton";
import binhthanh from "../../assets/binhthanh.png";
import q7 from "../../assets/q7.png";
import q1 from "../../assets/q1.png";
import q3 from "../../assets/q3.png";
import thuduc from "../../assets/thuduc.png";
import UserRating from "./UserRating";
import FeaturedRooms from "../room/FeaturedRoom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import RoomService from "@/services/RoomService";
import { RoomRes } from "@/models/room";
import { useCookies } from "react-cookie";

// type HomeProps = {

// };

const Hero = () => {
  const navigate = useNavigate();
  const handleClickCreateRoom = () => {
    navigate("/room/create");
  };

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [, setRoomData] = useState<RoomRes[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleClickRegion = (region: string) => {
    setSearchText(region); // Cập nhật text tìm kiếm
    handleSearch(region); // Gọi API tìm kiếm
  };

  const handleSearch = async (region: string) => {
    console.log("Call API with value:", region);
    try {
      const roomService = new RoomService();
      const response = await roomService.searchByAddress(region);

      if (response && response.data) {
        console.log("Room Data:", response.data);

        setRoomData(response.data);

        navigate(`/filter?search=${encodeURIComponent(region)}`, {
          state: { roomData: response.data.data.rooms },
        });
      } else {
        console.warn("Không tìm thấy dữ liệu phòng");
        setRoomData([]);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col justify-center mt-16">
      <div className="flex justify-center items-center space-x-16">
        <div className="mr-20 space-y-6">
          <h1 className="text-blue-10 font-semibold text-3xl">
            Tìm Phòng Trọ Nhanh, <br /> Ở Ngay Hôm Nay!
          </h1>
          <p className="text-gray-80 font-[20px]">
            Dễ dàng tìm được chỗ ở phù hợp, <br /> bắt đầu cuộc sống mới thật
            tiện lợi!
          </p>
          <PrimaryButton name="Khám phá ngay" />
        </div>
        <div className="relative w-[520px] h-[410px]">
          <div className="absolute top-8 left-8 w-full h-full rounded-tl-[100px] border-2 border-gray-80 rounded-xl" />
          <img
            src={homeImage}
            alt=""
            className="relative rounded-tl-[100px] rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="container mx-auto py-8 px-8 flex justify-center flex-col max-w-[1100px]">
        <h2 className="text-2xl md:text-2xl font-bold mb-6 text-blue-10">
          Khu vực phổ biến
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          <div className="lg:col-span-1">
            <div
              onClick={() => handleClickRegion("Bình Thạnh")}
              className=" hover:cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img
                src={binhthanh}
                alt="Bình Thạnh"
                className="rounded-lg shadow-lg w-[330px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            <div
              onClick={() => handleClickRegion("Quận 7")}
              className="hover:cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img src={q7} alt="Quận 7" className="rounded-lg shadow-lg" />
            </div>
            <div
              onClick={() => handleClickRegion("Thủ Đức")}
              className="hover:cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img
                src={thuduc}
                alt="Thủ Đức"
                className="rounded-lg shadow-lg "
              />
            </div>
            <div
              onClick={() => handleClickRegion("Quận 1")}
              className="hover:cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img src={q1} alt="Quận 1" className="rounded-lg shadow-lg" />
            </div>
            <div
              onClick={() => handleClickRegion("Quận 3")}
              className="hover:cursor-pointer transition duration-300 transform hover:scale-105"
            >
              <img src={q3} alt="Quận 3" className="rounded-lg shadow-lg " />
            </div>
          </div>
        </div>
      </div>

      <div></div>
      {token &&   <FeaturedRooms title="Phòng nổi bật" />}
      <UserRating />

      <div className="flex justify-center mt-24">
        <div className="bg-gradient-to-b from-blue-40 to-blue-80 relative flex justify-between items-center mt-16 rounded-3xl h-[400px] w-[1050px]">
          <div className="space-y-4 ml-16">
            <h1 className="text-gray-80 font-bold text-3xl">
              Bạn có phòng trọ <br /> muốn cho thuê?
            </h1>
            <p className="text-gray-80 text-base">
              Đăng tin phòng trọ nhanh chóng và dễ dàng, <br /> giúp bạn tiếp
              cận ngay với hàng nghìn người <br /> đang tìm kiếm chỗ ở phù hợp!
            </p>
            <button
              onClick={handleClickCreateRoom}
              className="bg-transparent text-base border-2 border-gray-90 text-gray-90 font-semibold px-4 py-3 rounded-lg shadow-lg"
            >
              ĐĂNG PHÒNG TRỌ
            </button>
          </div>

          <div className="absolute right-7 mr-16">
            <img
              src={heroImage1}
              alt=""
              className="relative h-[400px] w-auto "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
