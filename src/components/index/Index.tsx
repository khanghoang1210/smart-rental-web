import React, { useState } from "react";
import address from "../../assets/address.svg";
import { Button, Input, Modal, Upload } from "antd";
import digital from "../../assets/digital.svg";

const Index: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"DaChoThue" | "ConTrong">(
    "DaChoThue"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

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
              >
                <option value="Dien">Điện</option>
                <option value="Nuoc">Nước</option>
              </select>
            </div>
            <div className="flex flex-col border rounded-lg px-4 py-1">
              <label htmlFor="period" className="mb-1 text-sm text-gray-40">
                Kỳ
              </label>
              <select
                id="period"
                className="border-none text-gray-20 font-medium focus:outline-none focus:ring-0 rounded px-2 py-1 cursor-pointer"
              >
                <option value="10/2024">10/2024</option>
                <option value="11/2024">11/2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className=" border border-blue-95 p-6 mt-14 rounded-lg w-[40%]">
        <div className="flex items-center space-x-3 mb-4">
          <img src={address} alt="" />

          <h3 className="font-semibold text-gray-20 text-base">
            Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội
          </h3>
        </div>

        <table className="w-full ">
          <thead className="text-gray-40 border-b">
            <tr>
              <th className="p-2">Phòng số</th>
              <th className="p-2">CS cũ</th>
              <th className="p-2">CS Mới</th>
              <th className="p-2">Sử dụng</th>
            </tr>
          </thead>
          <tbody className="font-medium text-gray-20">
            {[1, 2, 3, 4].map((room, index) => (
              <tr key={index}>
                <td className="border-b p-2 text-gray-20 text-center">
                  {room}
                </td>
                <td className="p-2 text-gray-20 border-b text-center">150</td>
                <td className="p-2 border-b text-center">
                  {index % 2 === 0 ? (
                    <button
                      onClick={() => openModal(room)}
                      className="px-2 py-1 text-blue-40 bg-blue-98 text-sm font-semibold rounded"
                    >
                      Ghi
                    </button>
                  ) : (
                    "167"
                  )}
                </td>
                <td className="p-2 border-b text-center">
                  {index % 2 === 0 ? "-" : "17"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
