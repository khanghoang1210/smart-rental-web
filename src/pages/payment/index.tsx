import Navbar from "@/components/home/Navbar";
import PaymentInfo from "@/components/payment/PaymentInfo";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import QRPayment from "@/components/payment/QRPayment";

const Payment = () => {
  return (
    <>
    <Navbar/>
    <PaymentSuccess/>
      {/* <div className="flex flex-col md:flex-row items-center justify-center gap-6  p-6">
        <PaymentInfo
          address="97 đường số 11, phường Trường Thọ, TP Thủ Đức, TP HCM"
          invoiceId="HD2220"
          amount="2,500,000đ"
          paymentMethod="Chuyển khoản"
          recipient="Lê Bảo Như"
        />
        <QRPayment
          bank="TECHCOMBANK"
          accountHolder="Lê Bảo Như"
          accountNumber="10823306994"
          transferAmount="2.000.000đ"
          transferContent="SR01239503942"
        />
      </div> */}
    </>
  );
};

export default Payment;
