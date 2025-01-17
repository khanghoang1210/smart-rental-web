import { Button, Spin } from "antd";
import billImg from "../../../assets/bill.png";
import clock from "../../../assets/clock.svg";
import { CopyOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetBillingByIDRes } from "@/models/billing";
import { useCookies } from "react-cookie";
import BillingService from "@/services/BillingService";
import { toast } from "sonner";
import { formatDateTime, toCurrencyFormat } from "@/utils/converter";
import PaymentService from "@/services/PaymentService";
import { PaymentRes } from "@/models/payment";
import checked from "../../../assets/checked.png";

interface BillDetailsProps {
  billId: number | undefined;
}

const BillDetails: React.FC<BillDetailsProps> = ({ billId }) => {
  const [bill, setBill] = useState<GetBillingByIDRes | null>(null);
  const [payment, setPayment] = useState<PaymentRes>();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  // Fetch bill data when billId changes
  console.log(billId);
  useEffect(() => {
    const fetchBill = async () => {
      if (!billId) {
        setBill(null);
        return;
      }

      setLoading(true);
      try {
        const billingService = new BillingService();
        const response = await billingService.getByID(token, billId);
        setBill(response.data.data);
      } catch (error: any) {
        toast.error(error.message || "Lỗi khi lấy dữ liệu hóa đơn.");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!bill?.payment_id) return;

      setLoading(true);
      try {
        const paymentService = new PaymentService();
        const response = await paymentService.getById(token, bill.payment_id);
        setPayment(response.data.data);
      } catch (error: any) {
        toast.error(error.message || "Lỗi khi lấy dữ liệu hóa đơn.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [bill?.payment_id]);
  const handleConfirmPayment = async () => {
    if (!billId) return;
    setLoading(true);
    try {
      const paymentService = new PaymentService();
      await paymentService.confirmPayment(token, bill?.payment_id);
      toast.success("Xác nhận thanh toán thành công.");
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi xác nhận thanh toán.");
    } finally {
      setLoading(false);
    }
  };
  console.log(bill);
  if (!billId) {
    return <div className="flex justify-center w-[830px] items-center"></div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-[830px] h-[300px]">
        <Spin size="large" className="ml-72" />
      </div>
    );
  }

  if (bill?.status === -1 || !bill) {
    return (
      <div className="flex flex-col  items-center justify-center w-[830px] text-center text-gray-40">
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
    <div className="rounded-lg mt-12 px-4 space-y-6">
      {/* Nếu chưa thanh toán */}
      {bill?.status === 0 && (
        <div className="flex space-x-8 w-[900px]">
          <div className="w-[60%] p-4 ">
            <div className="flex space-x-3">
              <h2 className="text-xl font-bold mb-3">Thông tin hoá đơn</h2>
              <div className="flex items-center space-x-2 bg-gray-90 px-3 py-1 rounded-sm text-sm font-medium text-gray-40">
                <img src={clock} className="w-5" alt="" />
                <p>Chưa thanh toán</p>
              </div>
            </div>

            <div className="text-[12px] text-gray-20 mb-4">
              Thời gian tạo: {formatDateTime(bill.created_at)}
            </div>
            <ul className="border p-4 rounded-xl border-blue-80">
              <h1 className="text-gray-20 font-semibold">Thông tin hóa đơn</h1>
              <li className="flex justify-between py-2 ml-8 font-semibold">
                <span className="text-gray-40">Mã hoá đơn</span>
                <span className="text-gray-20">{bill.code}</span>
              </li>
              <li className="flex justify-between py-2 font-semibold ml-8">
                <span className="text-gray-40">Tiền phòng</span>
                <span className="text-gray-20">{bill.room_price}</span>
              </li>
              <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                <span className="text-gray-40">Điện</span>
                <span className="text-right text-black font-bold text-gray-20">
                  <div className="text-sm text-gray-500 mt-1">
                    <div>
                      số cũ: {bill.old_electricity_index} - số mới:{" "}
                      {bill.new_electricity_index}
                    </div>
                    <div>
                      {" "}
                      {toCurrencyFormat(bill.electricity_cost)}đ x
                      {bill.new_electricity_index - bill.old_electricity_index}
                    </div>
                  </div>
                  {toCurrencyFormat(
                    bill.electricity_cost *
                      (bill.new_electricity_index - bill.old_electricity_index)
                  )}{" "}
                  đ
                </span>
              </li>
              <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                <span className="text-gray-40">Nước</span>
                <span className="text-right text-black font-bold text-gray-20">
                  <div className="text-sm text-gray-500 mt-1">
                    <div>
                      số cũ: {bill.old_water_index} - số mới:{" "}
                      {bill.new_water_index}
                    </div>
                    <div>
                      {" "}
                      {toCurrencyFormat(bill.water_cost)}đ x
                      {bill.new_water_index - bill.old_water_index}
                    </div>
                  </div>
                  {toCurrencyFormat(
                    bill.water_cost *
                      (bill.new_water_index - bill.old_water_index)
                  )}{" "}
                  đ
                </span>
              </li>

              <li className="flex justify-between py-2 font-semibold ml-8">
                <span className="text-gray-40">Internet</span>
                <span className="text-gray-20">{bill.internet_cost}</span>
              </li>
              <li className="flex justify-between py-2 font-semibold ml-8">
                <span className="text-gray-40">Phí giữ xe</span>
                <span className="text-gray-20">{bill.parking_fee}</span>
              </li>
              <li className="flex justify-between py-2 font-semibold ml-8">
                <span className="text-gray-40">Phí phát sinh</span>
                <span className="text-gray-20">{bill.addition_fee}</span>
              </li>
            </ul>
          </div>
          <div className="w-[50%]">
            <ul className="border p-4 rounded-xl border-blue-80 mt-[88px]">
              <h1 className="text-gray-20 font-semibold">
                Thông tin thanh toán
              </h1>
              <li className="flex justify-between py-2 ml-8 font-semibold">
                <span className="text-gray-40">Tên</span>
                <span className="text-gray-20">{bill.info.tenant_name}</span>
              </li>
              <li className="flex justify-between py-2 ml-8 font-semibold">
                <span className="text-gray-40">Số điện thoại</span>
                <span className="text-gray-20">{bill.info.phone_number}</span>
              </li>
              <li className="flex justify-between py-2 ml-8 font-semibold">
                <span className="text-gray-40">Phòng số</span>
                <span className="text-gray-20">{bill.info.room_number}</span>
              </li>
              <li className="flex items-start justify-between py-2 ml-8 font-semibold">
                <span className="text-gray-40">Địa chỉ</span>
                <span className="break-words text-right max-w-[200px] text-gray-20">
                  {bill.info.address}
                </span>
              </li>

              <li className="flex justify-between ml-8 py-2 font-semibold">
                <span className="text-gray-40">Kỳ</span>
                <span className="text-gray-20">
                  Tháng {bill.info.month}/{bill.info.year}
                </span>
              </li>
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Tổng tiền</span>
              <span className="text-2xl font-semibold text-blue-40">
                {toCurrencyFormat(bill.total_amount)}đ
              </span>
            </div>
            <Button className="w-full text-blue-60 text-base font-semibold border-2 border-blue-60 py-6  mt-6 rounded-[100px]">
              Nhắc thanh toán
            </Button>
          </div>
        </div>
      )}

      {/* Nếu đã thanh toán */}
      {bill?.status === 1 && payment && (
        <div className="w-[800px]">
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <h2 className="text-xl font-bold mb-3">Thông tin hoá đơn</h2>
              <div className="flex items-center space-x-2 bg-gray-90 px-3 py-1 rounded-sm text-sm font-medium text-gray-40">
                <img src={clock} className="w-5" alt="" />
                <p>Chờ xác nhận</p>
              </div>
            </div>

            <div>
              <Button
                onClick={handleConfirmPayment}
                className="w-full bg-blue-60 text-base font-medium text-[#fff] p-5 rounded-[100px]"
              >
                Xác nhận đã hoàn thành
              </Button>
            </div>
          </div>
          <div className="text-[12px] text-gray-20 mb-4">
            Thời gian tạo: {formatDateTime(bill.created_at)}
          </div>
          <div className="border border-blue-95 rounded-lg p-6 mt-8 text-left">
            <h2 className="text-lg text-gray-20 font-semibold mb-4">
              Chi tiết giao dịch
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-20">Trạng thái</span>
                <span className="text-gray-40 text-xs font-bold bg-gray-90 rounded-full px-3 py-1">
                  Chờ xác nhận
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Mã giao dịch</span>
                <span className="text-blue-20 font-bold flex items-center">
                  {payment.code}
                  <button className="ml-2 text-blue-600">
                    <CopyOutlined />
                  </button>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Thời gian</span>
                <span className="text-gray-20 font-semibold">
                  {payment.paid_time
                    ? formatDateTime(payment.paid_time)
                    : "Chưa thanh toán"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Người giao dịch</span>
                <span className="text-gray-20 font-semibold">
                  {payment.sender_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Tổng thanh toán</span>
                <span className="text-gray-20 font-semibold">
                  {toCurrencyFormat(payment.amount)}đ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Phương thức</span>
                <span className="text-gray-20 font-semibold">Chuyển khoản</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Minh chứng</span>
                <div className="border mt-2 rounded-lg overflow-hidden w-[70px]">
                  <img
                    src={payment.evidence_image || ""}
                    alt="Minh chứng chuyển khoản"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-16 mt-6">
            <div className="w-[50%]">
              <ul className="border p-4 rounded-xl border-blue-80">
                <h1 className="text-gray-20 font-semibold">
                  Thông tin hóa đơn
                </h1>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Mã hoá đơn</span>
                  <span className="text-gray-20">{bill.id}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Tiền phòng</span>
                  <span className="text-gray-20">{bill.room_price}</span>
                </li>
                <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                  <span className="text-gray-40">Điện</span>
                  <span className="text-right text-black font-bold text-gray-20">
                    <div className="text-sm text-gray-500 mt-1">
                      <div>
                        số cũ: {bill.old_electricity_index} - số mới:{" "}
                        {bill.new_electricity_index}
                      </div>
                      <div>
                        {" "}
                        {toCurrencyFormat(bill.electricity_cost)}đ x
                        {bill.new_electricity_index -
                          bill.old_electricity_index}
                      </div>
                    </div>
                    {toCurrencyFormat(
                      bill.electricity_cost *
                        (bill.new_electricity_index -
                          bill.old_electricity_index)
                    )}{" "}
                    đ
                  </span>
                </li>
                <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                  <span className="text-gray-40">Nước</span>
                  <span className="text-right text-black font-bold text-gray-20">
                    <div className="text-sm text-gray-500 mt-1">
                      <div>
                        số cũ: {bill.old_water_index} - số mới:{" "}
                        {bill.new_water_index}
                      </div>
                      <div>
                        {" "}
                        {toCurrencyFormat(bill.water_cost)}đ x
                        {bill.new_water_index - bill.old_water_index}
                      </div>
                    </div>
                    {toCurrencyFormat(
                      bill.water_cost *
                        (bill.new_water_index - bill.old_water_index)
                    )}{" "}
                    đ
                  </span>
                </li>

                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Internet</span>
                  <span className="text-gray-20">{bill.internet_cost}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Phí giữ xe</span>
                  <span className="text-gray-20">{bill.parking_fee}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Phí phát sinh</span>
                  <span className="text-gray-20">{bill.addition_fee}</span>
                </li>
              </ul>
            </div>
            <div className="w-[50%]">
              <ul className="border p-4 rounded-xl border-blue-80">
                <h1 className="text-gray-20 font-semibold">
                  Thông tin thanh toán
                </h1>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Tên</span>
                  <span className="text-gray-20">{bill.info.tenant_name}</span>
                </li>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Số điện thoại</span>
                  <span className="text-gray-20">{bill.info.phone_number}</span>
                </li>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Phòng số</span>
                  <span className="text-gray-20">{bill.info.room_number}</span>
                </li>
                <li className="flex items-start justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Địa chỉ</span>
                  <span className="break-words text-right max-w-[200px] text-gray-20">
                    {bill.info.address}
                  </span>
                </li>

                <li className="flex justify-between ml-8 py-2 font-semibold">
                  <span className="text-gray-40">Kỳ</span>
                  <span className="text-gray-20">
                    Tháng {bill.info.month}/{bill.info.year}
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Tổng tiền</span>
                <span className="text-2xl font-semibold text-blue-40">
                  {toCurrencyFormat(bill.total_amount)}đ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {bill.status === 2 && (
        <div className="w-[900px]">
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <h2 className="text-xl font-bold mb-3">Thông tin hoá đơn</h2>
              <div className="flex items-center space-x-2 bg-[#E9FFE8] px-3 py-1 rounded-sm text-sm font-medium text-green">
                <img src={checked} className="w-5" alt="" />
                <p>Đã thanh toán vào lúc {formatDateTime(bill.created_at)}</p>
              </div>
            </div>
          </div>
          <div className="text-[12px] text-gray-20 mb-4">
            Thời gian tạo: {formatDateTime(bill.created_at)}
          </div>

          <div className="flex gap-16 mt-6">
            <div className="w-[50%]">
              <ul className="border p-4 rounded-xl border-blue-80">
                <h1 className="text-gray-20 font-semibold">
                  Thông tin hóa đơn
                </h1>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Mã hoá đơn</span>
                  <span className="text-gray-20">{bill.id}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Tiền phòng</span>
                  <span className="text-gray-20">
                    {toCurrencyFormat(bill.room_price)}
                  </span>
                </li>
                <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                  <span className="text-gray-40">Điện</span>
                  <span className="text-right text-black font-bold text-gray-20">
                    <div className="text-sm text-gray-500 mt-1">
                      <div>
                        số cũ: {bill.old_electricity_index} - số mới:{" "}
                        {bill.new_electricity_index}
                      </div>
                      <div>
                        {" "}
                        {toCurrencyFormat(bill.electricity_cost)}đ x
                        {bill.new_electricity_index -
                          bill.old_electricity_index}
                      </div>
                    </div>
                    {toCurrencyFormat(
                      bill.electricity_cost *
                        (bill.new_electricity_index -
                          bill.old_electricity_index)
                    )}{" "}
                    đ
                  </span>
                </li>
                <li className="flex justify-between py-4 font-semibold ml-8 items-start">
                  <span className="text-gray-40">Nước</span>
                  <span className="text-right text-black font-bold text-gray-20">
                    <div className="text-sm text-gray-500 mt-1">
                      <div>
                        số cũ: {bill.old_water_index} - số mới:{" "}
                        {bill.new_water_index}
                      </div>
                      <div>
                        {" "}
                        {toCurrencyFormat(bill.water_cost)}đ x
                        {bill.new_water_index - bill.old_water_index}
                      </div>
                    </div>
                    {toCurrencyFormat(
                      bill.water_cost *
                        (bill.new_water_index - bill.old_water_index)
                    )}{" "}
                    đ
                  </span>
                </li>

                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Internet</span>
                  <span className="text-gray-20">{bill.internet_cost}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Phí giữ xe</span>
                  <span className="text-gray-20">{bill.parking_fee}</span>
                </li>
                <li className="flex justify-between py-2 font-semibold ml-8">
                  <span className="text-gray-40">Phí phát sinh</span>
                  <span className="text-gray-20">{bill.addition_fee}</span>
                </li>
              </ul>
            </div>
            <div className="w-[50%]">
              <ul className="border p-4 rounded-xl border-blue-80">
                <h1 className="text-gray-20 font-semibold">
                  Thông tin thanh toán
                </h1>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Tên</span>
                  <span className="text-gray-20">{bill.info.tenant_name}</span>
                </li>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Số điện thoại</span>
                  <span className="text-gray-20">{bill.info.phone_number}</span>
                </li>
                <li className="flex justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Phòng số</span>
                  <span className="text-gray-20">{bill.info.room_number}</span>
                </li>
                <li className="flex items-start justify-between py-2 ml-8 font-semibold">
                  <span className="text-gray-40">Địa chỉ</span>
                  <span className="break-words text-right max-w-[200px] text-gray-20">
                    {bill.info.address}
                  </span>
                </li>

                <li className="flex justify-between ml-8 py-2 font-semibold">
                  <span className="text-gray-40">Kỳ</span>
                  <span className="text-gray-20">
                    Tháng {bill.info.month}/{bill.info.year}
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Tổng tiền</span>
                <span className="text-2xl font-semibold text-blue-40">
                  {toCurrencyFormat(bill.total_amount)}đ
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
