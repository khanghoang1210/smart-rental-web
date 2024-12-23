import { USER_DEFAULT_AVATAR } from "@/utils/constants";
import React from "react";

interface HostCardProps {
  full_name: string;
  role: string;
  total_rating: number;
  avg_rating: number;
  total_room: number;
  avatar_url: string;
}
const HostCard: React.FC<HostCardProps> = ({
  full_name,
  role,
  total_rating,
  avg_rating,
  total_room,
  avatar_url,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg w-1/3 shadow-md flex items-center space-x-24">
      <div className="flex items-center space-y-2 flex-col">
        <img
          src={avatar_url||USER_DEFAULT_AVATAR}
          alt="Host Avatar"
          className="w-20 h-20 rounded-full mr-4 object-cover"
        />
        <h3 className="text-lg text-blue-40 font-bold">{full_name}</h3>
        <p className="text-sm text-gray-20">{role}</p>
      </div>
      <div>
        <div className="mt-2 flex text-gray-20 items-center space-y-6 flex-col">
          <div className="items-center flex flex-col">
            <p className="font-bold">{total_rating}</p>
            <p>Đánh giá</p>
          </div>
          <div className="items-center flex flex-col">
            <p className="font-bold">{avg_rating}</p>
            <p>Xếp hạng</p>
          </div>
          <div className="items-center flex flex-col">
            <p className="font-bold">{total_room}</p>
            <p>Phòng trọ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostCard;
