import React from "react";
import payment from "../../assets/payment.png";

interface PaymentInfoProps {
  address: string;
  invoiceId: string;
  amount: string;
  paymentMethod: string;
  recipient: string;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  address,
  invoiceId,
  amount,
  paymentMethod,
  recipient,
}) => {
  return (
    <div className=" rounded-lg p-6 w-full md:w-[30%]">
      <h1 className="text-gray-20 font-semibold text-lg mb-6">Thanh toán hóa đơn</h1>
      <div className="flex bg-blue-98 space-y-2 flex-col rounded-lg p-4 items-center text-center mb-3">
        <img
          src={payment}
          alt="Payment Illustration"
          className="w-24 h-24 mb-4"
        />
        <p className="text-gray-700  font-medium">
          Bạn đang thanh toán hóa đơn cho phòng trọ
        </p>
        <p className="text-blue-60 break-words max-w-[300px] font-bold">
          {address}
        </p>
      </div>
      <div className="rounded-lg p-4">
        <ul className="space-y-2 border p-4 rounded-xl border-gray-60">
          <li className="flex justify-between font-semibold border-b py-3">
            <span className="text-gray-40">Mã hóa đơn</span>
            <span >{invoiceId}</span>
          </li>
          <li className="flex justify-between font-semibold border-b py-3">
            <span className="text-gray-40">Số tiền thanh toán</span>
            <span >{amount}</span>
          </li>
          <li className="flex justify-between font-semibold border-b py-3">
            <span className="text-gray-40">Phương thức thanh toán</span>
            <span>{paymentMethod}</span>
          </li>
          <li className="flex justify-between font-semibold py-3">
            <span className="text-gray-40">Người nhận</span>
            <span >{recipient}</span>
          </li>
        </ul>
      </div>
      <button className="bg-blue-60 text-[#fff] font-semibold text-xl rounded-[100px] w-full py-3 mt-3">
        Đã hoàn thành
      </button>
    </div>
  );
};

export default PaymentInfo;
