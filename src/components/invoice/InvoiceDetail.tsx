import React, { useEffect, useState } from "react";
import clock from "../../assets/clock.svg";
import checked from "../../assets/checked.png";
import { Button, Spin } from "antd";
import { BillingRes, GetBillingByIDRes } from "@/models/billing";
import { UserInfo } from "@/store/slice/authSlice";
import { RoomRes } from "@/models/room";
import RoomService from "@/services/RoomService";
import UserService from "@/services/UserService";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PaymentService from "@/services/PaymentService";
import { format } from "path";
import { formatDateTime, toCurrencyFormat } from "@/utils/converter";
import BillingService from "@/services/BillingService";

interface InvoiceDetailsProps {
  bill: BillingRes | undefined;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ bill }) => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const token = cookies.token;
  const [billByID, setBillByID] = useState<GetBillingByIDRes>();
  const [isLoading, setIsLoading] = useState(false);
  const [tenant, setTenant] = useState<UserInfo>();
  const [room, setRoom] = useState<RoomRes>();

  console.log(bill);
  useEffect(() => {
    const roomService = new RoomService();
    const userService = new UserService();
    const fetchRoom = async () => {
      try {
        const roomRes = await roomService.getByID(token, bill?.room_id);
        const data = roomRes.data.data;
        setRoom(data.rooms);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };

    const fetchTenant = async () => {
      try {
        const res = await userService.getUserByID(bill?.tenant_id, token);
        const data = res.data.data;
        setTenant(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    if (bill?.room_id) fetchRoom();
    if (bill?.tenant_id) fetchTenant();
  }, []);

  useEffect(() => {
    const billService = new BillingService();
    const fetchBill = async () => {
      setIsLoading(true);
      try {
        const res = await billService.getByID(token, bill?.id);

        setBillByID(res.data.data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (bill) fetchBill();
  }, [bill]);
  const handlePaymentClick = async () => {
    try {
      const billingService = new PaymentService();
      const res = await billingService.getDetailInfo(token, "bill", bill?.id);

      console.log(bill);

      // Chuyển dữ liệu sang trang payment/info
      navigate("/payment/info", {
        state: { billID: bill?.id },
      });
    } catch (error) {
      if (error instanceof Error)
        toast.error("Không thể tải dữ liệu thanh toán");
    }
  };

  if (!bill) {
    return <div className="flex justify-center w-[50%] items-center"></div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-[950px] h-[300px]">
        <Spin size="large" className="ml-72" />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 w-[50%]">
      <div className="w-1/2 p-4 ">
        <div className="flex space-x-3">
          <h2 className="text-xl font-bold mb-2">Thông tin hoá đơn</h2>
          <div
            className={`flex space-x-2 items-center px-5 py-1 rounded-sm text-sm font-medium 
            ${
              bill?.status === 0 || bill?.status === 1
                ? "bg-gray-90 text-gray-40"
                : "bg-[#E9FFE8] text-[#3FA836]"
            } `}
          >
            {bill?.status === 0 || bill?.status === 1 ? (
              <img src={clock} className="w-5" alt="" />
            ) : (
              <img src={checked} className="w-3 h-3" alt="" />
            )}

            <p className="font-semibold">
              {bill?.status === 0
                ? "Chưa thanh toán"
                : bill?.status === 1
                  ? "Chờ xác nhận"
                  : "Đã thanh toán"}
            </p>
          </div>
        </div>

        <div className="text-[12px] text-gray-20 mb-6">
          Thời gian tạo: {formatDateTime(bill?.created_at)}
        </div>
        <ul className="border p-4 rounded-xl border-blue-80">
          <h1 className="text-gray-20 font-medium">Thông tin hóa đơn</h1>
          <li className="flex justify-between py-2 ml-8 font-semibold">
            <span className="text-gray-40">Mã hoá đơn</span>
            <span>{bill?.code}</span>
          </li>
          <li className="flex justify-between py-2 font-semibold ml-8">
            <span className="text-gray-40">Tiền phòng</span>
            <span>{toCurrencyFormat(billByID?.room_price)} đ</span>
          </li>
          <li className="flex justify-between py-4 font-semibold ml-8 items-start">
            <span className="text-gray-40">Điện</span>
            <span className="text-right text-black font-bold">
              <div className="text-sm text-gray-500 mt-1">
                <div>
                  số cũ: {bill?.old_electricity_index} - số mới:{" "}
                  {bill?.new_electricity_index}
                </div>
                <div>
                  {toCurrencyFormat(billByID?.electricity_cost)}đ x
                  {bill.new_electricity_index - bill.old_electricity_index}
                </div>
              </div>
              {toCurrencyFormat(bill.total_electricity_cost)} đ
            </span>
          </li>
          <li className="flex justify-between py-4 font-semibold ml-8 items-start">
            <span className="text-gray-40">Nước</span>
            <span className="text-right text-black font-bold text-gray-20">
              <div className="text-sm text-gray-500 mt-1">
                <div>
                  số cũ: {bill.old_water_index} - số mới: {bill.new_water_index}
                </div>
                <div>
                  {" "}
                  {toCurrencyFormat(billByID?.water_cost)}đ x
                  {bill.new_water_index - bill.old_water_index}
                </div>
              </div>
              {toCurrencyFormat(bill.total_water_cost)} đ
            </span>
          </li>

          <li className="flex justify-between py-2 font-semibold ml-8">
            <span className="text-gray-40">Internet</span>
            <span>{bill?.internet_cost}</span>
          </li>
          <li className="flex justify-between py-2 font-semibold ml-8">
            <span className="text-gray-40">Phí giữ xe</span>
            <span>{bill?.parking_fee}</span>
          </li>
          <li className="flex justify-between py-2 font-semibold ml-8">
            <span className="text-gray-40">Phí phát sinh</span>
            <span>{bill?.addition_fee}</span>
          </li>
        </ul>
      </div>
      <div className="w-1/2 p-4 mt-[76px] ">
        <ul className="border p-4 rounded-xl border-blue-80">
          <h1 className="text-gray-20 font-medium">Thông tin thanh toán</h1>
          <li className="flex justify-between py-2 ml-8 font-semibold">
            <span className="text-gray-40">Tên</span>
            <span>{billByID?.info.tenant_name}</span>
          </li>
          <li className="flex justify-between py-2 ml-8 font-semibold">
            <span className="text-gray-40">Số điện thoại</span>
            <span>{billByID?.info.phone_number}</span>
          </li>
          <li className="flex justify-between py-2 ml-8 font-semibold">
            <span className="text-gray-40">Phòng số</span>
            <span>{billByID?.info.room_number}</span>
          </li>
          <li className="flex items-start justify-between py-2 ml-8 font-semibold">
            <span className="text-gray-40">Địa chỉ</span>
            <span className="break-words text-right max-w-[200px]">
              {billByID?.info.address}
            </span>
          </li>

          <li className="flex justify-between ml-8 py-2 font-semibold">
            <span className="text-gray-40">Kỳ</span>
            <span>
              {billByID?.info.month}/{billByID?.info.year}
            </span>
          </li>
        </ul>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">Tổng tiền</span>
          <span className="text-2xl font-semibold text-blue-40">
            {toCurrencyFormat(bill?.total_amount)}đ
          </span>
        </div>
        {bill?.status === 0 && (
          <Button
            onClick={handlePaymentClick}
            className="w-full bg-blue-60 text-xl text-[#fff] py-6  mt-6 rounded-[100px]"
          >
            Thanh toán
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetails;
