import React, { useEffect, useState } from "react";
import address from "../../assets/address.svg";
import { Button, Divider, Input, Modal, Spin, Upload } from "antd";
import digital from "../../assets/digital.svg";
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
      <div className="">
        <h1 className="mb-8 text-gray-20 font-semibold">Chỉ số điện nước</h1>
        <div className="flex space-x-4">
          <button
            className={`px-10 py-2 rounded-lg text-sm ${
              selectedTab === "DaChoThue"
                ? "bg-blue-40 text-[#fff]"
                : "bg-gray-90 text-gray-40"
            }`}
            onClick={() => handleTabChange("DaChoThue")}
          >
            Đã cho thuê
          </button>
          <button
            className={`px-10 py-2 rounded-lg text-sm ${
              selectedTab === "ConTrong"
                ? "bg-blue-40 text-[#fff]"
                : "bg-gray-90 text-gray-40"
            }`}
            onClick={() => handleTabChange("ConTrong")}
          >
            Còn trống
          </button>
        </div>
        <div className="mt-4">
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
        indexData?.map((data: any, index: number) => (
          <div
            key={index}
            className="border border-blue-95 p-6 mt-14 rounded-lg w-[40%]"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img src={address} alt="" />
              <h3 className="font-semibold text-gray-20 text-base">
                {data.address}
              </h3>
            </div>
            <table className="w-full">
              <thead className="text-gray-40 border-b">
                <tr>
                  <th className="p-2">Phòng số</th>
                  <th className="p-2">CS cũ</th>
                  <th className="p-2">CS Mới</th>
                  <th className="p-2">Sử dụng</th>
                </tr>
              </thead>
              <tbody className="font-medium text-gray-20">
                {data.index_info.map((info: any, subIndex: number) => (
                  <tr key={`${index}-${subIndex}`}>
                  <td className={`${info === data.index_info[data.index_info.length -1] ? "" : "border-b"} p-2 text-gray-20 text-center`}>
                      {info.room_number}
                    </td>
                    <td className={`${info === data.index_info[data.index_info.length -1] ? "" : "border-b"} p-2 text-gray-20 text-center`}>
                      {info.old_index}
                    </td>
                    <td className={`${info === data.index_info[data.index_info.length -1] ? "" : "border-b"} p-2 text-gray-20 text-center`}>
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
                    </td>
                    <td className={`${info === data.index_info[data.index_info.length -1] ? "" : "border-b"} p-2 text-gray-20 text-center`}>
                      {info.used === null ? "-" : info.used}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ): (
        <div className="flex justify-center items-center w-[740px] h-[300px]">
          <p className="text-gray-40 text-lg">Không có dữ liệu chỉ số</p>
        </div>
      )}
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
              <p>Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội</p>
            </div>
            <p className="font-semibold text-blue-40">
              PHÒNG SỐ {selectedRoom}
            </p>
          </div>
          <div className="text-gray-40">
            <label htmlFor="electricIndex" className="block text-sm mb-1">
              SỐ ĐIỆN
            </label>
            <Input id="electricIndex" placeholder="Nhập số điện" />
          </div>
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm mb-1 text-gray-40"
            >
              HÌNH ẢNH
            </label>
            <Upload.Dragger className="border-dashed ant-upload-drag">
              <div className="flex justify-center mb-3">
                <img src={digital} alt="" className="w-10 h-10" />
              </div>
              <p className="text-blue-60 text-xs">
                Bấm hoặc kéo thả hình ảnh vào đây để <br /> đăng hình ảnh từ thư
                viện nhé!
              </p>
            </Upload.Dragger>
          </div>
          <div className="text-center">
            <Button
              className="w-[60%] py-6 font-medium border border-blue-60 text-blue-60 rounded-[100px]"
              onClick={closeModal}
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
