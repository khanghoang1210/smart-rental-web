import { USER_DEFAULT_AVATAR } from "@/utils/constants";

interface LandlordInfoProps {
  name: string | undefined;
  totalRoom: number | undefined;
  avatar: string | undefined;
  totalRating: number | undefined;
}
const LandlordInfo = (prop: LandlordInfoProps) => {
  return (
    <div className="border rounded-lg p-6 shadow-md w-[500px]">
      <div className="flex justify-center items-center">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center mb-4 w-full">
          <img
            src={prop.avatar || USER_DEFAULT_AVATAR} 
            alt="Nam Huong"
            className="rounded-full w-32 h-32 object-cover mb-4"
          />
          <h3 className="text-[32px] font-medium text-blue-10">{prop.name}</h3>
          <p className="text-gray-20 text-2xl font-medium">Chủ nhà</p>
        </div>

        {/* Room Count and Ratings */}
        <div className="flex flex-col items-center text-center w-full ml-10">
          <div className="w-full pb-10">
            <h3 className="text-[40px] font-medium text-blue-10">
              {prop.totalRoom}
            </h3>
            <p className="text-gray-20 text-2xl font-medium">Phòng trọ</p>
          </div>
          <div className="w-full border-t pt-4">
            <h3 className="text-[40px] font-medium text-blue-10">
              {prop.totalRating}
            </h3>
            <p className="text-gray-20 text-2xl font-medium">Đánh giá</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordInfo;
