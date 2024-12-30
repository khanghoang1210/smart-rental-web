import ContractService from "@/services/ContractService";
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
}

const ContractTemplate: React.FC<ContractTemplateProps> = ({
  formData,
  contractId,
}) => {
  const [cookies] = useCookies(["token"]);
  const defaultFormData = {
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
            addrressCreated:data.address_created || defaultFormData.addrressCreated,
            dateCreated: data.date_created || defaultFormData.dateCreated,
            landlordName: data.party_a.name || defaultFormData.landlordName,
            landlordBirthYear:
              data.party_a.dob?.split("-")[0] ||
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
          };

          console.log(formattedData);
          setContract(formattedData);
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    fetchContractData();
  }, [contractId, cookies.token]);

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
      <p className="mb-4">Hôm nay, tại <strong>{addrressCreated|| "...."} </strong> ngày <strong>{new Date(Number(dateCreated) * 1000).getDate()|| "...."}</strong> tháng <strong>{new Date(Number(dateCreated) * 1000).getMonth() + 1|| "...."}</strong> năm <strong>{new Date(Number(dateCreated) * 1000).getFullYear() || "...."}</strong></p>
    

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
          Giá thuê: <strong>{rentalPrice}</strong> đ/tháng
        </p>
        <p>
          Hình thức thanh toán: <strong>{paymentMethod}</strong>
        </p>
        <p>
          Tiền điện <strong>{electricityPrice}</strong> đ/kwh tính theo chỉ số
          công tơ, thanh toán vào cuối các tháng
        </p>
        <p>
          Tiền nước: <strong>{waterPrice}</strong> đ/người thanh toán vào đầu
          các tháng.
        </p>
        <p>
          Tiền đặt cọc: <strong>{depositAmount}</strong>
        </p>
        <p>
        Hợp đồng có giá trị kể từ ngày{" "}
        <strong>{new Date(Number(beginDate) * 1000).getDate()}</strong> tháng{" "}
        <strong>{new Date(Number(beginDate) * 1000).getMonth() + 1}</strong> năm{" "}
        <strong>{new Date(Number(beginDate) * 1000).getFullYear()}</strong> đến ngày{" "}
        <strong>{new Date(Number(endDate) * 1000).getDate()}</strong> tháng{" "}
        <strong>{new Date(Number(endDate) * 1000).getMonth() + 1}</strong> năm{" "}
        <strong>{new Date(Number(endDate) * 1000).getFullYear()}</strong>.
        </p>
      </div>

      {/* Contract Body */}
      <div className="space-y-3">
        <h2 className="font-bold">TRÁCH NHIỆM CỦA CÁC BÊN</h2>

        <h2 className="font-bold mt-6 mb-2">* Trách nhiệm của bên A:</h2>
        <p>{landlordResponsibilities}</p>
        {/* <p>- Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</p>
        <p>- Cung cấp nguồn điện, nước, wifi cho bên B sử dụng.</p> */}

        <h2 className="font-bold mt-6 mb-4">* Trách nhiệm của bên B:</h2>
        <p>{tenantResponsibilities}</p>
        {/* <p>- Thanh toán đầy đủ các khoản tiền theo đúng thỏa thuận.</p>
        <p>
          - Bảo quản các trang thiết bị và cơ sở vật chất của bên A trang bị cho
          ban đầu (làm hỏng phải sửa, mất phải đền).
        </p>
        <p>
          - Không được tự ý sửa chữa, cải tạo cơ sở vật chất khi chưa được sự
          đồng ý của bên A.
        </p>
        <p>- Giữ gìn vệ sinh trong và ngoài khuôn viên của phòng trọ.</p>
        <p>
          - Bên B phải chấp hành mọi quy định của pháp luật Nhà nước và quy định
          của địa phương.
        </p>
        <p>
          - Nếu bên B cho khách ở qua đêm thì phải báo và được sự đồng ý của chủ
          nhà đồng thời phải chịu trách nhiệm về các hành vi vi phạm pháp luật
          của khách trong thời gian ở lại.
        </p> */}

        <h2 className="font-bold mt-6 mb-4">TRÁCH NHIỆM CHUNG</h2>
        <p>{generalResponsibilities}</p>

        {/* <p>- Hai bên phải tạo điều kiện cho nhau thực hiện hợp đồng.</p>
        <p>
          - Trong thời gian hợp đồng còn hiệu lực nếu bên nào vi phạm các điều
          khoản đã thỏa thuận thì bên còn lại có quyền đơn phương chấm dứt hợp
          đồng; nếu sự vi phạm hợp đồng đó gây tổn thất cho bên bị vi phạm hợp
          đồng thì bên vi phạm hợp đồng phải bồi thường thiệt hại.
        </p>
        <p>
          - Một trong hai bên muốn chấm dứt hợp đồng trước thời hạn thì phải báo
          trước cho bên kia ít nhất 30 ngày và hai bên phải có sự thống nhất.
        </p>

        <p>- Bên A phải trả lại tiền đặt cọc cho bên B.</p>
        <p>
          - Bên nào vi phạm điều khoản chung thì phải chịu trách nhiệm trước
          pháp luật.
        </p>
        <p>
          - Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên
          giữ một bản.
        </p> */}
      </div>

      {/* Footer: Signatures */}
      <div className="mt-10 flex justify-between">
        <div className="text-center">
          <p>Bên cho thuê</p>
          <p>(Ký và ghi rõ họ tên)</p>
        </div>
        <div className="text-center">
          <p>Bên thuê</p>
          <p>(Ký và ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplate;
