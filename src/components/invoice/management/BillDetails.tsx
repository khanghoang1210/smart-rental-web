import React from "react";
import billImg from "../../../assets/bill.png";
import InvoiceDetails from "../InvoiceDetail";
import PaymentInfo from "../PaymentInfo";

const BillDetails = ({ bill }: any) => {
  if (!bill) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Hóa đơn chưa được chọn</p>
      </div>
    );
  }

  if (bill.statusCode === "not_created") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center text-gray-600">
        <img
          src={billImg}
          alt="Hóa đơn chưa được tạo"
          className="w-28 h-32 mb-6"
        />
        <p className="text-lg font-medium">Hóa đơn chưa được tạo</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4 space-y-6 w-[60%] ">
      {/* Nếu chưa thanh toán */}
      {bill.statusCode === "not_paid" && (
        <div className="flex space-x-8">
         <InvoiceDetails details={bill} />
         <PaymentInfo info={bill} />
        </div>
      )}

      {/* Nếu đã thanh toán */}
      {bill.statusCode === "pending_confirmation" && (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Mã giao dịch</h3>
              <p>{bill.transactionId}</p>
            </div>
            <div>
              <h3 className="font-medium">Thời gian thanh toán</h3>
              <p>{bill.paymentTime}</p>
            </div>
            <div>
              <h3 className="font-medium">Tên</h3>
              <p>{bill.name}</p>
            </div>
            <div>
              <h3 className="font-medium">Địa chỉ</h3>
              <p>{bill.address}</p>
            </div>
            <div>
              <h3 className="font-medium">Số điện thoại</h3>
              <p>{bill.phone}</p>
            </div>
            <div>
              <h3 className="font-medium">Tổng tiền</h3>
              <p className="text-blue-600 font-bold">
                {bill.total.toLocaleString()}đ
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium">Chứng minh giao dịch</h3>
            <img
              src={bill.proofImage}
              alt="Chứng minh giao dịch"
              className="w-full mt-2 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
