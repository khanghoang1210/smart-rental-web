// ContractsList.tsx
import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import chukycanhan from "../../assets/chukycanhan.png";
import ContractService from "@/services/ContractService";
import { useCookies } from "react-cookie";
import { ContractRes } from "@/models/contract";
import { toast } from "sonner";
import { formatTimestampToDate } from "@/utils/converter";
import { useAppStore } from "@/store";

interface ContractsListProps {
  onSelectContract: (contract: ContractRes) => void;
}

const ContractsList: React.FC<ContractsListProps> = ({ onSelectContract }) => {
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(false); // Quản lý trạng thái tải dữ liệu
  const [error, ] = useState<string | null>(null); // Quản lý lỗi
  const { userInfo } = useAppStore();
  const [cookies] = useCookies(["token"]);
  const [contracts, setContracts] = useState<ContractRes[]>([]);
  const statusMap: Record<string, number> = {
    pending: 0,
    active: 1,
    expired: 2,
  };

  useEffect(() => {
    const fetchContractsByStatus = async () => {
      const contractService = new ContractService();
      try {
        setLoading(true);
        const response = await contractService.getContractsByStatus(
          cookies.token,
          statusMap[activeTab]
        );
        if (response.data.errCode === 204) {
          setContracts([]);
          return;
        }
        setContracts(response.data.data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContractsByStatus();
  }, [activeTab]);

  const renderContractCard = (contract: ContractRes) => (
    <Card
      key={contract.id}
      className="hover:bg-blue-98 hover:border-blue-98 focus:bg-blue-98 cursor-pointer rounded-lg"
      onClick={() => onSelectContract(contract)}
    >
      <div className="flex items-center justify-between space-x-5">
        <img src={chukycanhan} alt="Chữ ký cá nhân" className="w-8 h-8" />
        <div>
          <div className="flex justify-between text-gray-60 text-xs font-medium mb-1">
            <span>Phòng {contract.room_number}</span>
            <span>
              {userInfo?.role === 1
                ? contract.tenant_name
                : contract.landlord_name}
            </span>
          </div>
          <div className="font-semibold text-gray-20">
            Hợp đồng thuê trọ{" "}
            {contract.room_address.length > 30
              ? `${contract.room_address.slice(0, 30)}...`
              : contract.room_address}
          </div>
          <div className="text-[10px] text-gray-40 mt-1">
            Ngày tạo: {formatTimestampToDate(contract.created_at)}
          </div>
          <div className="text-[10px] text-red">
            Ngày hết hạn ký: {formatTimestampToDate(contract.expired_at)}
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-[30%] px-8 py-6 ml-24">
      <h1 className="text-gray-20 font-medium text-lg">Hợp đồng thuê trọ</h1>

      {/* Tabs */}
      <div className="flex space-x-4 my-4">
        {["pending", "active", "expired"].map((tab) => (
          <Button
            key={tab}
            className={`px-4 py-2 rounded-lg border-none ${
              activeTab === tab
                ? "bg-blue-40 text-[#FFF]"
                : "bg-gray-90 text-gray-40"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "pending"
              ? "Đang chờ"
              : tab === "active"
                ? "Còn hiệu lực"
                : "Hết hiệu lực"}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-gray-40">Đang tải...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : contracts?.length > 0 ? (
          contracts.map((contract) => renderContractCard(contract))
        ) : (
          <div className="text-gray-40">Không có hợp đồng nào</div>
        )}
      </div>
    </div>
  );
};

export default ContractsList;
