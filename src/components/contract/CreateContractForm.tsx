import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import ContractInfoForm from "./form/ContractInfoForm";
import ResponsibityForm from "./form/ResponsibityForm";
import PreviewForm from "./form/PreviewForm";

const CreateContractForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [formData, setFormData] = useState({
    roomType: "",
    capacity: "",
    gender: "",
    area: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    houseNumber: "",
    roomNumber: "",
    price: "",
    deposit: "",
    electricFee: "",
    waterFee: "",
    internetFee: "",
    parking: false,
    parkingFee: "",
  });

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
  const handleSelectChange = (value: string, name: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleSubmit = () => {
    setShowSignatureModal(true);
    console.log("submitted:", formData) // Show the modal when the user clicks "Tạo hợp đồng"
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
          handleInputChange={handleInputChange}
          handleSelectChange={() => handleSelectChange}
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
      content: <PreviewForm formData={{}}/>,
    },
  ];

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
            onClick={handleSubmit}
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
              onClick={closeSignatureModal}
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
