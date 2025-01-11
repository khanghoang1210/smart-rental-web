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

  const [status, setStatus] = useState(0)

  const handleSelectContract = (contract: ContractRes) => {
    setSelectedContract(contract);
  };

  const handleChangeStatus = (status: number) => setStatus(status)

  return (
    <>
    <Navbar/>
    <div className="flex justify-center">
      <ContractsList onSelectContract={handleSelectContract} onStatusContract={handleChangeStatus}/>
      <ContractDetail contract={selectedContract || undefined} status={status} />
    </div>
    </>
    
  );
};

export default ContractManagementPage;
