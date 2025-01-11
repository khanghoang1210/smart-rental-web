import Navbar from "@/components/home/Navbar";
import PaymentInfo from "@/components/payment/PaymentInfo";
import QRPayment from "@/components/payment/QRPayment";
import { PaymentInfoRes } from "@/models/payment";
import PaymentService from "@/services/PaymentService";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "sonner";

const PaymentInfoPage = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = cookies.token;
  const location = useLocation();
  const { contractID, billID, returnID } = location.state || {};
  const { payment, room, bill } = location.state || {};
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoRes>();

  const handleImageUpload = (image: File | null) => {
    setUploadedImage(image); // Store uploaded image
    console.log("Uploaded image:", image); // For debugging
  };

  const type = contractID
    ? "contract"
    : billID
      ? "bill"
      : returnID
        ? "return"
        : "";
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const paymentService = new PaymentService();

      const res = await paymentService.getDetailInfo(
        token,
        type,
        contractID || billID || returnID
      );
      setPaymentInfo(res.data.data);
    };
    fetchPaymentInfo();
  }, [contractID, billID, returnID, token]);
  const handleSave = async () => {
    const formData = new FormData();
    if (billID) {
      formData.append("bill_id", billID);
    }
    if (contractID) {
      formData.append("contract_id", contractID);
    }
    if (returnID) {
      formData.append("return_request_id", returnID);
    }
    formData.append("amount", paymentInfo?.amount?.toString());
    formData.append("transfer_content", paymentInfo?.tranfer_content);
    if (uploadedImage) {
      formData.append("evidence_image", uploadedImage);
    }
    setIsLoading(true);
    try {
      const paymentService = new PaymentService();
      const response = await paymentService.createPayment(token, formData);
      toast.success("Thanh toán thành công!");
      navigate("/payment/success", {
        state: { paymentId: response.data.data },
      });
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Đã xảy ra lỗi khi thanh toán.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center gap-6  p-6">
        <PaymentInfo
          address={room?.address || ""}
          invoiceId={bill?.bill.code}
          amount={paymentInfo?.amount}
          paymentMethod="Chuyển khoản"
          recipient={room?.owner || ""}
          type={type}
          onImageUpload={handleImageUpload}
          onSave={handleSave}
        />
        <QRPayment
          bank={paymentInfo?.short_name}
          logo={paymentInfo?.logo}
          accountHolder={paymentInfo?.account_name}
          accountNumber={paymentInfo?.account_number}
          transferAmount={paymentInfo?.amount}
          transferContent={paymentInfo?.tranfer_content}
          qrUrl={paymentInfo?.qr_url}
        />
      </div>
    </>
  );
};

export default PaymentInfoPage;
