import { RentalRequestByIDRes, RentalRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { formatDateTime, getStatusLabel } from "@/utils/converter";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface RequestListProps {
  onRequestSelect: (requestID: number) => void;
}
const RequestList = ({ onRequestSelect }: RequestListProps) => {
  const [requests, setRequests] = useState<RentalRequestRes[]>([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  const handleRequestClick = (id: number) => {
    setSelectedRequestId(id);
    onRequestSelect(id); // Gọi hàm callback từ props
  };

  useEffect(() => {
    const requestService = new RequestService();

    const fetchRequest = async () => {
      try {
        const messageRes = await requestService.getAllRentalRequest(token);
        const data = messageRes.data.data;
        // const requestsResponse = data.map((request: RentalRequestRes) => ({
        //   ...request,
        // }));
        setRequests(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    fetchRequest();
  }, []);

  console.log(requests);

  return (
    <div className="shadow-sm rounded-lg w-[110%]">
      <h3 className="text-gray-20 text-xl font-bold mb-8">Yêu cầu thuê trọ</h3>
      {requests.length === 0 ? (
        <div className="text-gray-40">Bạn không có yêu cầu nào</div>
      ) : (
        requests.map((request, requestIndex) => (
          <div
            key={requestIndex}
            className="border border-gray-90 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between mb-3 items-center">
              <h4 className="text-gray-60 text-xs font-medium max-w-72">
                {request.room.title}
              </h4>
              <div className="bg-gray-90 px-4 py-1 rounded-3xl text-xs font-semibold text-gray-20">
                {request.request_count}
              </div>
            </div>
            <div className="space-y-3">
              {request.request_info.map((info: any) => (
                <div
                  key={info.id}
                  onClick={() => handleRequestClick(info.id)}
                  className={`flex justify-between items-center cursor-pointer p-4 rounded-md border border-gray-90 ${
                    selectedRequestId === info.id
                      ? "bg-blue-98"
                      : "hover:bg-blue-98"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={info.avatar}
                      alt={info.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-20 text-sm">
                        {info.name}
                      </p>
                      <p className="text-xs text-gray-40">
                        Thời gian gửi: {formatDateTime(info.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-40 text-xs font-semibold">
                    {getStatusLabel(info.status)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestList;
