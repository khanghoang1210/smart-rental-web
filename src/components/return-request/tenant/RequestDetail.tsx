import { Button } from "antd";
import clock from "../../../assets/clock.svg";
import phone from "../../../assets/phone.svg";
import checked from "../../../assets/checked.png";
import message_white from "../../../assets/message_white.svg";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { ReturnRequestRes } from "@/models/request";
import {
  formatDate,
  formatDateTime,
  toCurrencyFormat,
} from "@/utils/converter";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useConversationStore } from "@/store";
import { useNavigate } from "react-router-dom";
import RequestService from "@/services/RequestService";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";

interface RequestDetailsProps {
  requestId: number;
}

const RequestDetails = ({ requestId }: RequestDetailsProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [request, setRequest] = useState<ReturnRequestRes>();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const { setSelectedConversationId, setSelectedUserId } =
    useConversationStore();
  const navigate = useNavigate();
  useEffect(() => {
    const roomService = new RequestService();
    const fetchRequest = async () => {
      try {
        const roomRes = await roomService.getReturnRequestByID(
          token,
          requestId
        );
        const data = roomRes.data.data;

        setRequest(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    if (requestId) fetchRequest();
  }, [requestId]);

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

  const handleReturnDeposit = async () => {
    navigate("/payment/info", { state: { returnID: request?.id } });
  };
  const handleAcceptRequest = async () => {
    try {
      if (!request) {
        toast.error("Thông tin không đủ để xử lý yêu cầu.");
        return;
      }

      const requestService = new RequestService();
      await requestService.approveReturnRequest(cookies.token, request.id);

      toast.success("Yêu cầu trả phòng đã được tiếp nhận!");

      setTimeout(() => {
        navigate("/return-request/success", {
          state: { tenantID: request.created_user.id },
        });
      }, 500);
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Đã xảy ra lỗi khi tiếp nhận yêu cầu.");
    }
  };
  let total_return = 0;
  if (request?.total_return_deposit) {
    total_return = request?.total_return_deposit - request?.deduct_amount;
  }
  console.log(total_return);
  if (!requestId) return <div></div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-start">
        <h3 className="font-bold text-gray-20 text-lg mr-8">
          Yêu cầu #{request?.contract_id}
        </h3>
        <div
          className={`flex items-center space-x-2 ${request?.status === 0 ? "bg-gray-90 text-gray-40" : "bg-[#E9FFE8] text-[#3FA836]"}  px-5 py-1 rounded-sm text-sm font-medium `}
        >
          {request?.status === 0 ? (
            <img src={clock} className="w-5" alt="" />
          ) : (
            <img src={checked} className="w-3 h-3" alt="" />
          )}
          <p>
            {request?.status === 0
              ? "Chưa xử lý"
              : request?.status === 1
                ? "Đã xác nhận"
                : "Đã hoàn thành"}
          </p>
        </div>
      </div>
      <p className="text-gray-40 text-xs mt-3">
        {formatDateTime(request?.created_at)}
      </p>

      <div className="mt-4 border space-y-3 border-blue-95 p-5 rounded-xl">
        <h4 className="font-semibold text-sm text-gray-20">
          Thông tin phòng trọ
        </h4>
        <div className="flex items-center space-x-5">
          <img
            src={request?.room?.room_images[0]}
            alt="Room"
            className="w-28 h-28 rounded-2xl"
          />
          <div className="space-y-2">
            <p className="text-gray-60 text-xs">
              {request?.room?.capacity} người
            </p>
            <p className="font-semibold text-gray-20">{request?.room?.title}</p>
            <p className="text-xs text-gray-40">
              {request?.room?.address.join(", ")}
            </p>
            <p className="text-blue-60 font-bold">
              {toCurrencyFormat(request?.room?.total_price)} ₫/phòng
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
                    {formatDate(request?.return_date)}
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
          {request?.status === 0 && (
            <Button
              onClick={handleAcceptRequest}
              className="w-full bg-blue-60 text-[#fff] rounded-[100px] py-4"
            >
              Xác nhận
            </Button>
          )}
          {request?.status === 1 && (
            <Button
              onClick={handleReturnDeposit}
              className="w-full bg-blue-60 text-[#fff] rounded-[100px] py-4"
            >
              Hoàn trả tiền cọc
            </Button>
          )}
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
                  {toCurrencyFormat(request?.total_return_deposit)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-20 text-xs">Tiền cấn trừ:</span>
                <span className="font-semibold text-xs text-gray-20">
                  {request?.deduct_amount
                    ? toCurrencyFormat(request?.deduct_amount)
                    : "0 đ"}
                </span>
              </li>
              {request?.deduct_amount ? (
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
                    ({request?.created_user?.full_name} - bên thuê)
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-between mt-6">
            <h1 className="text-gray-20 text-xl">Tổng tiền</h1>
            <p className="text-blue-40 text-xl font-semibold">
              {toCurrencyFormat(total_return) || 0} đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
