import ContractService from "@/services/ContractService";
import { formatDate, toCurrencyFormat } from "@/utils/converter";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface ContractTemplateProps {
  contractId?: number;
  formData?: {
    addrressCreated?: string;
    dateCreated?: string;
    landlordName?: string;
    landlordBirthYear?: string;
    landlordID?: string;
    landlordIssueDate?: string;
    landlordIssuePlace?: string;
    landlordAddress?: string;
    landlordPhone?: string;
    tenantName?: string;
    tenantBirthYear?: string;
    tenantID?: string;
    tenantIssueDate?: string;
    tenantIssuePlace?: string;
    tenantAddress?: string;
    tenantPhone?: string;
    rentalPrice?: string;
    electricityPrice?: string;
    waterPrice?: string;
    depositAmount?: string;
    paymentMethod?: string;
    roomAddress?: string;
    contractDuration?: string;
    beginDate?: string;
    endDate?: string;
    landlordResponsibilities?: string;
    tenantResponsibilities?: string;
  };
  onContractUpdate?: (contract: any) => void;
}

const ContractTemplate: React.FC<ContractTemplateProps> = ({
  formData,
  contractId,
  onContractUpdate,
}) => {
  const [cookies] = useCookies(["token"]);
  const defaultFormData = {
    dateCreated: "",
    landlordName: "…………………………………….",
    landlordBirthYear: "………………..",
    landlordID: "…………",
    landlordIssueDate: "……………..",
    landlordIssuePlace: "……………",
    landlordAddress: "……………………………………………………………...",
    landlordPhone: "……………………………………………………………………",
    tenantName: "………………………………….",
    tenantBirthYear: "………………..",
    tenantID: "…………",
    tenantIssueDate: "……………..",
    tenantIssuePlace: "……………",
    tenantAddress: "………………………………………………..",
    tenantPhone: "……………………………………………………………………",
    roomAddress: "……………………………………………………………………",
    rentalPrice: "……………. ",
    electricityPrice: "……………. ",
    waterPrice: "……………. ",
    depositAmount: "……………. ",
    paymentMethod: "………………….",
    contractDuration: "………. ",
    beginDate: "………. ",
    endDate: "………. ",
    landlordResponsibilities: "…………………",
    tenantResponsibilities: "…………………",
    generalResponsibilities: "…………………",
    signatureA: "",
    signatureB: "",
    ...formData,
  };
  const [contract, setContract] = useState(defaultFormData);

  const {
    addrressCreated,
    dateCreated,
    landlordName,
    landlordBirthYear,
    landlordID,
    landlordIssueDate,
    landlordIssuePlace,
    landlordAddress,
    landlordPhone,
    tenantName,
    tenantBirthYear,
    tenantID,
    tenantIssueDate,
    tenantIssuePlace,
    tenantAddress,
    tenantPhone,
    roomAddress,
    rentalPrice,
    electricityPrice,
    waterPrice,
    depositAmount,
    paymentMethod,
    beginDate,
    endDate,
    generalResponsibilities,
    tenantResponsibilities,
    landlordResponsibilities,
    signatureA,
    signatureB,
  } = contract;

  useEffect(() => {
    const fetchContractData = async () => {
      const contractService = new ContractService();
      try {
        if (contractId) {
          const response = await contractService.getContractsByID(
            cookies.token,
            contractId
          );
          const data = response.data.data;

          const formattedData = {
            addrressCreated:
              data.address_created || defaultFormData.addrressCreated,
            dateCreated: data.date_created || defaultFormData.dateCreated,
            landlordName: data.party_a.name || defaultFormData.landlordName,
            landlordBirthYear:
              formatDate(data.party_a.dob) ||
              defaultFormData.landlordBirthYear,
            landlordID: data.party_a.cccd || defaultFormData.landlordID,
            landlordIssueDate:
              data.party_a.issue_date || defaultFormData.landlordIssueDate,
            landlordIssuePlace:
              data.party_a.issue_by || defaultFormData.landlordIssuePlace,
            landlordAddress:
              data.party_a.registered_place || defaultFormData.landlordAddress,
            landlordPhone: data.party_a.phone || defaultFormData.landlordPhone,

            tenantName: data.party_b.name || defaultFormData.tenantName,
            tenantBirthYear:
              data.party_b.dob?.split("-")[0] ||
              defaultFormData.tenantBirthYear,
            tenantID: data.party_b.cccd || defaultFormData.tenantID,
            tenantIssueDate:
              data.party_b.issue_date || defaultFormData.tenantIssueDate,
            tenantIssuePlace:
              data.party_b.issue_by || defaultFormData.tenantIssuePlace,
            tenantAddress:
              data.party_b.registered_place || defaultFormData.tenantAddress,
            tenantPhone: data.party_b.phone || defaultFormData.tenantPhone,

            roomAddress:
              data.room_address?.join(", ") || defaultFormData.roomAddress,
            rentalPrice: `${data.room_price}` || defaultFormData.rentalPrice,
            electricityPrice:
              `${data.electric_cost}` || defaultFormData.electricityPrice,
            waterPrice: `${data.water_cost}` || defaultFormData.waterPrice,
            depositAmount: `${data.deposit}` || defaultFormData.depositAmount,
            paymentMethod: data.method || defaultFormData.paymentMethod,
            contractDuration:
              `từ ${new Date(data.start_date * 1000).toLocaleDateString()} đến ${new Date(data.end_date * 1000).toLocaleDateString()}` ||
              defaultFormData.contractDuration,
            landlordResponsibilities:
              data.responsibility_a || defaultFormData.landlordResponsibilities,
            tenantResponsibilities:
              data.responsibility_b || defaultFormData.tenantResponsibilities,
            beginDate: data.start_date,
            endDate: data.end_date,
            generalResponsibilities:
              data.general || defaultFormData.generalResponsibilities,
            signatureA: data.signature_a,
            signatureB: data.signature_b,
          };

          console.log(formattedData);
          setContract(formattedData);
          onContractUpdate?.(data);
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    fetchContractData();
  }, [contractId, cookies.token]);

  if (!contract)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="p-20 bg-gray-50 border rounded-lg text-gray-700">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="uppercase font-bold">
          CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </p>
        <p className="italic">Độc lập - Tự do - Hạnh phúc</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-xl font-bold mb-4">
        HỢP ĐỒNG THUÊ PHÒNG TRỌ
      </h1>

      {/* Introduction */}
      <p className="mb-4">
        Hôm nay, tại <strong>{addrressCreated || "...."} </strong> ngày{" "}
        <strong>
          {new Date(Number(dateCreated) * 1000).getDate() || "...."}
        </strong>{" "}
        tháng{" "}
        <strong>
          {new Date(Number(dateCreated) * 1000).getMonth() + 1 || "...."}
        </strong>{" "}
        năm{" "}
        <strong>
          {new Date(Number(dateCreated) * 1000).getFullYear() || "...."}
        </strong>
      </p>

      {/* Section A: landlord Details */}
      <div className="mb-6 space-y-3">
        <h1 className="font-bold mb-4">Chúng tôi gồm:</h1>
        <h2 className="">1. Bên đại diện cho thuê phòng trọ (Bên A):</h2>
        <p>
          Ông/bà: <strong>{landlordName}</strong> Sinh ngày:{" "}
          <strong>{landlordBirthYear}</strong>
        </p>
        <p>
          Nơi đăng ký HK: <strong>{landlordAddress}</strong>
        </p>
        <p>
          CMND/CCCD số: <strong>{landlordID}</strong>, Ngày cấp:{" "}
          <strong>{landlordIssueDate}</strong>, Nơi cấp:{" "}
          <strong>{landlordIssuePlace}</strong>
        </p>
        <p>
          Số điện thoại: <strong>{landlordPhone}</strong>
        </p>
      </div>

      {/* Section B: tenant Details */}
      <div className="mb-6 space-y-3">
        <h2 className="">2. Bên thuê phòng trọ (Bên B):</h2>
        <p>
          Ông/bà: <strong>{tenantName}</strong> Sinh ngày:{" "}
          <strong>{tenantBirthYear}</strong>
        </p>
        <p>
          Nơi đăng ký HK thường trú: <strong>{tenantAddress}</strong>
        </p>
        <p>
          CMND/CCCD số: <strong>{tenantID}</strong>, Ngày cấp:{" "}
          <strong>{tenantIssueDate}</strong>, Nơi cấp:{" "}
          <strong>{tenantIssuePlace}</strong>
        </p>
        <p>
          Số điện thoại: <strong>{tenantPhone}</strong>
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <h1 className="font-bold">
          Sau khi bàn bạc trên tinh thần dân chủ, hai bên cùng có lợi, cùng
          thống nhất như sau:
        </h1>
        <p>
          Bên A đồng ý cho bên B thuê 01 phòng ở tại địa chỉ:{" "}
          <strong>{roomAddress}</strong>
        </p>
        <p>
          Giá thuê: <strong>{toCurrencyFormat(Number(rentalPrice))}</strong>{" "}
          đ/tháng
        </p>
        <p>
          Hình thức thanh toán: <strong>{paymentMethod}</strong>
        </p>
        <p>
          Tiền điện{" "}
          <strong>{toCurrencyFormat(Number(electricityPrice))}</strong> đ/kwh
          tính theo chỉ số công tơ, thanh toán vào cuối các tháng
        </p>
        <p>
          Tiền nước: <strong>{toCurrencyFormat(Number(waterPrice))}</strong>{" "}
          đ/người thanh toán vào đầu các tháng.
        </p>
        <p>
          Tiền đặt cọc:{" "}
          <strong>{toCurrencyFormat(Number(depositAmount))} đ</strong>
        </p>
        <p>
          Hợp đồng có giá trị kể từ ngày{" "}
          <strong>{new Date(Number(beginDate) * 1000).getDate()}</strong> tháng{" "}
          <strong>{new Date(Number(beginDate) * 1000).getMonth() + 1}</strong>{" "}
          năm{" "}
          <strong>{new Date(Number(beginDate) * 1000).getFullYear()}</strong>{" "}
          đến ngày <strong>{new Date(Number(endDate) * 1000).getDate()}</strong>{" "}
          tháng{" "}
          <strong>{new Date(Number(endDate) * 1000).getMonth() + 1}</strong> năm{" "}
          <strong>{new Date(Number(endDate) * 1000).getFullYear()}</strong>.
        </p>
      </div>

      {/* Contract Body */}
      <div className="space-y-3">
        <h2 className="font-bold">TRÁCH NHIỆM CỦA CÁC BÊN</h2>

        <h2 className="font-bold mt-6 mb-2">* Trách nhiệm của bên A:</h2>
        <div>
          {landlordResponsibilities &&
            landlordResponsibilities
              .split(/(?:\s*-\s*)/g) // Biểu thức chính quy để tách chuỗi
              .filter((item) => item.trim() !== "") // Lọc các phần tử rỗng
              .map((item, index) => (
                <p className="mb-2" key={index}>
                  - {item.trim()}
                </p>
              ))}
        </div>

        <h2 className="font-bold mt-6 mb-4">* Trách nhiệm của bên B:</h2>
        <div>
          {tenantResponsibilities &&
            tenantResponsibilities
              .split(/(?:\s*-\s*)/g) // Biểu thức chính quy để tách chuỗi
              .filter((item) => item.trim() !== "") // Lọc các phần tử rỗng
              .map((item, index) => (
                <p className="mb-2" key={index}>
                  - {item.trim()}
                </p>
              ))}
        </div>

        <h2 className="font-bold mt-6 mb-4">TRÁCH NHIỆM CHUNG</h2>
        <div>
          {generalResponsibilities &&
            generalResponsibilities
              .split(/(?:\s*-\s*)/g) // Biểu thức chính quy để tách chuỗi
              .filter((item) => item.trim() !== "") // Lọc các phần tử rỗng
              .map((item, index) => (
                <p className="mb-2" key={index}>
                  - {item.trim()}
                </p>
              ))}
        </div>
      </div>

      {/* Footer: Signatures */}
      <div className="mt-10 flex justify-between">
        <div className="text-center">
          <p>Bên cho thuê</p>
          <p>(Ký và ghi rõ họ tên)</p>
          {signatureA && (
            <img
              src={`data:image/png;base64,${signatureA}`}
              alt="Signature B"
              className="mt-4 max-w-[200px] max-h-[100px] object-contain"
            />
          )}
        </div>
        <div className="text-center">
          <p>Bên thuê</p>
          <p>(Ký và ghi rõ họ tên)</p>
          {signatureB && (
            <img
              src={`data:image/png;base64,${signatureB}`}
              alt="Signature B"
              className="mt-4 max-w-[200px] max-h-[100px] object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractTemplate;
