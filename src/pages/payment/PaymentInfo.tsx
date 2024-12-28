import Navbar from "@/components/home/Navbar";
import PaymentInfo from "@/components/payment/PaymentInfo";
import QRPayment from "@/components/payment/QRPayment";
import PaymentService from "@/services/PaymentService";
import { Spin } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "sonner";

const PaymentInfoPage = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = cookies.token;
  const location = useLocation();
  const { payment, room, bill } = location.state || {};
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (image: File|null) => {
    setUploadedImage(image); // Store uploaded image
    console.log("Uploaded image:", image); // For debugging
  };

  const handleSave = async () => {

    const formData = new FormData();
    formData.append("bill_id", bill?.bill.id);
    formData.append("amount", payment.amount);
    formData.append("transfer_content", payment.tranfer_content);
    if (uploadedImage) {
      formData.append("evidence_image", uploadedImage);
    }
    setIsLoading(true);
    try {
      const paymentService = new PaymentService();
      const response = await paymentService.createPayment(token, formData);
      toast.success("Thanh toán thành công!");
      navigate("/payment/success", { state: { paymentId: response.data.data } });

    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Đã xảy ra lỗi khi thanh toán.");
    }
    finally {
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
          amount={payment.amount}
          paymentMethod="Chuyển khoản"
          recipient={room?.owner || ""}
          onImageUpload={handleImageUpload}
          onSave={handleSave}
        />
        <QRPayment
          bank={payment.short_name}
          logo={payment.logo}
          accountHolder={payment.account_name}
          accountNumber={payment.account_number}
          transferAmount={payment.amount}
          transferContent={payment.tranfer_content}
          qrUrl={payment.qr_url}
        />
      </div>
    </>
  );
};

export default PaymentInfoPage;
