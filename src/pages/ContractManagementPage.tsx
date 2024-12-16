// ContractManagementPage.tsx
import ContractDetail from "@/components/contract/ContractDetail";
import ContractsList from "@/components/contract/ContractsList";
import Navbar from "@/components/home/Navbar";
import { ContractRes } from "@/models/contract";
import React, { useState } from "react";


const ContractManagementPage: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<ContractRes | null>(
    null
  );

  const handleSelectContract = (contract: ContractRes) => {
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
