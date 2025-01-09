import { RentalRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { formatDateTime, getStatusLabel } from "@/utils/converter";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface RequestListProps {
  onRequestSelect: (request: RentalRequestRes) => void; // Hàm truyền yêu cầu được chọn
}
const RequestList = ({ onRequestSelect }: RequestListProps) => {
  const [requests, setRequests] = useState<RentalRequestRes[]>([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    const requestService = new RequestService();

    const fetchRequest = async () => {
      try {
        const messageRes = await requestService.getAllRentalRequest(token);
        const data = messageRes.data.data.requests;
        const requestsResponse = data.map((request: RentalRequestRes) => ({
          ...request,
        }));
        setRequests(requestsResponse);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchRequest();
  }, []);

  return (
    <div className="shadow-sm rounded-lg">
      <h3 className="text-gray-20 text-xl font-bold mb-8">Yêu cầu thuê trọ</h3>
      {requests.length == 0 && (
        <div className="text-gray-40">Bạn không có yêu cầu nào</div>
      )}
      <div className="flex items-center space-x-5">
        <h1 className="text-gray-60 text-xs font-medium">
          Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội
        </h1>
        <div className="bg-gray-90 px-3 rounded-3xl text-xs font-semibold text-gray-20">
          {requests.length}
        </div>
      </div>

      <div className="mt-2 space-y-3">
        {requests.map((item) => (
          <div
            className="flex justify-between items-center hover:bg-blue-98 cursor-pointer focus:border-none p-5 rounded-md border border-gray-90"
            key={item.id}
            onClick={() => onRequestSelect(item)}
          >
            <div className="flex items-center space-x-2">
              <img
                src={item.sender.avatar_url}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-20 text-sm">
                  {item.sender.full_name}
                </p>
                <p className="text-xs text-gray-40">
                  Thời gian gửi: {formatDateTime(item.created_at)}
                </p>
              </div>
            </div>
            <p className="text-blue-40 text-xs font-semibold">
              {getStatusLabel(item.status)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;
