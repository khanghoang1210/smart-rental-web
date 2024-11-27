import Navbar from "@/components/home/Navbar";
import BillDetails from "@/components/invoice/management/BillDetails";
import BillList from "@/components/invoice/management/BillList";
import BillPeriodSelector from "@/components/invoice/management/BillPeriodSelector";
import { useState } from "react";

const BillManagementPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("10/2024");
  const [selectedBill, setSelectedBill] = useState(null);

  const periods = ["10/2024", "09/2024", "08/2024"];
  const bills = [
    {
      id: "HD221",
      room: "Phòng số 3",
      status: "Chưa được tạo",
      statusCode: "not_created", // New status code for logic handling
      statusColor: "text-red-600",
      amount: "2,500,000đ",
      rent: "2,500,000đ",
      electricity: "350,000đ",
      water: "90,000đ",
      internet: "60,000đ",
      total: "3,560,000đ",
      isSelected: false,
    },
    {
      id: "HD222",
      room: "Phòng số 4",
      status: "Chưa thanh toán",
      statusCode: "not_paid",
      statusColor: "text-yellow-600",
      amount: "2,560,000đ",
      rent: "2,500,000đ",
      electricity: "300,000đ",
      water: "100,000đ",
      internet: "60,000đ",
      total: "3,560,000đ",
      isSelected: false,
    },
    {
      id: "HD223",
      room: "Phòng số 5",
      status: "Đã thanh toán chờ chủ nhà xác nhận",
      statusCode: "pending_confirmation",
      statusColor: "text-blue-600",
      amount: "2,560,000đ",
      rent: "2,500,000đ",
      electricity: "350,000đ",
      water: "90,000đ",
      internet: "60,000đ",
      total: "3,560,000đ",
      isSelected: false,
    },
  ];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleBillSelect = (bill: any) => {
    setSelectedBill(bill);
  };

  return (
    <>
      <Navbar />
      <div className="flex ml-64 flex-col p-6">
        <h1 className="text-xl text-gray-20 font-bold mb-4">Hóa đơn thu tiền</h1>
        <BillPeriodSelector
          periods={periods}
          selectedPeriod={selectedPeriod}
          onChange={handlePeriodChange}
        />
        <div className="flex mt-6 space-x-6">
          <BillList
            bills={bills}
            selectedBillId={selectedBill?.id}
            onSelect={handleBillSelect}
          />
          <BillDetails bill={selectedBill} />
        </div>
      </div>
    </>
  );
};

export default BillManagementPage;
