import { useState } from "react";
import addressimg from "../../../assets/address.svg";

const BillList = ({
  bills,
  address,
  selectedBillId,
  onSelect,
  periods,
  selectedPeriod,
  onChange,
}: any) => {
  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleCheckboxChange = (billId: string) => {
    setSelectedBills((prev) =>
      prev.includes(billId)
        ? prev.filter((id) => id !== billId)
        : [...prev, billId]
    );
  };

  // Handle invoice creation
  const handleCreateInvoices = () => {
    // Logic to create invoices for selected bills
    console.log("Creating invoices for:", selectedBills);
  };

  return (
    <div className=" mt-6 w-[25%]">
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
            onChange={(e) => onChange(e.target.value)}
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
          disabled={showCheckboxes && selectedBills.length === 0} // Disable if no bills are selected
        >
          {showCheckboxes
            ? selectedBills.length > 0
              ? "Tạo hóa đơn"
              : "Chọn hóa đơn"
            : "Chọn"}
        </button>
      </div>
      <div className="border-gray-80 border rounded-lg p-4">
        <div className="flex space-x-3">
          <img src={addressimg} alt="" />
          <h1 className="font-semibold text-base text-gray-20">{address}</h1>
        </div>
        {bills.map((bill: any) => (
          <div
            key={bill.id}
            className={`p-4 rounded-lg cursor-pointer mb-2 flex items-center ${
              showCheckboxes && bill.statusCode === "not_created"
                ? selectedBills.includes(bill.id)
                  ? "bg-blue-98"
                  : "hover:bg-blue-98"
                : selectedBillId === bill.id
                  ? "bg-blue-98"
                  : "hover:bg-blue-98"
            }`}
            onClick={() => {
              if (!showCheckboxes) {
                onSelect(bill); // Only handle selection when checkboxes are hidden
              }
            }}
          >
            {showCheckboxes && bill.statusCode === "not_created" && (
              <input
                type="checkbox"
                checked={selectedBills.includes(bill.id)}
                onChange={(e) => {
                  e.stopPropagation(); // Prevent parent div's onClick from firing
                  handleCheckboxChange(bill.id); // Toggle checkbox selection
                }}
                className="mr-3 w-5 h-5"
              />
            )}
            <div className="flex-1">
              <p
                className={`text-sm ${bill.status === 1 ? "text-red" : "text-blue-40"}`}
              >
                {bill.status === 1 ? "Chưa thanh toán" : "Đã thanh toán"}
              </p>
              <h3 className="font-semibold text-xs text-gray-60">
                Phòng số {bill.room_number}
              </h3>
              <p className="font-semibold text-gray">
                {bill.tenant_name || "Le Bao Nhu"}
              </p>
            </div>
            {bill.statusCode !== "not_created" && (
              <span className="font-semibold text-gray-20">
                {bill.total_amount}đ
              </span>
            )}
          </div>
        ))}
      </div>
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
