import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { ContractRes } from "@/models/contract";
import {
  formatTimestampToDate,
  formatTimestampToDateTime,
} from "@/utils/converter";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

interface ContractDetailProps {
  contract?: ContractRes;
  status: number
}

const ContractDetail: React.FC<ContractDetailProps> = ({ contract, status }) => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate("/contract/preview", { state: { contractId: contract?.id } });
  };

  const handleDepositClick = () => {
    console.log(contract)
    navigate("/payment/info", { state: { contractID: contract?.id } });
  };
  

  if (!contract) {
    return <div className="w-[50%] p-4">Chọn một hợp đồng để xem chi tiết</div>;
  }

  console.log(contract)

  return (
    <div className="w-[50%] p-8">
      <div className="mt-8 mb-5 space-y-2">
        <h2 className="text-lg font-medium text-gray-20">Thông tin hợp đồng</h2>
        <h3 className="text-xs text-gray-40">
          Ngày tạo: {formatTimestampToDate(contract.created_at)}
        </h3>
      </div>

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
            <div className="text-gray-20 font-semibold text-sm mb-2">Bên B</div>
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
      ) :  (
        <Button
          onClick={handleSignClick}
          className="mt-6 rounded-[100px] float-end font-medium px-10 py-6 text-blue-60 border border-blue-60"
        >
          Xem hợp đồng
        </Button>
      )}
    </div>
  );
};

export default ContractDetail;
