import Navbar from "@/components/home/Navbar";
import RequestDetails from "@/components/return-request/tenant/RequestDetail";
import RequestListTenant from "@/components/return-request/tenant/RequestList";
import { ReturnRequestRes } from "@/models/request";
import { useState } from "react";

const ReturnRequestPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<ReturnRequestRes | null>(null);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4 grid grid-cols-3 gap-6 w-[1100px]">
        <div className="col-span-1">
          <RequestListTenant onRequestSelect={setSelectedRequest} />
        </div>
        <div className="col-span-2">
          <RequestDetails requestId={selectedRequest?.id} />
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestPage;
