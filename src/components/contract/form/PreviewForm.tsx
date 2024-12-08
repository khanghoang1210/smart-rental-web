interface ContractTemplateProps {
  formData: {
    lessorName?: string;
    lessorBirthYear?: string;
    lessorID?: string;
    lessorIssueDate?: string;
    lessorIssuePlace?: string;
    lessorAddress?: string;
    lessorPhone?: string;
    lesseeName?: string;
    lesseeBirthYear?: string;
    lesseeID?: string;
    lesseeIssueDate?: string;
    lesseeIssuePlace?: string;
    lesseeAddress?: string;
    lesseePhone?: string;
    rentalPrice?: string;
    paymentMethod?: string;
    contractDuration?: string;
    handoverDate?: string;
    lessorResponsibilities?: string;
    lesseeResponsibilities?: string;
  };
}

const ContractTemplate = ({ formData }: ContractTemplateProps) => {
  const {
    lessorName = "…………………………………….",
    lessorBirthYear = "………………..",
    lessorID = "…………",
    lessorIssueDate = "……………..",
    lessorIssuePlace = "……………",
    lessorAddress = "……………………………………………………………………",
    lessorPhone = "……………………………………………………………………",
    lesseeName = "………………………………….",
    lesseeBirthYear = "………………..",
    lesseeID = "…………",
    lesseeIssueDate = "……………..",
    lesseeIssuePlace = "……………",
    lesseeAddress = "……………………………………………………………………",
    lesseePhone = "……………………………………………………………………",
    rentalPrice = "……………. ",
    paymentMethod = "………………….",
    contractDuration = "………. ",
    handoverDate = "………. ",
    lessorResponsibilities = "…………………",
    lesseeResponsibilities = "…………………",
  } = formData;

  return (
    <div className="p-20 bg-gray-50 border rounded-lg text-gray-700">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="uppercase font-bold">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
        <p className="italic">Độc lập - Tự do - Hạnh phúc</p>
      </div>

      {/* Title */}
      <h1 className="text-center text-xl font-bold mb-4">HỢP ĐỒNG THUÊ NHÀ TRỌ</h1>
      <p className="text-center mb-6">(Số: ……………./HĐTNO)</p>

      {/* Introduction */}
      <p className="mb-4">
        Hôm nay, ngày …. tháng …. năm ….., tại ……………………….., chúng tôi gồm có:
      </p>

      {/* Section A: Lessor Details */}
      <div className="mb-6">
        <h2 className="font-bold">BÊN CHO THUÊ (BÊN A):</h2>
        <p>Ông/bà: {lessorName}</p>
        <p>Năm sinh: {lessorBirthYear}</p>
        <p>
          CMND/CCCD số: {lessorID}, Ngày cấp: {lessorIssueDate}, Nơi cấp: {lessorIssuePlace}
        </p>
        <p>Hộ khẩu: {lessorAddress}</p>
        <p>Điện thoại: {lessorPhone}</p>
      </div>

      {/* Section B: Lessee Details */}
      <div className="mb-6">
        <h2 className="font-bold">BÊN THUÊ (BÊN B):</h2>
        <p>Ông/bà: {lesseeName}</p>
        <p>Năm sinh: {lesseeBirthYear}</p>
        <p>
          CMND/CCCD số: {lesseeID}, Ngày cấp: {lesseeIssueDate}, Nơi cấp: {lesseeIssuePlace}
        </p>
        <p>Hộ khẩu: {lesseeAddress}</p>
        <p>Điện thoại: {lesseePhone}</p>
      </div>

      {/* Contract Body */}
      <h2 className="font-bold mb-4">ĐIỀU 1. ĐỐI TƯỢNG CỦA HỢP ĐỒNG</h2>
      <p>
        Bên A đồng ý cho Bên B thuê căn hộ (căn nhà) tại địa chỉ ….. thuộc sở hữu hợp pháp của Bên A.
      </p>
      <p>
        Bao gồm: Ban công, hệ thống điện nước đã sẵn sàng sử dụng được, các bóng
        đèn trong các phòng và hệ thống công tắc, các bồn rửa mặt, bồn vệ sinh
        đều sử dụng tốt.
      </p>

      <h2 className="font-bold mt-6 mb-4">
        ĐIỀU 2. GIÁ CHO THUÊ NHÀ Ở VÀ PHƯƠNG THỨC THANH TOÁN
      </h2>
      <p>Giá cho thuê nhà ở là {rentalPrice} đồng/tháng.</p>
      <p>Phương thức thanh toán: {paymentMethod}.</p>

      <h2 className="font-bold mt-6 mb-4">
        ĐIỀU 3. THỜI HẠN THUÊ VÀ THỜI ĐIỂM GIAO NHẬN NHÀ Ở
      </h2>
      <p>
        Thời hạn thuê là {contractDuration} năm kể từ ngày… tháng … năm ….. Thời
        điểm giao nhận nhà là {handoverDate}.
      </p>

      <h2 className="font-bold mt-6 mb-4">
        ĐIỀU 4. NGHĨA VỤ VÀ QUYỀN CỦA BÊN A
      </h2>
      <p>{lessorResponsibilities}</p>

      <h2 className="font-bold mt-6 mb-4">
        ĐIỀU 5. NGHĨA VỤ VÀ QUYỀN CỦA BÊN B
      </h2>
      <p>{lesseeResponsibilities}</p>

      <h2 className="font-bold mt-6 mb-4">ĐIỀU 9. CAM KẾT CỦA CÁC BÊN</h2>
      <p>Bên A và Bên B cam kết thực hiện đúng thỏa thuận trong hợp đồng.</p>

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
