import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { BillingRes } from "@/models/billing";
import RoomService from "@/services/RoomService";
import { formatDateTime } from "@/utils/converter";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

interface InvoiceProps {
  bill: BillingRes;
  selected: boolean;
  onClick: () => void;
}

interface InvoiceListProps {
  invoices: InvoiceProps[];
  onSelect: (id: number) => void;
  onFilterChange: (status: 1 | 2) => void;
  currentFilter: number;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onSelect,
  onFilterChange,
  currentFilter,
}) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [rooms, setRooms] = useState<Record<number, string>>({}); // Lưu địa chỉ phòng

  useEffect(() => {
    const roomService = new RoomService();
    invoices.forEach(async (invoice) => {
      const roomId = invoice.bill.room_id;
      if (roomId && !rooms[roomId]) {
        try {
          const res = await roomService.getByID(token, roomId);
          setRooms((prev) => ({ ...prev, [roomId]: res.data.data.rooms.address }));
        } catch (error) {
          if (error instanceof Error) toast.error(error.message);
        }
      }
    });
  }, [invoices]);

  return (
    <div className="w-[24%] ml-64 p-4 mt-4">
      <h2 className="text-xl text-gray-20 font-bold mb-4">Hoá đơn thu tiền</h2>
      <div className="flex gap-4 mb-4">
        <Button
          className={`px-4 py-2 rounded-lg ${
            currentFilter === 1 ? "bg-blue-40 text-[#fff]" : "bg-gray-90 text-gray-40"
          }`}
          onClick={() => onFilterChange(1)}
        >
          Chưa thanh toán
        </Button>
        <Button
          className={`px-4 py-2 rounded-lg ${
            currentFilter === 2 ? "bg-blue-40 text-[#fff]" : "bg-gray-90 text-gray-40"
          }`}
          onClick={() => onFilterChange(2)}
        >
          Đã thanh toán
        </Button>
      </div>
      {invoices.map((invoice) => (
        <div
          key={invoice.bill.id}
          className={`p-4 border rounded-lg mb-4 cursor-pointer ${
            invoice.selected ? "bg-blue-98 border-blue-98" : "bg-gray-90"
          }`}
          onClick={() => onSelect(invoice.bill.id)}
        >
          <h1 className="font-semibold text-blue-40">
            Hóa đơn thu tiền kỳ tháng {invoice.bill.month}/{invoice.bill.year}
          </h1>
          <p className="text-[12px] text-gray-20 mt-2">
            Thời gian tạo: {formatDateTime(invoice.bill.created_at)}
          </p>
          <p className="text-[12px] text-red">
            Hạn thanh toán: {formatDateTime(invoice.bill.updated_at)}
          </p>
          <p className="mt-4 text-sm text-gray-20 font-semibold">
            {rooms[invoice.bill.room_id] || "Đang tải..."}
          </p>
          <p className="text-sm font-semibold text-gray-20 mt-4">
            {invoice.bill.total_amount.toLocaleString()} đ
          </p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
