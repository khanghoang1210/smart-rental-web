import { Button } from "antd";
import React from "react";

interface InvoiceProps {
  id: string;
  date: string;
  dueDate: string;
  address: string;
  room: string;
  total: string;
  selected: boolean;
  onClick: () => void;
}

const InvoiceList: React.FC<{
  invoices: InvoiceProps[];
  onSelect: (id: string) => void;
}> = ({ invoices, onSelect }) => {
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
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className={`p-4 border rounded-lg mb-4 cursor-pointer ${
            invoice.selected ? "bg-blue-98 border-blue-98" : "bg-gray-90"
          }`}
          onClick={() => onSelect(invoice.id)}
        >
          <h1 className="font-semibold text-blue-40">
            Hóa đơn thu tiền kỳ tháng 7/2024
          </h1>
          <p className="text-[12px] text-gray-20 mt-2">
            Thời gian tạo: {invoice.date}
          </p>
          <p className="text-[12px] text-red">
            Hạn thanh toán: {invoice.dueDate}
          </p>
          <p className="mt-4 text-sm text-gray-20 font-semibold">{invoice.address}</p>
          <p className="text-sm font-semibold text-gray-20 mt-4">{invoice.room}</p>
          <p className="text-sm font-semibold text-gray-20 mt-4">{invoice.total}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
