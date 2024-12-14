import { BillingRes } from "@/models/billing";
import { RoomRes } from "@/models/room";
import RoomService from "@/services/RoomService";
import { formatDateTime } from "@/utils/converter";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

interface InvoiceProps {
  bill: BillingRes;
  selected: boolean;
  onClick: () => void;
}

const InvoiceList: React.FC<{
  invoices: InvoiceProps[];
  onSelect: (id: number) => void;
}> = ({ invoices, onSelect }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [rooms, setRooms] = useState<Record<number, RoomRes>>({}); // Lưu thông tin phòng theo room_id

  useEffect(() => {
    const roomService = new RoomService();

    // Hàm để fetch room theo room_id
    const fetchRoom = async (roomId: number) => {
      try {
        const roomRes = await roomService.getByID(token, roomId);
        const data = roomRes.data.data.rooms;
        setRooms((prev) => ({ ...prev, [roomId]: data })); // Lưu phòng vào state theo room_id
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    // Duyệt qua tất cả hóa đơn để fetch thông tin phòng nếu chưa có trong state
    invoices.forEach((invoice) => {
      const roomId = invoice.bill.room_id;
      if (roomId && !rooms[roomId]) {
        fetchRoom(roomId);
      }
    });
  }, [invoices]);

  return (
    <div className="w-[24%] ml-64 p-4 mt-4">
      <h2 className="text-xl text-gray-20 font-bold mb-4">Hoá đơn thu tiền</h2>
      <div className="flex gap-4 mb-4">
        <Button className="px-4 py-2 bg-blue-40 border-none text-[#fff] rounded-lg">
          Chưa thanh toán
        </Button>
        <Button className="px-4 py-2 bg-gray-90 border-none text-gray-40 rounded-lg">
          Đã thanh toán
        </Button>
      </div>
      {invoices.map((invoice) => {
        const room = rooms[invoice.bill.room_id]; // Lấy thông tin phòng theo room_id
        return (
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
              {room ? room.address : "Đang tải..."}
            </p>
            <p className="text-sm font-semibold text-gray-20 mt-4">
              {invoice.bill.addition_note}
            </p>
            <p className="text-sm font-semibold text-gray-20 mt-4">
              {invoice.bill.total_amount.toLocaleString()} đ
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceList;
