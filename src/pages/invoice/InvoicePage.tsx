import Navbar from "@/components/home/Navbar";
import InvoiceDetails from "@/components/invoice/InvoiceDetail";
import InvoiceList from "@/components/invoice/InvoiceList";
import PaymentInfo from "@/components/invoice/PaymentInfo";
import { useState } from "react";

const InvoicePage = () => {
  const [, setSelectedInvoice] = useState<string>("HD221");

  const invoices = [
    {
      id: "HD221",
      date: "13:49 17/09/2023",
      dueDate: "20/09/2023",
      address: "Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội",
      room: "Phòng số 3.11",
      total: "3,560,000đ",
      selected: true,
      onClick: () => setSelectedInvoice("HD221"),
    },
    // Add more invoices here
  ];

  const invoiceDetails = {
    id: "HD221",
    roomPrice: "2,500,000đ",
    electricity: "350,000đ",
    water: "90,000đ",
    internet: "60,000đ",
    parking: "100,000đ",
    other: "20,000đ",
    total: "3,560,000đ",
  };

  const paymentInfo = {
    name: "Lê Bảo Như",
    phone: "0823306992",
    room: "3.11",
    address: "97 đường số 11, phường Trường Thọ, TP Thủ Đức, TP HCM",
    month: "Tháng 7/2024",
    total: "3,560,000đ",
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <InvoiceList
          invoices={invoices}
          onSelect={(id) => setSelectedInvoice(id)}
        />
        <InvoiceDetails details={invoiceDetails} />
        <PaymentInfo info={paymentInfo} />
      </div>
    </>
  );
};

export default InvoicePage;
