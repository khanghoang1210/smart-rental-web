import Navbar from "@/components/home/Navbar";
import BillDetails from "@/components/invoice/management/BillDetails";
import BillList from "@/components/invoice/management/BillList";
import { Billing, GetBillByMonthRes } from "@/models/billing";
import BillingService from "@/services/BillingService";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const BillManagementPage = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [address, setAddress] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("10/2023");
  const [selectedBill, setSelectedBill] = useState<Billing>();
  const [bills, setBills] = useState<Billing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const periods = ["10/2023", "09/2023", "08/2023"];

  const paymentService = new BillingService();

  // Tách tháng và năm từ kỳ
  const getMonthYear = (period: string) => {
    const [month, year] = period.split("/").map(Number);
    return { month, year };
  };

  const fetchBillsByPeriod = async (period: string) => {
    const { month, year } = getMonthYear(period);

    try {
      setIsLoading(true);
      setIsDataEmpty(false);
      const response = await paymentService.getByMonth(token, month, year);
      if (!response.data.data || response.data.data.length === 0) {
        setIsDataEmpty(true); // Đánh dấu không có data
        setBills([]);
        setAddress("");
        return;
      }
      const data: GetBillByMonthRes = response.data.data[0];
      console.log(data);

      // Map list_bill
      // const formattedBills:Billing = data.list_bill.map((bill) => ({
      //   id: bill.id,
      //   room_number: `Phòng số ${bill.room_number}`,
      //   status: bill.status,
      //   payment_id: bill.payment_id,
      //   total_amount: `${bill.total_amount.toLocaleString()}đ`,
      //   tenant_name: bill.tenant_name,
      //   created_at: bill.created_at,
      //   avatar: bill.avatar,
      // }));

      setBills(data.list_bill);
      console.log(data.list_bill);
      setAddress(data.address); // Lưu địa chỉ vào state
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi lấy dữ liệu hóa đơn");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBillsByPeriod(selectedPeriod);
  }, [selectedPeriod]);

  console.log(bills);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleBillSelect = (bill: Billing) => {
    setSelectedBill(bill);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-6 justify-center">
        <div className="flex justify-center space-x-6">
          <BillList
            bills={bills}
            address={address}
            selectedBillId={selectedBill?.id}
            onSelect={handleBillSelect}
            onChange={handlePeriodChange}
            selectedPeriod={selectedPeriod}
            periods={periods}
          />
          <BillDetails billId={selectedBill?.id} />
        </div>
      </div>
    </>
  );
};

export default BillManagementPage;
