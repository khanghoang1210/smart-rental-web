import { ReturnRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { useAppStore } from "@/store";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";
import { formatDateTime } from "@/utils/converter";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface RequestListProps {
  onRequestSelect: (request: ReturnRequestRes) => void; 
}
const RequestList = ({ onRequestSelect }: RequestListProps) => {
  const [requests, setRequests] = useState<ReturnRequestRes[]>([]);
  const { userInfo } = useAppStore();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    const requestService = new RequestService();

    const fetchRequest = async () => {
      try {
        const messageRes = await requestService.getReturnRequestByLandlordID(
          token,
          userInfo?.id
        );
        const data = messageRes.data.data;
        const requestsResponse = data.map((request: ReturnRequestRes) => ({
          ...request,
        }));
        setRequests(requestsResponse);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchRequest();
  }, []);

  console.log(requests)
  return (
    <div className="shadow-sm rounded-lg">
      <h3 className="text-gray-20 text-xl font-bold mb-8">Yêu cầu trả phòng</h3>
      {/* <div className="flex items-center space-x-5">
        <div className="bg-gray-90 px-3 rounded-3xl text-xs font-semibold text-gray-20">
          {requests.length}
        </div>
      </div> */}

      <div className="mt-2 space-y-3">
        {requests.map((item) => (
          <div
            className="flex justify-between items-center hover:bg-blue-98 cursor-pointer focus:border-none p-5 rounded-md border border-gray-90"
            key={item.id}
            onClick={() => onRequestSelect(item)}
          >
            <div className="flex items-center space-x-2">
              <img
                src={item.created_user.avatar_url || USER_DEFAULT_AVATAR}
                alt="User"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-20 text-sm">
                  {item.created_user.full_name}
                </p>
                <p className="text-xs text-gray-40">
                  Thời gian gửi: {formatDateTime(item.created_at)}
                </p>
              </div>
            </div>
            <p className="text-blue-40 text-xs font-semibold">
              {item.status === 0 ? "Chưa xử lý" : item.status === 1 ? "Đã xác nhận" : "Đã hoàn thành"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;
