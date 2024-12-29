import Navbar from "@/components/home/Navbar";
import BillDetails from "@/components/invoice/management/BillDetails";
import BillList from "@/components/invoice/management/BillList";
import { Billing, GetBillByMonthRes } from "@/models/billing";
import BillingService from "@/services/BillingService";
import { generatePeriods } from "@/utils/generater";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const BillManagementPage = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [selectedPeriod, setSelectedPeriod] = useState("10/2024");
  const [selectedBill, setSelectedBill] = useState<Billing>();
  const [bills, setBills] = useState<Billing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const periods = generatePeriods();

  const paymentService = new BillingService();

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
        return;
      }
      const data = response.data.data;
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

      setBills(data);
      console.log(data);
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
      <div className="flex flex-col p-6 ">
        <div className="flex justify-center item-center space-x-6">
          <BillList
            bills={bills}
            selectedBill={selectedBill}
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
