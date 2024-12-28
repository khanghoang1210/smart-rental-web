import React, { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import InvoiceDetails from "@/components/invoice/InvoiceDetail";
import InvoiceList from "@/components/invoice/InvoiceList";
import { BillingRes } from "@/models/billing";
import BillingService from "@/services/BillingService";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const InvoicePage = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [bills, setBills] = useState<BillingRes[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<
    BillingRes | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<0 | 1 | 2>(0);

  const billingService = new BillingService();

  // Fetch hóa đơn dựa trên trạng thái
  const fetchBills = async () => {
    try {
      const response = await billingService.getByStatus(token, statusFilter);
      setBills(response.data.data || []);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [statusFilter]);

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center">
        <InvoiceList
          invoices={bills.map((bill) => ({
            bill,
            selected: selectedInvoice?.id === bill.id,
            onClick: () => setSelectedInvoice(bill),
          }))}
          onSelect={(id) => setSelectedInvoice(bills.find((b) => b.id === id))}
          onFilterChange={setStatusFilter} // Truyền filter xuống
          currentFilter={statusFilter} // Trạng thái filter hiện tại
        />
        <InvoiceDetails bill={selectedInvoice} />
      </div>
    </div>
  );
};

export default InvoicePage;
