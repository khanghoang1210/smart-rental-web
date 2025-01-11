import { toCurrencyFormat } from "@/utils/converter";
import { Button } from "antd";
import React from "react";
import { toast } from "sonner";

interface QRPaymentProps {
  bank: string | undefined;
  logo: string | undefined;
  accountHolder: string | undefined;
  accountNumber: string | undefined;
  transferAmount: number | undefined;
  transferContent: string | undefined;
  qrUrl: string | undefined;
}

const QRPayment: React.FC<QRPaymentProps> = ({
  bank,
  logo,
  accountHolder,
  accountNumber,
  transferAmount,
  transferContent,
  qrUrl,
}) => {
  const copyToClipboard = (text: string | undefined) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Đã sao chép");
        })
        .catch((err) => {
          console.error("Sao chép thất bại:", err);
        });
    }
  };
  return (
    <div className="bg-gradient-to-b from-blue-40 to-blue-80 text-white rounded-[30px] py-[70px] mt-14 w-full md:w-[40%]">
      <div className="flex w-full space-x-10 items-end justify-center">
        <div className="w-[40%]">
          <h2 className="text-base mt-10 font-semibold text-[#fff] mb-8 text-center">
            Quét mã QR để thanh toán
          </h2>
          <div className="bg-[#FFF] p-3 w-full h-[275px] rounded-[20px]">
            <img
              src={qrUrl}
              alt="QR Code"
              className="w-full h-60 object-contain"
            />
          </div>
        </div>

        <div className="bg-[#fff] text-black rounded-[20px] p-4 w-[40%]">
          <ul className="space-y-2">
            <li className="flex flex-col py-2">
              <span className="text-gray-40 text-[12px]">Ngân hàng</span>
              <div className="flex items-center justify-between">
                <img src={logo} alt="logo" className="h-12 object-contain" />
                <span className="font-semibold text-gray-20">{bank}</span>
              </div>
            </li>
            <li className="flex flex-col py-2">
              <span className="text-gray-40 text-[12px]">Chủ tài khoản</span>
              <span className="font-medium text-gray-20">{accountHolder}</span>
            </li>
            <li className="flex justify-between py-2">
              <div className="flex flex-col">
                {" "}
                <span className="text-gray-40 text-[12px]">Số tài khoản</span>
                <span className="font-medium text-gray-20">
                  {accountNumber}
                </span>
              </div>
              <Button
                onClick={() => copyToClipboard(accountNumber)}
                className="bg-blue-60 px-3 py-1 text-xs rounded-[100px] text-[#FFF]"
              >
                Sao chép
              </Button>
            </li>
            <li className="flex justify-between py-2">
              <div className="flex flex-col">
                <span className="text-gray-40 text-[12px]">Số tiền</span>
                <span className="font-medium text-gray-20">
                  {toCurrencyFormat(transferAmount)}
                </span>
              </div>

              <Button
                onClick={() => copyToClipboard(transferAmount?.toString())}
                className="bg-blue-60 px-3 py-1 text-xs rounded-[100px] text-[#FFF]"
              >
                Sao chép
              </Button>
            </li>
            <li className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-gray-40 text-[12px]">
                  Nội dung chuyển khoản
                </span>
                <span className="font-medium text-gray-20">
                  {transferContent}
                </span>
              </div>

              <Button
                onClick={() => copyToClipboard(transferContent)}
                className="bg-blue-60 px-3 py-1 text-xs rounded-[100px] text-[#FFF]"
              >
                Sao chép
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <p className="bg-[#FFF0F1] border border-red text-red text-center mx-3 rounded-lg p-3 mt-8 text-[13px]">
        *Lưu ý: Bạn sẽ không được ghi nhận giao dịch nếu thiếu hoặc sai nội dung
        chuyển khoản
      </p>
    </div>
  );
};

export default QRPayment;
