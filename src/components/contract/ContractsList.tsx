// ContractsList.tsx
import React, { useState } from "react";
import { Button, Card } from "antd";
import chukycanhan from "../../assets/chukycanhan.png";

interface Contract {
  id: string;
  room: string;
  address: string;
  tenant: string;
  startDate: string;
  endDate: string;
}

interface ContractsListProps {
  onSelectContract: (contract: Contract) => void;
}

const ContractsList: React.FC<ContractsListProps> = ({ onSelectContract }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const contracts: Contract[] = [
    {
      id: "HD221",
      room: "Phòng 3.11",
      address: "97 đường số 11, phường Trường Thọ, TP Thủ Đức, TP HCM",
      tenant: "Nguyễn Phương Phương",
      startDate: "04/12/2023",
      endDate: "05/12/2023",
    },
    {
      id: "HD221",
      room: "Phòng 3.11",
      address: "97 đường số 11, phường Trường Thọ, TP Thủ Đức, TP HCM",
      tenant: "Nguyễn Phương Phương",
      startDate: "04/12/2023",
      endDate: "05/12/2023",
    },
  ];

  return (
    <div className="w-[20%] px-8 py-6 ml-24">
      <h1 className="text-gray-20 font-medium text-lg">Hợp đồng thuê trọ</h1>

      <div className="flex space-x-4 my-4">
        <Button
          className={`px-4 py-2 rounded-lg border-none  ${
            activeTab === "pending"
              ? "bg-blue-40 text-[#FFF]"
              : "bg-gray-90 text-gray-40"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Đang chờ
        </Button>
        <Button
          className={`px-4 py-2 rounded-lg border-none ${
            activeTab === "active"
              ? "bg-blue-40 text-[#FFF]"
              : "bg-gray-90 text-gray-40"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Còn hiệu lực
        </Button>
        <Button
          className={`px-4 py-2 rounded-lg border-none ${
            activeTab === "expired"
              ? "bg-blue-40 text-[#FFF]"
              : "bg-gray-90 text-gray-40"
          }`}
          onClick={() => setActiveTab("expired")}
        >
          Hết hiệu lực
        </Button>
      </div>
      <div className="flex  text-xs items-center space-x-3 mb-2">
        <span className=" text-gray-40">Hợp đồng đang chờ ký</span>
        <div className="bg-gray-80 px-1 text-gray-20 rounded-full">12</div>
      </div>

      <div className="space-y-4">
        {activeTab === "pending" &&
          contracts.map((contract) => (
            <Card
              key={contract.id}
              className="hover:bg-blue-98 hover:border-blue-98 focus:bg-blue-98 cursor-pointer rounded-lg "
              onClick={() => onSelectContract(contract)}
            >
              <div className="flex items-center justify-between space-x-5">
                <img src={chukycanhan} alt="" className="w-8 h-8" />
                <div>
                  <div className="flex justify-between text-gray-60 text-xs font-medium mb-1">
                    <span>{contract.room}</span>
                    <span>{contract.tenant}</span>
                  </div>
                  <div className="font-semibold text-gray-20">
                    Hợp đồng thuê trọ{" "}
                    {contract.address.length > 30
                      ? `${contract.address.slice(0, 30)}...`
                      : contract.address}
                  </div>
                  <div className="text-[10px] text-gray-40 mt-1">
                    Ngày tạo: {contract.startDate}
                  </div>
                  <div className="text-[10px] text-gray-40">
                    Ngày hết hạn ký: {contract.endDate}
                  </div>
                </div>
              </div>
            </Card>
          ))}

        {activeTab === "active" && (
          <div>
            {/* Active contracts content */}
            <p>Danh sách các hợp đồng còn hiệu lực</p>
          </div>
        )}

        {activeTab === "expired" && (
          <div>
            {/* Expired contracts content */}
            <p>Danh sách các hợp đồng hết hiệu lực</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractsList;
