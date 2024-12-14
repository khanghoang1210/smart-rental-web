import Navbar from "@/components/home/Navbar";
import RequestDetails from "@/components/rental-request/RequestDetail";
import RequestList from "@/components/rental-request/RequestList";
import { RentalRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface RequestProps {
  requestID?: number | null;
}

const Request = ({ requestID }: RequestProps) => {
  const [cookies] = useCookies(["token"]);
  const [selectedRequest, setSelectedRequest] =
    useState<RentalRequestRes | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      if (requestID) {
        try {
          const requestService = new RequestService();
          const response = await requestService.getRentalRequestByID(
            cookies.token,
            requestID
          );
          setSelectedRequest(response.data.data);
        } catch (error) {
          console.error("Failed to fetch rental request:", error);
        }
      }
    };

    fetchRequest();
  }, [requestID, cookies.token]);

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
