import { Card } from "antd";
import { Link } from "react-router-dom";

interface MessageCardProps {
  rentalRequestID: number;
  roomTitle: string;
  roomAddress: string;
  isSender: boolean
}
const MessageCard = (prop: MessageCardProps) => {
  return (
      <Card
        bordered={false}
        className={`${prop.isSender ? "bg-blue-60 text-[#FFF]" :"bg-gray-90 text-gray-20" } w-[50%] max-w-md rounded-xl  shadow-lg`}
      >
        <p className="">
          <Link
            to={`/request/${prop.rentalRequestID}`}
            className="font-bold underline"
          >
            Yêu cầu thuê phòng của bạn
          </Link>{" "}
           đã được tiếp nhận
        </p>
        <div className={`${prop.isSender ? "bg-gray-90": "bg-gray-80"} p-3 rounded-lg mt-1 space-y-1`}>
          <p className="font-semibold text-lg text-gray-20">{prop.roomTitle}</p>
          <p className={`${prop.isSender ? "text-blue-60" :"text-blue-40"} font-bold`}>1.6 triệu VND/người</p>
          <p className="text-gray-20 text-xs">{prop.roomAddress}</p>
        </div>
        <p className="text-gray-700 mt-4">
          Bạn có thể trao đổi thêm chi tiết hoặc đặt lịch xem phòng
          <span className="text-blue-600 cursor-pointer"> tại đây</span>
        </p>
      </Card>
  );
};

export default MessageCard;
