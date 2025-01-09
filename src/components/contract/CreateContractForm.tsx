import { useEffect, useRef, useState } from "react";
import { Button, Modal, Spin } from "antd";
import ContractInfoForm from "./form/ContractInfoForm";
import ResponsibityForm from "./form/ResponsibityForm";
import PreviewForm from "./form/PreviewForm";
import { useLocation } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import ContractService from "@/services/ContractService";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { CreateContractRequest } from "@/models/contract";
import { useAppStore } from "@/store";

const CreateContractForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const  {userInfo} = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const location = useLocation();
  const rentalDetail = location.state || {};
  const [cookies] = useCookies(["token"]);

  console.log(rentalDetail);
  const [formData, setFormData] = useState({
    roomType: rentalDetail?.room?.room_type || "",
    capacity: rentalDetail?.room?.capacity || "",
    gender: rentalDetail?.room?.gender || "",
    area: rentalDetail?.room?.area || "",
    city: rentalDetail?.room?.address[4] || "",
    district: rentalDetail?.room?.address[3] || "",
    ward: rentalDetail?.room?.address[2] || "",
    street: rentalDetail?.room?.address[1] || "",
    houseNumber: rentalDetail?.room?.address[0] || "",
    roomNumber: rentalDetail.room?.room_number || "",
    price: rentalDetail.room?.total_price || "",
    deposit: rentalDetail.room?.deposit || "",
    electricFee: rentalDetail.room?.electricity_cost || "",
    waterFee: rentalDetail.room?.water_cost || 0,
    internetFee: rentalDetail.room?.internet_cost || 0,
    parking: rentalDetail.room?.is_parking || false,
    parkingFee: rentalDetail.room?.parking_fee || 0,
    suggestedPrice: rentalDetail.suggested_price,
    responsibilityA: "",
    responsibilityB: "",
    generalResponsibility: "",
    paymentMethod: "",
    beginDate: dayjs(),
    endDate: dayjs(),
  });

  const mappedFormData = {
    addrressCreated: `${formData.city}` || "",
    dateCreated: Math.floor(Date.now() / 1000),   
    landlordName: userInfo?.full_name || "",
    landlordBirthYear: userInfo?.dob || "",
    landlordID: rentalDetail?.room?.owner?.id || "",
    landlordIssueDate: rentalDetail?.room?.owner?.issue_date || "",
    landlordIssuePlace: rentalDetail?.room?.owner?.issue_place || "",
    landlordAddress: rentalDetail?.room?.owner?.address || "",
    landlordPhone: userInfo?.phone_number || "",
    tenantName: rentalDetail?.sender?.full_name || "",
    tenantBirthYear: rentalDetail?.sender?.birth_year || "",
    tenantID: rentalDetail?.sender?.id || "",
    tenantIssueDate: rentalDetail?.sender?.issue_date || "",
    tenantIssuePlace: rentalDetail?.sender?.issue_place || "",
    tenantAddress: rentalDetail?.sender?.address || "",
    tenantPhone: rentalDetail?.sender?.phone_number || "",
    rentalPrice: formData.price || "",
    electricityPrice: formData.electricFee || "",
    waterPrice: formData.waterFee.toString() || "",
    depositAmount: formData.deposit || "",
    paymentMethod: formData.paymentMethod || "",
    roomAddress: `${formData.houseNumber}, ${formData.street}, ${formData.ward}, ${formData.district}, ${formData.city}` || "",
    contractDuration: `Từ ${formData.beginDate?.format("DD/MM/YYYY")} đến ${formData.endDate?.format("DD/MM/YYYY")}` || "",
    beginDate: formData.beginDate ? formData.beginDate.unix() : "",
    endDate: formData.endDate ? formData.endDate.unix() : "",
    landlordResponsibilities: formData.responsibilityA || "",
    tenantResponsibilities: formData.responsibilityB || "",
    generalResponsibilities: formData.generalResponsibility || "",
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        // Get mouse position relative to the canvas
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        isDrawing.current = true;
      }
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.beginPath(); // Reset the path for a new stroke
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener(
        "mousedown",
        startDrawing as unknown as EventListener
      );
      canvas.addEventListener("mousemove", draw as unknown as EventListener);
      canvas.addEventListener("mouseup", stopDrawing as EventListener);
      canvas.addEventListener("mouseleave", stopDrawing as EventListener);

      return () => {
        canvas.removeEventListener(
          "mousedown",
          startDrawing as unknown as EventListener
        );
        canvas.removeEventListener(
          "mousemove",
          draw as unknown as EventListener
        );
        canvas.removeEventListener("mouseup", stopDrawing as EventListener);
        canvas.removeEventListener("mouseleave", stopDrawing as EventListener);
      };
    }
  }, []);

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cập nhật state cho select dropdown
  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any, dateString: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? dayjs(date) : null, // Convert to Day.js object or set null
    }));
  };
  // Cập nhật state cho checkbox
  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  const getSignatureBase64 = (): string | null => {
    const canvas = canvasRef.current;
    if (canvas) {
      const base64 = canvas.toDataURL("image/png");
      return base64.replace("data:image/png;base64,", ""); // Loại bỏ tiền tố
    }
    return null;
  };

  const handleShowSignatureModal = () => {
    setShowSignatureModal(true);
  };
  const handleSubmit = async () => {
    const payload: CreateContractRequest = {
      address: [
        formData.houseNumber,
        formData.street,
        formData.ward,
        formData.district,
        formData.city,
      ],
      party_a: rentalDetail.room.owner,
      party_b: rentalDetail.sender.id,
      request_id: rentalDetail.id,
      room_id: rentalDetail.room.id,
      actual_price: Number(formData.price), // Giá thuê
      payment_method: formData.paymentMethod,
      electricity_method: "meter",
      electricity_cost: Number(formData.electricFee), // Giá điện
      water_method: "flat",
      water_cost: Number(formData.waterFee), // Giá nước
      internet_cost: Number(formData.internetFee), // Giá Internet
      parking_fee: Number(formData.parkingFee), // Phí giữ xe
      deposit: formData.deposit, // Tiền đặt cọc
      begin_date: dayjs.isDayjs(formData.beginDate)
        ? formData.beginDate.format("YYYY-MM-DD")
        : null,
      end_date: dayjs.isDayjs(formData.endDate)
        ? formData.endDate.format("YYYY-MM-DD")
        : null,
      responsibility_a: formData.responsibilityA,
      responsibility_b: formData.responsibilityB,
      general_responsibility: formData.generalResponsibility, // Trách nhiệm chung
      signature_a: getSignatureBase64() || "",
      signed_time_a: new Date().toISOString(),
    };

    closeSignatureModal();
    console.log("Payload: ", payload);
    setIsLoading(true);
    try {
      const contractService = new ContractService();
      await contractService.createContract(cookies.token, payload);
      toast.success("Tạo hợp đồng thành công!");
      setShowSignatureModal(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSignatureModal = () => {
    setShowSignatureModal(false);
    clearCanvas();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  const steps = [
    {
      title: "Nội dung",
      content: (
        <ContractInfoForm
          handleDateChange={handleDateChange}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
      ),
    },
    {
      title: "Trách nhiệm",
      content: (
        <ResponsibityForm
          handleInputChange={handleInputChange}
          handleSelectChange={() => handleSelectChange}
        />
      ),
    },
    {
      title: "Xem trước",
      content: <PreviewForm formData={mappedFormData} />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-[750px]">
      <div className="flex justify-center items-center">
        {steps.map((step, index) => (
          <div className="flex  items-center" key={index}>
            <div
              className={`flex items-center border  rounded-[50px] py-3 px-4  ${
                index === currentStep ? "border-blue-40" : "border-gray-80"
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full border font-medium ${
                  index === currentStep
                    ? "border-blue-40 bg-white text-blue-40 "
                    : "border-gray-80 bg-gray-100 text-gray-20"
                }`}
              >
                <span>{index + 1}</span>
              </div>

              <div
                className={`ml-2 font-bold text-sm ${
                  index === currentStep ? "text-gray-20 " : "text-gray-60"
                }`}
              >
                {step.title}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="w-20 h-0.5 bg-gray-80 "></div>
            )}
          </div>
        ))}
      </div>
      <div className="my-8 ">{steps[currentStep].content}</div>
      <div className="text-right">
        {currentStep < steps.length - 1 && (
          <Button
            className="float-end w-48 h-12 rounded-[100px] text-lg font-medium text-blue-60 border-blue-60"
            onClick={next}
          >
            Tiếp theo
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            className="float-end w-48 h-12 rounded-[100px] text-lg font-medium text-[#FFF] bg-blue-60 border-blue-60"
            onClick={handleShowSignatureModal}
          >
            Tạo hợp đồng
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            className="float-start w-48 h-12 rounded-[100px] text-lg font-medium text-blue-60 border-blue-60"
            onClick={prev}
          >
            Quay lại
          </Button>
        )}
      </div>
      {/* Signature Modal */}
      <Modal
        className="w-[500px] h-[600px]"
        title={
          <label className="text-gray-20 font-medium text-xl p-6">
            Bên cho thuê ký hợp đồng
          </label>
        }
        open={showSignatureModal}
        onCancel={closeSignatureModal}
        footer={
          <div className="flex justify-between px-14">
            <Button
              className="w-36 h-10 rounded-[100px] border-2 border-blue-60 text-blue-60"
              key="back"
              onClick={clearCanvas}
            >
              Ký lại
            </Button>

            <Button
              className="w-36 h-10 rounded-[100px] bg-blue-60 text-[#FFF]"
              key="submit"
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </div>
        }
        width={480}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
          },
        }}
      >
        <p className="flex justify-center mt-6 mb-6 text-gray-20 text-base">
          Ký tại ô vuông dưới đây
        </p>
        <canvas
          ref={canvasRef}
          width={340}
          height={350}
          className="border border-gray-40 rounded-lg"
          style={{ cursor: "crosshair" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </Modal>
    </div>
  );
};

export default CreateContractForm;
