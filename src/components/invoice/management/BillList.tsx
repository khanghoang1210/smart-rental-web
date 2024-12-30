import { useState } from "react";
import addressimg from "../../../assets/address.svg";
import { toCurrencyFormat } from "@/utils/converter";
import { Spin } from "antd";
import BillingService from "@/services/BillingService";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

const BillList = ({
  bills,
  selectedBill,
  onSelect,
  periods,
  selectedPeriod,
  onChange,
}: any) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [selectedBills, setSelectedBills] = useState<any[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(bills);
  // Open the modal
  const handleOpenModal = () => {
    if (selectedBills.length > 0) {
      setIsModalVisible(true);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Confirm and proceed with invoice creation
  const handleConfirmCreate = () => {
    setIsModalVisible(false);
    handleCreateInvoices();
  };

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(true);
  };

  const handleCheckboxChange = (bill: any) => {
    setSelectedBills((prev) =>
      prev.includes(bill) ? prev.filter((b) => b !== bill) : [...prev, bill]
    );
  };

  const getMonthYear = (period: string) => {
    const [month, year] = period.split("/").map(Number);
    return { month, year };
  };

  // Handle invoice creation

  const handleCreateInvoices = async () => {
    setLoading(true);
    const billingService = new BillingService();
    const { month, year } = getMonthYear(selectedPeriod);
    try {
      for (const bill of selectedBills) {
        const billingData = {
          room_id: bill.room_id,
          month: month,
          year: year,
          addition_fee: 0,
          addition_note:""
        };
        await billingService.createBilling(token, billingData);
      }
      toast.success("Tạo hóa đơn thành công");
    } catch (error: any) {
      toast.error(error.message || "Lỗi tạo hóa đơn.");
    } finally {
      setLoading(false);
    }
  };
  console.log("Selected Bills:", selectedBills);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-[830px] h-[300px]">
        <Spin size="large" className="ml-72" />
      </div>
    );
  }
  
  return (
    <div className=" mt-6 w-[400px]">
      <h1 className="text-xl  text-gray-20 font-bold mb-4">Hóa đơn thu tiền</h1>

      <div className="flex items-center mb-4 space-x-4 w-full">
        <div className="relative">
          <label
            className="absolute left-4 top-2 bg-white text-gray-20 text-sm px-1"
            htmlFor="period-select"
          >
            Kỳ
          </label>
          <select
            id="period-select"
            value={selectedPeriod}
            onChange={async (e) => {
              onChange(e.target.value);
              setLoading(true); // Set loading to true when period changes
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setLoading(false); // Set loading to false after the operation
            }}
            className="border rounded-lg text-gray-20 text-sm font-medium px-12 py-4 focus:outline-none focus:rin"
          >
            {periods.map((period: string, index: number) => (
              <option key={index} value={period}>
                {period}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-60 text-[#fff] w-60 py-4 rounded-[100px]"
          onClick={() => {
            if (!showCheckboxes) {
              handleToggleCheckboxes(); // Show checkboxes
            } else if (selectedBills.length > 0) {
              handleOpenModal(); // Create invoices
            }
          }}
          disabled={showCheckboxes && selectedBills.length === 0}
        >
          {showCheckboxes
            ? selectedBills.length > 0
              ? "Tạo hóa đơn"
              : "Chọn hóa đơn"
            : "Chọn"}
        </button>
      </div>

      {!bills || bills.length === 0 || loading ? (
        <div className="flex justify-center items-center">
          {loading ? (
            <Spin />
          ) : (
            <div className="text-gray-40">Không có hoá đơn cho kỳ này</div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {bills.map((billGroup: any, index: number) => (
            <div key={index} className="border-gray-80 border rounded-lg p-4">
              <div className="flex space-x-3">
                <img src={addressimg} alt="" />
                <h1 className="font-semibold text-base text-gray-20">
                  {billGroup.address || "Địa chỉ không xác định"}
                </h1>
              </div>
              {billGroup.list_bill.length === 0 ? (
                <div className="text-gray-40 mt-2">Không có hóa đơn</div>
              ) : (
                billGroup.list_bill.map((bill: any) => (
                  <div
                    key={bill.id}
                    className={`p-4 rounded-lg cursor-pointer mb-2 flex items-center ${
                      showCheckboxes && bill.status === -1
                        ? selectedBills.includes(bill)
                          ? "bg-blue-98"
                          : "hover:bg-blue-98"
                        : selectedBill === bill
                          ? "bg-blue-98"
                          : "hover:bg-blue-98"
                    }`}
                    onClick={() => {
                      if (!showCheckboxes) {
                        onSelect(bill); // Only handle selection when checkboxes are hidden
                      }
                    }}
                  >
                    {showCheckboxes && bill.status === -1 && (
                      <input
                        type="checkbox"
                        checked={selectedBills.includes(bill)}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent parent div's onClick from firing
                          handleCheckboxChange(bill); // Toggle checkbox selection
                        }}
                        className="mr-3 w-5 h-5"
                      />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          bill.status === -1
                            ? "text-blue-40"
                            : bill.status === 0
                              ? "text-red"
                              : bill.status === 1
                                ? "text-gray-40"
                                : "text-green"
                        }`}
                      >
                        {bill.status === -1
                          ? "Chưa tạo hóa đơn"
                          : bill.status === 0
                            ? "Chưa thanh toán"
                            : bill.status === 1
                              ? "Chờ xác nhận"
                              : "Đã thanh toán"}
                      </p>
                      <h3 className="font-semibold text-xs text-gray-60">
                        Phòng số {bill.room_number}
                      </h3>
                      <p className="font-semibold text-gray">
                        {bill.tenant_name}
                      </p>
                    </div>
                    {bill.statusCode !== "not_created" && (
                      <span className="font-semibold text-gray-20">
                        {bill.total_amount
                          ? toCurrencyFormat(bill.total_amount) + "đ"
                          : ""}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {isModalVisible && (
        <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#fff] rounded-[20px] p-8 w-[400px] text-center relative">
            {/* Modal Content */}
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-60 w-16 h-16 flex items-center justify-center rounded-full text-[#fff] text-3xl">
                !
              </div>
              <h2 className="text-xl font-semibold text-gray-20">Thông báo</h2>
              <p className="text-gray-20">
                Bạn có chắc chắn muốn tạo hóa đơn tháng{" "}
                <span className="font-bold">10/2024</span> cho tất cả{" "}
                <span className="font-bold">
                  {selectedBills.length} phòng trọ
                </span>
                ?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 w-32 rounded-full border border-blue-60 text-blue-60 hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  className="px-6 py-2 w-32 rounded-full bg-blue-60 text-[#fff] hover:bg-blue-700"
                  onClick={handleConfirmCreate}
                >
                  Chắc chắn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillList;
