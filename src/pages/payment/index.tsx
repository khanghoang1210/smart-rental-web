import Navbar from "@/components/home/Navbar";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { paymentId } = location.state || {};
  return (
    <>
    <Navbar/>
    <PaymentSuccess paymentId={paymentId}/>

    </>
  );
};

export default Payment;
