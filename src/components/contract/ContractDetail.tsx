import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { ContractRes } from "@/models/contract";
import {
  formatDateTime,
  formatTimestampToDate,
  formatTimestampToDateTime,
  toCurrencyFormat,
} from "@/utils/converter";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import PaymentService from "@/services/PaymentService";
import { useCookies } from "react-cookie";
import { PaymentRes } from "@/models/payment";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import clock from "../../assets/clock.svg";
import checked from "../../assets/checked.png";

interface ContractDetailProps {
  contract?: ContractRes;
  status: number;
}

const ContractDetail: React.FC<ContractDetailProps> = ({
  contract,
  status,
}) => {
  const { userInfo } = useAppStore();
  const [payment, setPayment] = useState<PaymentRes>();
  const [hasMatchingPayment, setHasMatchingPayment] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentService = new PaymentService();
      const res = await paymentService.getAll(token);
      const data = res.data.data;
      const matchingPayment = data.some(
        (payment: any) => payment.contract_id === contract?.id
      );
      setHasMatchingPayment(matchingPayment);
      const matchingPayments = data.filter(
        (payment: any) => payment.contract_id === contract?.id
      );

      setPayment(matchingPayments[0]);
    };
    if (contract) {
      fetchPayments();
    }
  }, [contract]);
  const handleSignClick = () => {
    navigate("/contract/preview", { state: { contractId: contract?.id } });
  };

  const handleConfirmPayment = async () => {
    if (!payment) return;
    setLoading(true);
    try {
      const paymentService = new PaymentService();
      await paymentService.confirmPayment(token, payment.id);
      toast.success("Xác nhận thanh toán thành công.");
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi xác nhận thanh toán.");
    } finally {
      setLoading(false);
    }
  };
  const handleDepositClick = () => {
    console.log(contract);
    navigate("/payment/info", { state: { contractID: contract?.id } });
  };

  if (!contract) {
    return <div className="w-[50%] p-4">Chọn một hợp đồng để xem chi tiết</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-[830px] h-[300px]">
        <Spin size="large" className="ml-72" />
      </div>
    );
  }

  console.log(contract);

  return (
    <div className="mt-6">
      {hasMatchingPayment && (
        <div>
          <div className="flex justify-between">
            <div className="flex space-x-3">
              <h2 className="text-xl font-bold mb-3">Thông tin hợp đồng</h2>
              <div
                className={`flex items-center space-x-2 ${payment?.status === 0 ? "bg-gray-90 text-gray-40" : " text-green bg-[#E9FFE8]"}  px-3 py-1 rounded-sm text-sm font-medium `}
              >
                <img
                  src={payment?.status == 0 ? clock : checked}
                  className="w-5"
                  alt=""
                />
                <p>
                  {payment?.status === 0 ? "Chờ xác nhận" : "Đã thanh toán"}
                </p>
              </div>
            </div>

            {payment?.status === 0 && (
              <div>
                <Button
                  onClick={handleConfirmPayment}
                  className="w-full bg-blue-60 text-base font-medium text-[#fff] p-5 rounded-[100px]"
                >
                  Xác nhận đã hoàn thành
                </Button>
              </div>
            )}
          </div>
          <div className="text-[12px] text-gray-20 mb-4">
            Thời gian tạo: {formatTimestampToDateTime(contract.created_at)}
          </div>
          <div className="border border-blue-95 rounded-lg p-6 mt-8 text-left">
            <h2 className="text-lg text-gray-20 font-semibold mb-4">
              Chi tiết giao dịch
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-20">Trạng thái</span>
                <span
                  className={` text-xs font-bold ${payment?.status === 0 ? "bg-gray-90 text-gray-40" : " text-green bg-[#E9FFE8]"} rounded-full px-3 py-1`}
                >
                  {payment?.status === 0 ? "Chờ xác nhận" : "Đã thanh toán"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Mã giao dịch</span>
                <span className="text-blue-20 font-bold flex items-center">
                  {payment?.code}
                  <button className="ml-2 text-blue-600">
                    <CopyOutlined />
                  </button>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Thời gian</span>
                <span className="text-gray-20 font-semibold">
                  {payment?.paid_time
                    ? formatDateTime(payment?.paid_time)
                    : "Chưa thanh toán"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Người giao dịch</span>
                <span className="text-gray-20 font-semibold">
                  {payment?.sender_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-20">Tổng thanh toán</span>
                <span className="text-gray-20 font-semibold">
                  {toCurrencyFormat(payment?.amount)}đ
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
                    src={payment?.evidence_image || ""}
                    alt="Minh chứng chuyển khoản"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-6">
        {!hasMatchingPayment && (
          <div className="mt-8 mb-5 space-y-2">
            <h2 className="text-lg font-medium text-gray-20">
              Thông tin hợp đồng
            </h2>
            <h3 className="text-xs text-gray-40">
              Ngày tạo: {formatTimestampToDate(contract.created_at)}
            </h3>
          </div>
        )}

        <div className="space-y-2 border border-blue-95 p-7 rounded-xl">
          <div className="pb-4 mb-6 flex justify-between border-b">
            <div className="text-gray-40 text-sm">Mã hợp đồng</div>
            <div className="font-medium text-gray-20">{contract.code}</div>
          </div>

          <div className="pb-4 mb-6 flex justify-between border-b">
            <div className="text-gray-40 text-sm">Loại hợp đồng</div>
            <div className="font-medium text-gray-20">Hợp đồng thuê trọ</div>
          </div>

          <div className="mb-6 mt-6 flex justify-between border-b pb-4">
            <div className="text-gray-20 text-sm">Địa chỉ</div>
            <div className="font-medium text-gray-20 text-right break-words w-2/3">
              {contract.room_address}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <div className="text-gray-20 text-sm font-semibold">Bên A</div>
            </div>

            <div className="pb-4 flex justify-between border-b">
              <div className="space-y-1">
                <div className="text-gray-40 text-sm">Tên người ký</div>
                <div className="text-gray-40 text-sm">Thời gian ký</div>
              </div>
              <div>
                <div className="font-medium text-gray-20">
                  {contract.landlord_name}
                </div>
                <div className="font-medium text-gray-20">
                  {contract.signature_time_a
                    ? formatTimestampToDateTime(contract.signature_time_a)
                    : "Chưa ký"}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <div className="text-gray-20 font-semibold text-sm mb-2">
                Bên B
              </div>
            </div>
            <div className="pb-4 flex justify-between">
              <div className="space-y-1">
                <div className="text-gray-40 text-sm">Tên người ký</div>
                <div className="text-gray-40 text-sm">Thời gian ký</div>
              </div>
              <div>
                <div className="font-medium text-gray-20">
                  {contract.tenant_name}
                </div>
                <div className="font-medium text-gray-20 text-end">
                  {contract.signature_time_b
                    ? formatTimestampToDateTime(contract.signature_time_b)
                    : "Chưa ký"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {userInfo?.role === 0 && !contract.signature_time_b && (
          <Button
            onClick={handleSignClick}
            className="mt-6 rounded-[100px] float-end font-medium px-10 py-6 text-blue-60 border border-blue-60"
          >
            Ký hợp đồng
          </Button>
        )}
        {userInfo?.role === 0 && contract.signature_time_b && status === 0 ? (
          <Button
            onClick={handleDepositClick}
            className="mt-6 rounded-[100px] float-end font-medium px-10 py-6 text-blue-60 border border-blue-60"
          >
            Đặt cọc
          </Button>
        ) : (
          <Button
            onClick={handleSignClick}
            className="mt-6 rounded-[100px] float-end font-medium px-10 py-6 text-blue-60 border border-blue-60"
          >
            Xem hợp đồng
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContractDetail;
