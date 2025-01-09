import React, { useEffect, useState } from "react";
import address from "../../assets/address.svg";
import { Button, Input, Modal, Spin } from "antd";
import { useCookies } from "react-cookie";
import BillingService from "@/services/BillingService";
import { toast } from "sonner";
import { generatePeriods } from "@/utils/generater";

const Index: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"DaChoThue" | "ConTrong">(
    "DaChoThue"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const periods = generatePeriods();
  const [selectedPeriod, setSelectedPeriod] = useState(periods[length - 1]);
  const [selectedType, setSelectedType] = useState("electric");
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [loading, setLoading] = useState(false);
  const [indexData, setIndexData] = useState<any>(null);
  const [inputIndex, setInputIndex] = useState<number | null>(null);

  const handleTabChange = (tab: "DaChoThue" | "ConTrong") => {
    setSelectedTab(tab);
  };

  const openModal = (roomNumber: number) => {
    setSelectedRoom(roomNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleCreateIndex = async () => {
    const billingService = new BillingService();
    setLoading(true);
    try {
      const data = {
        room_id: indexData?.find((data: any) =>
          data.index_info.some((info: any) => info.room_number === selectedRoom)
        )?.room_id,
        month: getMonthYear(selectedPeriod).month,
        year: getMonthYear(selectedPeriod).year,
        ...(selectedType === "electric"
          ? { electricity_index: inputIndex }
          : { water_index: inputIndex }),
      };
      const response = await billingService.createIndex(token, data);
      toast.success("Ghi chỉ số thành công.");
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi ghi chỉ số.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const getMonthYear = (period: string) => {
    const [month, year] = period.split("/").map(Number);
    return { month, year };
  };

  const fetchIndexData = async (type: string, period: string) => {
    const { month, year } = getMonthYear(period);
    const billingService = new BillingService();
    setLoading(true);
    try {
      const response = await billingService.getIndex(token, year, month, type);
      setIndexData(response.data.data);
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi lấy chỉ số.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndexData(selectedType, selectedPeriod);
  }, [selectedPeriod, selectedType]);

  return (
    <div className="flex justify-center space-x-14 bg-white rounded-lg p-6">
      <div className="w-[10%]">
        <h1 className="mb-8 text-gray-20 font-semibold">Chỉ số điện nước</h1>

        <div className="mt-4 w-full">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col border rounded-lg px-4 py-1">
              <label htmlFor="type" className="mb-1 text-sm text-gray-40">
                Loại
              </label>
              <select
                id="type"
                className="border-none text-gray-20 font-medium focus:outline-none focus:ring-0 rounded px-2 py-1 cursor-pointer"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="electric">Điện</option>
                <option value="water">Nước</option>
              </select>
            </div>
            <div className="flex flex-col border rounded-lg px-4 py-1">
              <label htmlFor="period" className="mb-1 text-sm text-gray-40">
                Kỳ
              </label>
              <select
                value={selectedPeriod}
                onChange={async (e) => {
                  setSelectedPeriod(e.target.value);
                }}
                id="period"
                className="border-none text-gray-20 font-medium focus:outline-none focus:ring-0 rounded px-2 py-1 cursor-pointer"
              >
                {periods.map((period: string, index: number) => (
                  <option key={index} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-[740px] h-[300px]">
          <Spin size="large" className="ml-52" />
        </div>
      ) : indexData && indexData.length > 0 ? (
        <div className="flex flex-col items-start space-y-4">
          {indexData.map((data: any, index: number) => (
            <div
              key={index}
              className="flex flex-col border border-blue-95 p-6 mt-14 rounded-lg w-full"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img src={address} alt="" />
                <h3 className="font-semibold text-gray-20 text-base">
                  {data.address}
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-2">
                <div className="font-semibold">Phòng số</div>
                <div className="font-semibold">CS cũ</div>
                <div className="font-semibold">CS Mới</div>
                <div className="font-semibold">Sử dụng</div>
              </div>
              {data.index_info.map((info: any, subIndex: number) => (
                <div
                  key={subIndex}
                  className="grid grid-cols-4 gap-4 border-t py-3"
                >
                  <div>{info.room_number}</div>
                  <div>{info.old_index}</div>
                  <div>
                    {info.new_index === null ? (
                      <button
                        onClick={() => openModal(info.room_number)}
                        className="px-2 py-1 text-blue-40 bg-blue-98 text-sm font-semibold rounded"
                      >
                        Ghi
                      </button>
                    ) : (
                      info.new_index
                    )}
                  </div>
                  <div>{info.used === null ? "-" : info.used}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : !indexData ||
        (indexData[0].index_info.new_index === null &&
          indexData[0].index_info.old_index === null) ? (
        <div className="flex justify-center items-center w-[740px] h-[300px]">
          <p className="text-gray-40 text-lg">Không có dữ liệu chỉ số</p>
        </div>
      ) : null}
      {/* Modal */}
      <Modal
        title={<label className="text-gray-20">Ghi số điện</label>}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <div className="space-y-4">
          <div className="text-sm mt-10">
            <div className="flex mb-4 items-center text-base text-gray-20 font-semibold space-x-4">
              <img src={address} alt="" />
              <p>
                {
                  indexData?.find((data: any) =>
                    data.index_info.some(
                      (info: any) => info.room_number === selectedRoom
                    )
                  )?.address
                }
              </p>
            </div>
            <p className="font-semibold text-blue-40">
              PHÒNG SỐ {selectedRoom}
            </p>
          </div>
          <div className="text-gray-40">
            <label htmlFor="indexInput" className="block text-sm mb-1">
              {selectedType === "electric" ? "SỐ ĐIỆN" : "SỐ NƯỚC"}
            </label>
            <Input
              id="indexInput"
              placeholder={`Nhập ${selectedType === "electric" ? "số điện" : "số nước"}`}
              onChange={(e) => setInputIndex(Number(e.target.value))}
            />
          </div>

          <div className="text-center">
            <Button
              className="w-[60%] py-6 font-medium border border-blue-60 text-blue-60 rounded-[100px]"
              onClick={handleCreateIndex}
            >
              Ghi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
