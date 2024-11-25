import React from "react";
import clock from "../../assets/clock.svg";

interface InvoiceDetailsProps {
  id: string;
  roomPrice: string;
  electricity: string;
  water: string;
  internet: string;
  parking: string;
  other: string;
  total: string;
}

const InvoiceDetails: React.FC<{ details: InvoiceDetailsProps }> = ({
  details,
}) => {
  return (
    <div className="w-[25%] p-4 mt-16 ">
      <div className="flex space-x-3">
        <h2 className="text-xl font-bold mb-2">Thông tin hoá đơn</h2>
        <div className="flex items-center space-x-2 bg-gray-90 px-3 py-1 rounded-sm text-sm font-medium text-gray-40">
          <img src={clock} className="w-5" alt="" />
          <p>Chưa thanh toán</p>
        </div>
      </div>

      <div className="text-[12px] text-gray-20 mb-4">
        Thời gian tạo: 13:49 17/09/2023
      </div>
      <ul className="border p-4 rounded-xl border-blue-80">
        <h1 className="text-gray-20 font-medium">Thông tin hóa đơn</h1>
        <li className="flex justify-between py-2 ml-8 font-semibold">
          <span className="text-gray-40">Mã hoá đơn</span>
          <span>{details.id}</span>
        </li>
        <li className="flex justify-between py-2 font-semibold ml-8">
          <span className="text-gray-40">Tiền phòng</span>
          <span>{details.roomPrice}</span>
        </li>
        <li className="flex justify-between py-4 font-semibold ml-8 items-start">
          <span className="text-gray-40">Điện</span>
          <span className="text-right text-black font-bold">
            <div className="text-sm text-gray-500 mt-1">
              <div>số cũ: 234 - số mới: 254</div>
              <div>3,000đ x20</div>
            </div>
            {details.electricity}
          </span>
        </li>
        <li className="flex justify-between py-4 font-semibold ml-8 items-start">
          <span className="text-gray-40">Nước</span>
          <span className="text-right text-black font-bold">
            <div className="text-sm text-gray-500 mt-1">
              <div>số cũ: 23 - số mới: 28</div>
              <div>18,000đ x5</div>
            </div>
            {details.water}
          </span>
        </li>

        <li className="flex justify-between py-2 font-semibold ml-8">
          <span className="text-gray-40">Internet</span>
          <span>{details.internet}</span>
        </li>
        <li className="flex justify-between py-2 font-semibold ml-8">
          <span className="text-gray-40">Phí giữ xe</span>
          <span>{details.parking}</span>
        </li>
        <li className="flex justify-between py-2 font-semibold ml-8">
          <span className="text-gray-40">Phí phát sinh</span>
          <span>{details.other}</span>
        </li>
      </ul>
    </div>
  );
};

export default InvoiceDetails;
