import Navbar from "@/components/home/Navbar";
import InvoiceDetails from "@/components/invoice/InvoiceDetail";
import InvoiceList from "@/components/invoice/InvoiceList";
import { BillingRes } from "@/models/billing";
import BillingtService from "@/services/BillingService";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const InvoicePage = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [selectedInvoice, setSelectedInvoice] = useState<
    BillingRes | undefined
  >(null);
  const [bills, setBills] = useState<BillingRes[]>([]);

  useEffect(() => {
    const billingService = new BillingtService();

    const fetchBillByMonth = async (year: number, month: number) => {
      try {
        const roomRes = await billingService.getByMonth(token, month, year);
        const data = roomRes.data.data;
        setBills(data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    fetchBillByMonth(2023, 10);
  }, []);

  const invoices = bills.map((bill) => ({
    bill,
    selected: selectedInvoice?.id === bill.id,
    onClick: () => setSelectedInvoice(bill),
  }));

  return (
    <>
      <Navbar />
      <div className="flex">
        <InvoiceList
          invoices={invoices}
          onSelect={(id) =>
            setSelectedInvoice(bills.find((b) => b.id === id) || null)
          }
        />
        <InvoiceDetails bill={selectedInvoice} />
        {/* <PaymentInfo info={paymentInfo} /> */}
      </div>
    </>
  );
};

export default InvoicePage;
