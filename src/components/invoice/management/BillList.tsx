const BillList = ({ bills, selectedBillId, onSelect }: any) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-full md:w-[40%]">
      {bills.map((bill: any, index: number) => (
        <div
          key={index}
          className={`p-4 rounded-lg cursor-pointer mb-2 ${
            selectedBillId === bill.id ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
          onClick={() => onSelect(bill)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{bill.room}</h3>
              <p className={`text-sm ${bill.statusColor}`}>{bill.status}</p>
            </div>
            {bill.statusCode !== "not_created" && (
              <span className="font-medium">{bill.amount}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BillList;
