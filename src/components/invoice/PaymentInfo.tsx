import { Button } from "antd";
import React from "react";

interface PaymentInfoProps {
  name: string;
  phone: string;
  room: string;
  address: string;
  month: string;
  total: string;
}

const PaymentInfo: React.FC<{ info: PaymentInfoProps }> = ({ info }) => {
  return (
    <div className="w-[25%] p-4">
      <ul className="border p-4 rounded-xl border-blue-80">
        <h1 className="text-gray-20 font-medium">Thông tin thanh toán</h1>
        <li className="flex justify-between py-2 ml-8 font-semibold">
          <span className="text-gray-40">Tên</span>
          <span>{info.name}</span>
        </li>
        <li className="flex justify-between py-2 ml-8 font-semibold">
          <span className="text-gray-40">Số điện thoại</span>
          <span>{info.phone}</span>
        </li>
        <li className="flex justify-between py-2 ml-8 font-semibold">
          <span className="text-gray-40">Phòng số</span>
          <span>{info.room}</span>
        </li>
        <li className="flex items-start justify-between py-2 ml-8 font-semibold">
          <span className="text-gray-40">Địa chỉ</span>
          <span className="break-words text-right max-w-[200px]">
            {info.address}
          </span>
        </li>

        <li className="flex justify-between ml-8 py-2 font-semibold">
          <span className="text-gray-40">Kỳ</span>
          <span>{info.month}</span>
        </li>
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">Tổng tiền</span>
        <span className="text-2xl font-semibold text-blue-40">{info.total}</span>
      </div>
      <Button className="w-full bg-blue-60 text-xl text-[#fff] py-6  mt-6 rounded-[100px]">
        Thanh toán
      </Button>
    </div>
  );
};

export default PaymentInfo;
