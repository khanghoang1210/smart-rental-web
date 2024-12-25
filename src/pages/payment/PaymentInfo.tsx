import Navbar from "@/components/home/Navbar";
import PaymentInfo from "@/components/payment/PaymentInfo";
import QRPayment from "@/components/payment/QRPayment";
import { useLocation } from "react-router-dom";

const PaymentInfoPage = () => {
  const location = useLocation();
  const { payment, room, bill } = location.state || {};
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
