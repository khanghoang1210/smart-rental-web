// ContractManagementPage.tsx
import ContractDetail from "@/components/contract/ContractDetail";
import ContractsList from "@/components/contract/ContractsList";
import Navbar from "@/components/home/Navbar";
import React, { useState } from "react";

interface Contract {
  id: string;
  room: string;
  address: string;
  tenant: string;
  startDate: string;
  endDate: string;
}

const ContractManagementPage: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );

  const handleSelectContract = (contract: Contract) => {
    setSelectedContract(contract);
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
      <ContractsList onSelectContract={handleSelectContract} />
      <ContractDetail contract={selectedContract || undefined} />
    </div>
    </>
    
  );
};

export default ContractManagementPage;
