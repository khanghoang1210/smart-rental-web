import Navbar from "@/components/home/Navbar";
import RequestDetails from "@/components/rental-request/RequestDetail";
import RequestList from "@/components/rental-request/RequestList";
import { RentalRequestRes } from "@/models/request";
import { useState } from "react";

const Request = () => {
  const [selectedRequest, setSelectedRequest] =
    useState<RentalRequestRes | null>(null);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4 grid grid-cols-3 gap-6 w-[1100px]">
        <div className="col-span-1">
          <RequestList onRequestSelect={setSelectedRequest} />
        </div>
        <div className="col-span-2">
          <RequestDetails request={selectedRequest} />
        </div>
      </div>
    </div>
  );
};

export default Request;
