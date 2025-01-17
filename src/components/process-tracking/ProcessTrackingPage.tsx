import { ProcessTrackingRes, RentalRequestByIDRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { useAppStore } from "@/store";
import {
  formatDateTime,
  parseDate,
  parseTime,
  toCurrencyFormat,
} from "@/utils/converter";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ProcessTrackingPage = () => {
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const token = cookies.token;
  const { userInfo } = useAppStore();
  const [requests, setRequests] = useState<RentalRequestByIDRes[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RentalRequestByIDRes>(
    requests[0]
  );

  useEffect(() => {
    const requestService = new RequestService();
    const fetchRentalRequests = async () => {
      setLoading(true);
      try {
        const response =
          await requestService.getAllRentalRequestForProcessTracking(token);
        setRequests(response.data.data);
      } catch (error) {
        console.error("Failed to fetch rental requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalRequests();
  }, []);

  const [processTrackings, setProcessTrackings] = useState<
    ProcessTrackingRes[]
  >([]);
  useEffect(() => {
    const requestService = new RequestService();
    const fetchProcessTrackings = async () => {
      setLoading(true);
      try {
        const response = await requestService.trackRentalRequestProcess(
          token,
          selectedRequest.id
        );
        setProcessTrackings(response.data.data);
      } catch (error) {
        console.error("Failed to fetch process trackings", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRequest) {
      fetchProcessTrackings();
    }
  }, [selectedRequest, token]);

  return (
    <div className="flex space-x-6 p-6 mt-6">
      {/* Left: Tracking Items */}
      <div className="w-[45%] space-y-4">
        {requests.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-[20px] cursor-pointer text-[#fff] bg-blue-40 text-white`}
            onClick={() => setSelectedRequest(item)}
          >
            <div className="flex space-x-4 border-b border-[#fff]">
              <div>
                <img
                  src={item?.room.room_images[0]}
                  alt=""
                  className="h-20 rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base truncate max-w-64">
                    {item.room.title}
                  </h3>
                  <button className=" bg-opacity-30 bg-[#FFF] text-sm font-semibold px-2 py-1 rounded-[50px] ">
                    Chi tiết
                  </button>
                </div>
                <p className="text-sm">
                  {toCurrencyFormat(item.room.total_price)}{" "}
                </p>
                <p className="text-xs mb-4">{item.room.address.join(", ")}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs font-medium"></p>
              <p className="text-xs">{formatDateTime(item.created_at)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Details */}
      {!selectedRequest ? (
        <div className="w-2/3"></div>
      ) : loading ? (
        <div className="flex justify-center items-center w-[830px] h-[300px]">
          <Spin size="large" className="ml-72" />
        </div>
      ) : (
        <div className="w-2/3 space-y-6">
          {/* Property Details */}
          <div className="p-6 bg-white rounded-lg border border-blue-95">
            <h1 className="mb-4 text-gray-20">Thông tin phòng trọ</h1>
            <div className="flex space-x-4">
              <img
                src={selectedRequest?.room.room_images[0]}
                alt="Room"
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedRequest?.room.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedRequest?.room.address.join(", ")}
                </p>
                <p className="text-blue-60 font-bold text-lg mt-2">
                  {toCurrencyFormat(selectedRequest?.room.total_price)}đ
                </p>
              </div>
            </div>
          </div>

          {/* Status Tracking */}
          <div className="p-6 bg-white rounded-lg border border-blue-95">
            <h3 className="font-semibold text-gray-20 text-lg mb-4">
              Chi tiết trạng thái
            </h3>
            <div className="relative space-y-8">
              {processTrackings.map((detail, index) => (
                <div key={index} className="flex items-center ">
                  {/* Date and Time */}
                  <div className="w-[100px] flex-shrink-0 text-right pr-4">
                    <p className="text-sm font-medium text-gray-40">
                      {parseDate(detail.issued_at)}
                    </p>
                    <p className="text-sm text-gray-40">
                      {parseTime(detail.issued_at)}
                    </p>
                  </div>

                  {/* Vertical Line and Circle */}
                  <div className="relative flex flex-col items-center">
                    {/* Status Circle */}
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        detail
                          ? "bg-blue-4 text-white"
                          : detail
                            ? "bg-gray-300"
                            : "bg-gray-200"
                      }`}
                    >
                      {detail ? (
                        <div className="bg-gray-40 w-3 h-3 rounded-full"></div>
                      ) : (
                        <div className="bg-blue-40 w-3 h-3 rounded-full"></div>
                      )}
                    </div>
                    {/* Vertical Line */}
                    {index !== processTrackings.length - 1 && (
                      <div
                        className="absolute top-[24px] bottom-6 w-[2px]"
                        style={{
                          height: "calc(100% + 20px)",
                          backgroundColor: detail ? "#878787" : "#0077B6",
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Status Details */}
                  <div className="ml-4 flex-shrink-0">
                    <p className="text-xs font-medium text-gray-40">
                      {detail.actor.id === userInfo?.id
                        ? "Bạn"
                        : `${detail.actor.full_name} - ${detail.actor.role === 1 ? "Chủ nhà" : "Khách thuê"}`}
                    </p>
                    <p className="text-sm font-semibold text-gray-20">
                      {detail.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessTrackingPage;
