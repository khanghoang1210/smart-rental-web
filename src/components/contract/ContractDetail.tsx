// ContractDetail.tsx
import React from "react";
import { Button } from "antd";

interface Contract {
  id: string;
  room: string;
  address: string;
  tenant: string;
  startDate: string;
  endDate: string;
}

interface ContractDetailProps {
  contract?: Contract;
}

const ContractDetail: React.FC<ContractDetailProps> = ({ contract }) => {
  if (!contract) {
    return <div className="w-[50%] p-4">Chọn một hợp đồng để xem chi tiết</div>;
  }

  return (
    <div className="w-[50%] p-8">
      <div className="mt-8 mb-5 space-y-2">
        <h2 className="text-lg font-medium text-gray-20">
          Thông tin hợp đồng
        </h2>
        <h3 className="text-xs text-gray-40">13:49 17/09/2023</h3>
      </div>

      <div className="space-y-2 border border-blue-95 p-7 rounded-xl">
        <div className="pb-4 mb-6 flex justify-between border-b">
          <div className="text-gray-40 text-sm">Mã hợp đồng</div>
          <div className="font-medium text-gray-20">{contract.id}</div>
        </div>

        <div className="pb-4 mb-6 flex justify-between border-b">
          <div className="text-gray-40 text-sm">Loại hợp đồng</div>
          <div className="font-medium text-gray-20">Hợp đồng thuê trọ</div>
        </div>

        <div className="mb-6 mt-6 flex justify-between border-b pb-4">
          <div className="text-gray-500 text-sm">Địa chỉ</div>
          <div className="font-medium text-gray-20 text-right break-words w-2/3">
            {contract.address}
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
              <div className="font-medium text-gray-20">{contract.tenant}</div>

              <div className="font-medium text-gray-20">
                14:05:03 10/12/2023
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
              <div className="font-medium text-gray-20">{contract.tenant}</div>

              <div className="font-medium text-gray-20">
                14:05:03 10/12/2023
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-6 rounded-[100px] float-end font-medium px-10 py-6 text-blue-60 border border-blue-60">
        Ký hợp đồng
      </Button>
    </div>
  );
};

export default ContractDetail;
