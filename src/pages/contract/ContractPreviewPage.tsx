import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import letter from "../../assets/letter.png";
import term from "../../assets/terms.png";
import credit_card from "../../assets/credit_card.png";
import rating from "../../assets/rating.png";
import RequestService from "@/services/RequestService";
import { CreateReturnRequestReq } from "@/models/chat/request";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import ContractTemplate from "@/components/contract/form/PreviewForm";
import Navbar from "@/components/home/Navbar";

interface FormValues {
  reason: string;
  return_date: Date;
  deduct_amount: number;
  total_return_deposit: number;
}
const ContractPreviewPage = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Close the first modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Open the second modal
  const handleConfirmEndContract = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
// //   const location = useLocation();
//   const rentalDetail = location.state || {};
//   const [cookies] = useCookies(["token"]);



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



  
  return (
    <div>
      <Navbar/>
      <div className='container mx-auto p-4 w-[750px]'>
      <h1 className="text-center my-10 text-2xl text-gray-20">
        Chi tiết hợp đồng
      </h1>
      <ContractTemplate formData={{}} />
      <div className="flex justify-between mt-6">
        <button
          onClick={handleOpenModal}
          className="border border-red text-red px-16 py-3 rounded-[100px]"
        >
          Không đồng ý
        </button>
        <button onClick={handleShowSignatureModal} className="bg-blue-60 text-[#FFF] px-16 py-3 rounded-[100px]">
          Ký hợp đồng
        </button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#fff] rounded-[20px] p-8 w-[400px] text-center relative">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-60 w-16 h-16 flex items-center justify-center rounded-full text-[#fff] text-3xl">
                !
              </div>
              <h2 className="text-xl font-semibold text-gray-20">Thông báo</h2>
              <p className="text-gray-20">
                Bạn có chắc chắn muốn kết thúc{" "}
                <span>hợp đồng và tiến hành trả phòng</span>?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 w-32 rounded-full border border-blue-60 text-blue-60 hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  className="px-6 py-2 w-32 rounded-full bg-blue-60 text-[#fff] hover:bg-blue-700"
                  onClick={handleConfirmEndContract}
                >
                  Chắc chắn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     </div>
      {/* Signature Modal */}
      <Modal
        className="w-[500px] h-[600px]"
        title={
          <label className="text-gray-20 font-medium text-xl p-6">
            Bên thuê ký hợp đồng
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
            //   onClick={handleSubmit}
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

export default ContractPreviewPage;
