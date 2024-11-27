import { Button } from "antd";
import success from "../../assets/success.png"
import { CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const PaymentSuccess = () => {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate("/")
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">

      <main className="text-center bg-white rounded-lg p-8 mt-8 w-[90%] md:w-[50%]">
        <div className="flex flex-col items-center">
          <img src={success} alt="success" className="w-12 h-12"/>
          <h1 className="text-2xl text-gray-20 font-semibold mt-4">Thanh toán thành công</h1>
          <p className="text-gray-20 mt-4">
            Cảm ơn bạn! Hóa đơn của bạn đã được thanh toán thành công.
            <br />
            Vui lòng chờ chủ nhà xác nhận để hoàn tất thủ tục.
          </p>
          <p className="text-gray-20 mt-2">
            Đừng quên thanh toán các hóa đơn tiếp theo đúng hạn để đảm bảo quyền
            lợi thuê trọ của bạn.
          </p>
          <p className="text-gray-20 mt-2">
            Bạn có thể xem lại chi tiết hóa đơn trong phần <b>Quản lý hóa đơn</b>{" "}
            của ứng dụng.
          </p>
          <Button onClick={handleBackHome} className="bg-[#fff] border-blue-60 text-blue-60 font-medium py-2 px-6 rounded-full mt-6">
            Về trang chủ
          </Button>
        </div>

        <div className="border border-blue-95 rounded-lg p-6 mt-8 text-left">
          <h2 className="text-lg text-gray-20 font-semibold mb-4">Chi tiết giao dịch</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-20">Trạng thái</span>
              <span className="text-gray-40 text-xs font-bold bg-gray-90 rounded-full px-3 py-1">Chờ xác nhận</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-20">Mã giao dịch</span>
              <span className="text-blue-20 font-bold flex items-center">
                P23911800011362
                <button className="ml-2 text-blue-600">
                <CopyOutlined />
                </button>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-20">Thời gian</span>
              <span className="text-gray-20 font-semibold">10:45 14/07/2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-20">Người giao dịch</span>
              <span className="text-gray-20 font-semibold">Lê Bảo Như</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-20">Tổng thanh toán</span>
              <span className="text-gray-20 font-semibold">2.000.000 đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-20">Phương thức</span>
              <span className="text-gray-20 font-semibold">Chuyển khoản</span>
            </div>
            <div  className="flex justify-between">
              <span className="text-gray-20">Minh chứng</span>
              <div className="border mt-2 rounded-lg overflow-hidden w-[70px]">
                <img
                  src={success}
                  alt="Minh chứng chuyển khoản"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
