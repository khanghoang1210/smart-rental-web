import address from "../../../assets/address.svg";

const BillList = ({ bills, selectedBillId, onSelect }: any) => {
  return (
    <div className="border mt-6 border-gray-80 rounded-lg p-4 w-[40%]">
      <div className="flex space-x-3">
        <img src={address} alt="" />
        <h1 className="font-semibold text-base text-gray-20">
          Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội
        </h1>
      </div>
      {bills.map((bill: any, index: number) => (
        <div
          key={index}
          className={`p-4 rounded-lg cursor-pointer mb-2 ${
            selectedBillId === bill.id ? "bg-blue-98" : "hover:bg-blue-98"
          }`}
          onClick={() => onSelect(bill)}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className={`text-sm ${bill.statusColor}`}>{bill.status}</p>

              <h3 className="font-semibold text-xs text-gray-60">{bill.room}</h3>
              <p className="font-semibold text-gray">{bill.tenant}</p>
            </div>
            {bill.statusCode !== "not_created" && (
              <span className="font-semibold">{bill.amount}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillList;
