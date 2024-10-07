import nva from "../../assets/nguyenvana.png";
import PrimaryButton from "../../ui/PrimaryButton";
import { StarFilled } from "@ant-design/icons";

const UserRating = () => {
  return (
    <div>
      <div className="flex justify-center items-center space-x-16 mt-24">
        <div className="relative w-[350px] h-[410px]">
          <div className="absolute bottom-8 right-8 w-full h-full rounded-br-[100px] border-2 border-gray-80 rounded-xl" />
          <img
            src={nva}
            alt=""
            className="relative rounded-br-[100px] rounded-xl shadow-lg"
          />
        </div>

        <div className="mr-36 space-y-8">
          <h1 className="text-blue-10 font-semibold text-3xl">Nguyễn Văn A</h1>
          <div className="my-10">
            <div className="flex space-x-1 ">
              {/* Tạo các dấu sao bằng StarOutlined từ Ant Design */}
              {[...Array(5)].map((_, index) => (
                <StarFilled key={index} className="text-[#FFCC47] text-2xl" />
              ))}
            </div>
            <p className="text-gray-20 font-[24px] text-xl mt-3">
              Nhà đầy đủ tiện nghi và sạch sẽ, <br /> không chung chủ, giờ giấc
              thoải mái ...
            </p>
          </div>

          <p className="text-gray-60 text-sm">Đã thuê 1 năm 2 tháng</p>
          <PrimaryButton name="Xem chi tiết" />
        </div>
      </div>
    </div>
  );
};
export default UserRating;
