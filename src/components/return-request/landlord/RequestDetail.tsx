import { Button } from "antd";
import clock from "../../../assets/clock.svg";
import phone from "../../../assets/phone.svg";
import message_white from "../../../assets/message_white.svg";
import { StarFilled } from "@ant-design/icons";
import { ReturnRequestRes } from "@/models/request";
import { formatDate, toCurrencyFormat } from "@/utils/converter";
import { useEffect, useState } from "react";
import RoomService from "@/services/RoomService";
import { useCookies } from "react-cookie";
import { RoomRes } from "@/models/room";
import { toast } from "sonner";
import { useConversationStore } from "@/store";
import { useNavigate } from "react-router-dom";

interface RequestDetailsProps {
  request: ReturnRequestRes | null;
}

const RequestDetails = ({ request }: RequestDetailsProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);


  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [room, setRoom] = useState<RoomRes>();
  const { setSelectedConversationId, setSelectedUserId } =
    useConversationStore();
  const navigate = useNavigate();
  useEffect(() => {
    const roomService = new RoomService();
    const fetchRoom = async () => {
      try {
        const roomRes = await roomService.getByID(token, request?.room_id);
        const data = roomRes.data.data;

        setRoom(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    if (request) fetchRoom();
  }, [request]);

  const handleStartConversation = async () => {
    try {
      if (request?.created_user) {
        setSelectedUserId(request.created_user.id);
        setSelectedConversationId(null);
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Đã xảy ra lỗi khi bắt đầu cuộc trò chuyện.");
    }
  };
  if (!request) return <div></div>;


  
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-start">
        <h3 className="font-bold text-gray-20 text-lg mr-8">
          Yêu cầu #{request.created_at}
        </h3>
        <div className="flex space-x-2 bg-gray-90 px-5 py-1 rounded-sm text-sm font-medium text-gray-40">
          <img src={clock} className="w-5" alt="" />
          <p>{request.status === 1 ? "Chưa xử lý" : "Đã xác nhận"}</p>
        </div>
      </div>
      <p className="text-gray-40 text-xs mt-3">13:49 17/09/2023</p>
      <div className="mt-4 border space-y-3 border-blue-95 p-5 rounded-xl">
        <h4 className="font-semibold text-sm text-gray-20">
          Thông tin người thuê
        </h4>
        <div className="flex justify-between">
          <div className="flex items-center ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
              alt="User"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-sm">
                {request?.created_user.full_name}
              </p>
              <div className="flex space-x-1 ">
                {[...Array(5)].map((_, index) => (
                  <StarFilled
                    key={index}
                    className="text-[#FFCC47] text-[10px]"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              className="bg-blue-40 text-[#FFF] font-medium text-xs"
              onClick={handleStartConversation}
            >
              Chat
              <img src={message_white} className="w-3 h-3" alt="" />
            </Button>
            <Button className="text-gray-40 bg-gray-90 border-gray-40 font-medium text-xs">
              Gọi
              <img src={phone} alt="" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 border space-y-3 border-blue-95 p-5 rounded-xl">
        <h4 className="font-semibold text-sm text-gray-20">
          Thông tin phòng trọ
        </h4>
        <div className="flex items-center space-x-5">
          <img
            src={room?.room_images[0]}
            alt="Room"
            className="w-28 h-28 rounded-2xl"
          />
          <div className="space-y-2">
            <p className="text-gray-60 text-xs">{room?.capacity} người</p>
            <p className="font-semibold text-gray-20">{room?.title}</p>
            <p className="text-xs text-gray-40">{room?.address.join(", ")}</p>
            <p className="text-blue-60 font-bold">
              {toCurrencyFormat(room?.total_price)} ₫/phòng
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="w-1/2">
          <div className="mt-4 border border-blue-95 p-5 rounded-xl ">
            <h4 className="font-semibold text-sm text-gray-20">
              Chi tiết yêu cầu
            </h4>
            <ul className="space-y-4 mt-5">
              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Ngày trả phòng</span>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-xs text-gray-20">
                    {formatDate(request.return_date)}
                  </span>
                  <p className="text-gray-60 text-[10px]">
                    Theo như thời hạn hợp đồng
                  </p>
                </div>
              </li>

              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Lý do:</span>
                <span className="font-semibold text-xs text-gray-20">
                  {request?.reason}
                </span>
              </li>
            </ul>
          </div>
          <h3 className="text-gray-60 text-start text-xs my-4">
            Bạn có 7 ngày kể từ ngày người thuê trả phòng để kiểm tra và xác
            nhận tình trạng phòng cũng như ghi nhận hư hại (nếu có). Sau thời
            gian này, hệ thống sẽ tự động xác nhận việc trả phòng đã hoàn tất.
          </h3>
          <Button
            onClick={() => navigate("/return-request/success")}
            className="w-full bg-blue-60 text-[#fff] rounded-[100px] py-4"
          >
            Xác nhận
          </Button>
        </div>
        <div className="w-1/2">
          <div className="mt-4 border border-blue-95 p-5 rounded-xl ">
            <h4 className="font-semibold text-sm text-gray-20">
              Thông tin hoàn trả tiền cọc
            </h4>
            <ul className="space-y-4 mt-5">
              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Tiền đặt cọc:</span>
                <span className="font-semibold text-xs text-gray-20">
                  {toCurrencyFormat(request.total_return_deposit)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Tiền cấn trừ:</span>
                <span className="font-semibold text-xs text-gray-20">
                  {request.deduct_amount
                    ? toCurrencyFormat(request.deduct_amount)
                    : "0 đ"}
                </span>
              </li>
              {request.deduct_amount ? (
                <li className="flex justify-between">
                  <span className="text-gray-20 text-xs">Lý do:</span>
                  <span className="font-semibold text-xs text-gray-20 break-words max-w-[300px]">
                    Vi phạm thời hạn thông báo trả phòng
                  </span>
                </li>
              ) : (
                ""
              )}
              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Người nhận</span>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-xs text-gray-20">
                    Bên B
                  </span>
                  <p className="text-gray-20 font-semidbold text-xs">
                    ({request.created_user.full_name} - bên thuê)
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-between mt-6">
            <h1 className="text-gray-20 text-xl">Tổng tiền</h1>
            <p className="text-blue-40 text-xl font-semibold">
              {toCurrencyFormat(request.total_return_deposit)} đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
