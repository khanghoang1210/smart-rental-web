import billImg from "../../../assets/bill.png";


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
    <div className="border rounded-lg shadow-md p-4 flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Thông tin hóa đơn</h2>
      <div className="flex justify-between">
        <span>Mã hóa đơn</span>
        <span>{bill.id}</span>
      </div>
      <div className="flex justify-between">
        <span>Tiền phòng</span>
        <span>{bill.rent}</span>
      </div>
      <div className="flex justify-between">
        <span>Điện</span>
        <span>{bill.electricity}</span>
      </div>
      <div className="flex justify-between">
        <span>Nước</span>
        <span>{bill.water}</span>
      </div>
      <div className="flex justify-between">
        <span>Internet</span>
        <span>{bill.internet}</span>
      </div>
      <div className="flex justify-between">
        <span>Tổng tiền</span>
        <span className="text-blue-600 font-semibold">{bill.total}</span>
      </div>
      {bill.statusCode === "not_paid" && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Nhắc thanh toán
        </button>
      )}
      {bill.statusCode === "pending_confirmation" && (
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Xác nhận đã hoàn thành
        </button>
      )}
    </div>
  );
};



export default BillDetails;
