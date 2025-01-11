import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Spin } from "antd";
import letter from "../../assets/letter.png";
import term from "../../assets/terms.png";
import credit_card from "../../assets/credit_card.png";
import rating from "../../assets/rating.png";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import ContractTemplate from "@/components/contract/form/PreviewForm";
import Navbar from "@/components/home/Navbar";
import ContractService from "@/services/ContractService";
import { useLocation, useSearchParams } from "react-router-dom";
import { CreateReturnRequestReq } from "@/models/chat/request";
import RequestService from "@/services/RequestService";
import { useAppStore } from "@/store";

interface FormValues {
  reason: string;
  return_date: Date;
}

const ContractPreviewPage = () => {
  const [form] = Form.useForm();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const contractId = location.state || {};
  const [contract, setContract] = useState<any>(null);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const { userInfo } = useAppStore();
  const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);

  const handleContractUpdate = (updatedContract: any) => {
    setContract(updatedContract);
  };

  const handleCloseReturnModal = () => {
    setIsReturnModalVisible(false);
  };

  const handleConfirmEndContract = () => {
    setIsSecondModalVisible(false);
    setIsReturnModalVisible(true);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleOpenSecondModal = () => {
    setIsSecondModalVisible(true);
  };

  // Close the first modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseSecondModal = () => {
    setIsSecondModalVisible(false);
  };
  // Open the second modal
  const handleDeclineContract = async () => {
    setIsLoading(true);
    const contractService = new ContractService();
    try {
      await contractService.declineContract(token, contractId.contractId);
      toast.success("Từ chối hợp đồng thành công!");
      setShowSignatureModal(false);
      clearCanvas();
    } catch (error) {
      if (error instanceof Error) toast.error("Lỗi hệ thống");
    } finally {
      setIsModalVisible(false);
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

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

  const handleSignContract = async () => {
    const signature = getSignatureBase64();
    if (!signature) {
      toast.error("Vui lòng ký tên trước khi xác nhận.");
      return;
    }

    setIsLoading(true);
    const contractService = new ContractService();
    try {
      await contractService.signContractByTenant(
        token,
        contractId.contractId,
        signature
      );
      toast.success("Ký hợp đồng thành công!");
      setShowSignatureModal(false);
      clearCanvas();
    } catch (error) {
      if (error instanceof Error) toast.error("Lỗi hệ thống");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      // Dữ liệu từ form
      const payload: CreateReturnRequestReq = {
        contract_id: contractId.contractId,
        reason: values.reason,
        return_date: values.return_date,
      };
      setIsLoading(true)
      const requestService = new RequestService();

      // Gửi yêu cầu API
      await requestService.createReturnRequest(token, payload);

      // Thông báo thành công và đóng modal
      setIsSecondModalVisible(false);
      toast.success("Yêu cầu trả phòng đã được gửi thành công!");
    } catch (error) {
      console.error("Error submitting return request:", error);
      toast.error("Có lỗi xảy ra khi gửi yêu cầu trả phòng.");
    }
    finally{
      setIsLoading(false)
      handleCloseReturnModal()
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  console.log(contract);
  // if (!contract) {
  //   return (
  //     <div className="flex justify-center items-center h-[300px]">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }




  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 w-[750px]">
        <h1 className="text-center my-10 text-2xl text-gray-20">
          Chi tiết hợp đồng
        </h1>
        <ContractTemplate
          contractId={contractId.contractId}
          onContractUpdate={handleContractUpdate}
        />
        {!contract?.signature_b && userInfo?.role === 0 ? (
          <div className="flex justify-between mt-6">
            <button
              onClick={handleOpenModal}
              className="border border-red text-red px-16 py-3 rounded-[100px]"
            >
              Không đồng ý
            </button>
            <button
              onClick={handleShowSignatureModal}
              className="bg-blue-60 text-[#FFF] px-16 py-3 rounded-[100px]"
            >
              Ký hợp đồng
            </button>
          </div>
        ) : userInfo?.role === 0 && contract.status === 1 ? (
          <div className="flex justify-between mt-6">
            <button
              onClick={handleOpenSecondModal}
              className="border border-red text-red px-16 py-3 rounded-[100px]"
            >
              Kết thúc hợp đồng
            </button>
            <button
              onClick={handleShowSignatureModal}
              className="bg-blue-60 text-[#FFF] px-16 py-3 rounded-[100px]"
            >
              Gia hạn hợp đồng
            </button>
          </div>
        ) : null}
        {isModalVisible && (
          <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#fff] rounded-[20px] p-8 w-[400px] text-center relative">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-60 w-16 h-16 flex items-center justify-center rounded-full text-[#fff] text-3xl">
                  !
                </div>
                <h2 className="text-xl font-semibold text-gray-20">
                  Thông báo
                </h2>
                <p className="text-gray-20">
                  Bạn có chắc chắn muốn từ chối ký <span>hợp đồng</span>?
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
                    onClick={handleDeclineContract}
                  >
                    Chắc chắn
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSecondModalVisible && (
          <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#fff] rounded-[20px] p-8 w-[400px] text-center relative">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-60 w-16 h-16 flex items-center justify-center rounded-full text-[#fff] text-3xl">
                  !
                </div>
                <h2 className="text-xl font-semibold text-gray-20">
                  Thông báo
                </h2>
                <p className="text-gray-20">
                  Bạn có chắc chắn muốn kết thúc{" "}
                  <span>hợp đồng và tiến hành trả phòng</span>?
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    className="px-6 py-2 w-32 rounded-full border border-blue-60 text-blue-60 hover:bg-gray-100"
                    onClick={handleCloseSecondModal}
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
              onClick={handleSignContract}
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
      <Modal
        className="flex flex-row justify-center items-center h-[600px] "
        title={
          <label
            style={{
              color: "#49454F",
              fontWeight: "500px",
              fontSize: "28px",
            }}
          >
            Gửi yêu cầu trả phòng
          </label>
        }
        open={isReturnModalVisible}
        onCancel={handleCloseReturnModal}
        footer={null}
      >
        <div className=" p-8 flex space-x-10">
          {/* Left Column: Instructions */}
          <div className="bg-gray-90 px-6 py-10 rounded-lg w-[380px] text-gray-20">
            <h1 className="text-sm font-normal mb-4 text-center">
              Hoàn tất quá trình trả phòng trọ với các bước sau:
            </h1>
            <div className="space-y-3">
              {/* Instruction steps */}
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  1
                </div>
                <div>
                  <img src={letter} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Gửi yêu cầu trả phòng</h1>
                  <p className="text-[10px]">
                    Gửi yêu cầu trả phòng của bạn đến chủ nhà
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  2
                </div>
                <div>
                  <img src={term} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Kiểm tra phòng và xác nhận</h1>
                  <p className="text-[10px]">
                    Chủ nhà sẽ kiểm tra phòng sau khi bạn trả
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  3
                </div>
                <div>
                  <img src={credit_card} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Hoàn tiền đặt cọc</h1>
                  <p className="text-[10px]">
                    Tiền đặt cọc sẽ được hoàn trả cho bạn
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-8 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  4
                </div>
                <div>
                  <img src={rating} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Đánh giá chủ nhà</h1>
                  <p className="text-[10px]">
                    Đánh giá chủ nhà sau quá trình thuê
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-[585px]">
            <Form<FormValues>
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="return_date"
                label={
                  <label
                    style={{
                      color: "#878787",
                      fontWeight: "800px",
                      fontSize: "16px",
                    }}
                  >
                    Ngày trả phòng
                  </label>
                }
                rules={[
                  { required: true, message: "Vui lòng chọn ngày trả phòng" },
                ]}
              >
                
                <DatePicker
                  className=" rounded-[10px]"
                  placeholder="Chọn ngày"
                  style={{ width: "100%", height: "50px" }}
                  onChange={(date) =>
                    form.setFieldsValue({
                      return_date: date ?? null,
                    })
                  }
                />
              </Form.Item>

              <Form.Item
                name="reason"
                label={
                  <label
                    style={{
                      color: "#878787",
                      fontWeight: "500px",
                      fontSize: "16px",
                    }}
                  >
                    Lý do
                  </label>
                }
              >
                <Input.TextArea
                  name="reason"
                  className=" rounded-[10px]"
                  rows={4}
                  placeholder="Nhập lý do"
                />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-start items-start space-x-20 ">
                  <p className="text-start text-gray-40 text-base font-normal w-[290px]">
                    Bằng việc gửi yêu cầu thuê, chủ nhà có thể nhìn thấy thông
                    tin cá nhân của bạn
                  </p>
                  <Checkbox className="mb-3 text-gray-40">Tôi đồng ý</Checkbox>
                </div>
              </Form.Item>
              <Form.Item>
                <div className="flex justify-end space-x-8">
                  <Button
                    onClick={handleCloseReturnModal}
                    className="h-[50px] w-[150px] rounded-[100px] border-blue-60 text-blue-60 text-base font-medium"
                  >
                    Huỷ
                  </Button>
                  <Button
                    className="h-[50px] w-[150px] rounded-[100px] bg-blue-60 text-[#FFF] font-medium text-base"
                    htmlType="submit"
                  >
                    Gửi
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContractPreviewPage;
