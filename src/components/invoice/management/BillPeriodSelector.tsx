import React from "react";

const BillPeriodSelector = ({ periods, selectedPeriod, onChange }: any) => {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={selectedPeriod}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        {periods.map((period: string, index: number) => (
          <option key={index} value={period}>
            {period}
          </option>
        ))}
      </select>
      <button className="bg-blue-60 text-[#fff] px-4 py-2 rounded-[100px]">
        Chọn
      </button>
    </div>
  );
};

export default BillPeriodSelector;
