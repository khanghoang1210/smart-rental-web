import { Button } from "antd";
import clock from "../../assets/clock.svg";
import phone from "../../assets/phone.svg";
import checked from "../../assets/checked.png";
import x from "../../assets/x.png";
import message_white from "../../assets/message_white.svg";
import edit_note from "../../assets/edit_note.png";
import { StarFilled } from "@ant-design/icons";
import { RentalRequestRes } from "@/models/request";
import {
  formatDate,
  getStatusLabel,
  toCurrencyFormat,
} from "@/utils/converter";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useAppStore, useConversationStore } from "@/store";
import { useNavigate } from "react-router-dom";
import ConversationService from "@/services/ConversationService";
import { useSocket } from "@/context/SocketContext";
import RequestService from "@/services/RequestService";

interface RequestDetailsProps {
  request: RentalRequestRes | null;
}

const RequestDetails = ({ request }: RequestDetailsProps) => {
  const [cookies] = useCookies(["token"]);
  const socket = useSocket();
  const { setSelectedConversationId, setSelectedUserId } =
    useConversationStore();
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const handleCreateContract = async () => {
    navigate("/contract/create", { state: request });
  };
  const handleAcceptRequest = async () => {
    try {
      if (!request) {
        toast.error("Thông tin không đủ để xử lý yêu cầu.");
        return;
      }

      setSelectedUserId(request.sender.id);
      const conversationService = new ConversationService();

      // Kiểm tra hoặc tạo conversation
      let conversationIdToUse = null;
      if (request.sender.id) {
        const response = await conversationService.getConversationByUserId(
          cookies.token,
          request.sender.id
        );
        const conversationData = response.data.data;

        if (conversationData && conversationData.length > 0) {
          conversationIdToUse = conversationData[0].id;
        } else {
          const newConversation = await conversationService.createConversation(
            cookies.token,
            request.sender.id
          );
          conversationIdToUse = newConversation.data.data;
        }
        setSelectedConversationId(conversationIdToUse);
      }

      // Nội dung tin nhắn JSON
      const rentalMessage = {
        rental_id: request.id,
        room_title: request.room.title,
        room_address: request.room.address.join(", "),
      };

      // Gửi tin nhắn qua socket
      socket?.emit("sendMessage", {
        sender_id: userInfo?.id, // ID của chủ nhà
        receiver_id: request.sender?.id, // ID của người thuê
        conversation_id: conversationIdToUse,
        content: null, // Nội dung JSON
        type: 2,
        rent_auto_content: JSON.stringify(rentalMessage),
      });

      const requestService = new RequestService();
      await requestService.approveRentalRequest(cookies.token, request.id);

      toast.success("Yêu cầu đã được tiếp nhận và tin nhắn đã gửi!");

      setTimeout(() => {
        navigate("/chat");
      }, 500);
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Đã xảy ra lỗi khi tiếp nhận yêu cầu.");
    }
  };

  const handleDeclineRequest = async () => {
    try {
      if (!request) {
        toast.error("Thông tin không đủ để xử lý yêu cầu.");
        return;
      }
      const requestService = new RequestService();
      await requestService.declineRentalRequest(cookies.token, request.id);

      toast.success("Yêu cầu đã được từ chối!");
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Đã xảy ra lỗi khi tiếp nhận yêu cầu.");
    }
  };
  const handleStartConversation = async () => {
    try {
      if (request?.sender) {
        setSelectedUserId(request.sender.id);
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
      <div className="flex justify-start items-center">
        <h3 className="font-bold text-gray-20 text-lg mr-8">
          #{request?.code}
        </h3>
        <div
          className={`flex space-x-2 items-center px-5 py-1 rounded-sm text-sm font-medium 
            ${
              request.status === 1
                ? "bg-gray-90 text-gray-40"
                : request.status === 2
                  ? "bg-[#E9FFE8] text-[#3FA836]"
                  : "bg-[#FFF0F1] text-[#FF425E]"
            } `}
        >
          {request.status === 1 ? (
            <img src={clock} className="w-5" alt="" />
          ) : request.status === 2 ? (
            <img src={checked} className="w-3 h-3" alt="" />
          ) : (
            <img src={x} className="w-3 h-3" alt="" />
          )}

          <p className="font-semibold">{getStatusLabel(request?.status)}</p>
        </div>

        {request.status == 2 && (
          <Button
            onClick={handleCreateContract}
            className="ml-36 mr-0 px-6 items-center h-10 py-3 font-semibold border border-blue-60 text-blue-60 rounded-[100px]"
          >
            <img src={edit_note} alt="" className="w-8 h-8" />
            Soạn thảo hợp đồng
          </Button>
        )}
      </div>
      <p className="text-gray-40 text-xs mt-3">13:49 17/09/2023</p>
      {userInfo?.role === 1 && (
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
                  {request?.sender.full_name}
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
      )}

      <div className="mt-4 border space-y-3 border-blue-95 p-5 rounded-xl">
        <h4 className="font-semibold text-sm text-gray-20">
          Thông tin phòng trọ
        </h4>
        <div className="flex items-center space-x-5">
          <img
            src={request.room?.room_images[0]}
            alt="Room"
            className="w-28 h-28 rounded-2xl"
          />
          <div className="space-y-2">
            <p className="text-gray-60 text-xs">
              {request.room?.capacity} người
            </p>
            <p className="font-semibold text-gray-20">{request.room?.title}</p>
            <p className="text-xs text-gray-40">
              {request.room?.address.join(", ")}
            </p>
            <p className="text-blue-60 font-bold">
              {toCurrencyFormat(request.room?.total_price)} ₫/phòng
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border border-blue-95 p-5 rounded-xl">
        <h4 className="font-semibold text-sm text-gray-20">Chi tiết yêu cầu</h4>
        <ul className="space-y-4 mt-5">
          <li className="flex justify-between">
            <span className="text-gray-20 text-xs">Giá đề xuất:</span>
            <div className="flex flex-col items-end">
              <span className="font-semibold text-xs text-gray-20">
                {toCurrencyFormat(request?.suggested_price)} đ
              </span>
              {request.room?.total_price - request?.suggested_price > 0 && (
                <p className="text-[#FF5050] text-[10px]">
                  Thấp hơn giá niêm yết{" "}
                  {toCurrencyFormat(
                    request.room?.total_price - request?.suggested_price
                  )}{" "}
                  ₫
                </p>
              )}
            </div>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-20 text-xs">
              Số người dự định ở cùng:
            </span>
            <div className="flex flex-col items-end">
              <span className="font-semibold text-xs text-gray-20">
                {request?.num_of_person} người
              </span>
              {request?.num_of_person > request.room.capacity && (
                <p className="text-[#FF5050] text-[10px]">
                  Vượt quá sức chứa phòng
                </p>
              )}
            </div>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-20 text-xs">Ngày bắt đầu thuê:</span>
            <span className="font-semibold text-xs text-gray-20">
              {formatDate(request?.begin_date)}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-20 text-xs">Yêu cầu đặc biệt:</span>
            <span className="font-semibold text-xs text-gray-20">
              {request?.addition_request}
            </span>
          </li>
        </ul>
      </div>

      {request.status === 1 && (
        <div className="mt-6 flex justify-end space-x-6">
          <Button
            onClick={handleDeclineRequest}
            className={`bg-[#FFF0F1] border-none font-semibold ${userInfo?.role == 1 ? "w-1/2" : "w-full"} py-3`}
            danger
          >
            {userInfo?.role === 1 ? (
              <img src={x} className="w-3 h-3" alt="" />
            ) : (
              <img src={x} className="w-3 h-3" alt="" />
            )}{" "}
            {userInfo?.role === 1 ? "Từ chối" : "Hủy yêu cầu"}
          </Button>
          {userInfo?.role === 1 && (
            <Button
              onClick={handleAcceptRequest}
              className="border-none bg-[#E9FFE8] text-[#3FA836] font-semibold w-1/2"
            >
              <img src={checked} className="w-3 h-3" alt="" />
              Tiếp nhận
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
