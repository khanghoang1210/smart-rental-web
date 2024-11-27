import React, { useEffect, useRef, useState } from "react";
import payment from "../../assets/payment.png";
import { Upload } from "antd";
import digital from "../../assets/digital.svg";

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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCompleteClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupVisible(false);
      }
    };

    if (isPopupVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className=" rounded-lg p-6 w-full md:w-[30%]">
      <h1 className="text-gray-20 font-semibold text-lg mb-6">
        Thanh toán hóa đơn
      </h1>
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
            <span>{invoiceId}</span>
          </li>
          <li className="flex justify-between font-semibold border-b py-3">
            <span className="text-gray-40">Số tiền thanh toán</span>
            <span>{amount}</span>
          </li>
          <li className="flex justify-between font-semibold border-b py-3">
            <span className="text-gray-40">Phương thức thanh toán</span>
            <span>{paymentMethod}</span>
          </li>
          <li className="flex justify-between font-semibold py-3">
            <span className="text-gray-40">Người nhận</span>
            <span>{recipient}</span>
          </li>
        </ul>
      </div>
      <button
        onClick={handleCompleteClick}
        className="bg-blue-60 text-[#fff] font-semibold text-xl rounded-[100px] w-full py-3 mt-3"
      >
        Đã hoàn thành
      </button>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#000] bg-opacity-50 z-50">
          <div
            className="bg-[#fff] rounded-lg p-8 w-[70%] md:w-[30%] h-[500px] "
            ref={popupRef}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-20">
              Tải minh chứng
            </h2>
            <p className="text-gray-40 mb-3 text-center">
              HÌNH ẢNH CHUYỂN KHOẢN THÀNH CÔNG
            </p>
            <div className=" p-4 rounded-lg h-72 mb-4">
              <Upload.Dragger className=" border-dashed">
                <div className="ant-upload-drag-icon flex justify-center mb-3">
                  <img src={digital} alt="" className="w-8 h-8" />
                </div>
                <p className="ant-upload-text text-blue-60">
                  Tải ảnh từ thư viện
                </p>
              </Upload.Dragger>
            </div>
            <button
              className="bg-[#fff] w-[90%] ml-5 border-blue-60 border text-blue-60 px-6 py-2 rounded-full font-semibold"
              onClick={handleClosePopup}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;