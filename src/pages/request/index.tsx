import Navbar from "@/components/home/Navbar";
import RequestDetails from "@/components/rental-request/RequestDetail";
import RequestList from "@/components/rental-request/RequestList";
import { RentalRequestByIDRes, RentalRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface RequestProps {
  requestID?: number | null;
}

const Request = ({ requestID }: RequestProps) => {
  const [cookies] = useCookies(["token"]);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);

  const [request, setRequest] = useState<RentalRequestByIDRes>();

  useEffect(() => {
    const fetchRequest = async () => {
      const requestService = new RequestService();
      const res = await requestService.getRentalRequestByID(
        cookies.token,
        selectedRequest || requestID
      );
      setRequest(res.data.data);
    };
    fetchRequest();
  }, [selectedRequest]);

  console.log(request);
  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-24 mt-5">
        <div className="col-span-1">
          <RequestList onRequestSelect={setSelectedRequest} />
        </div>
        <div className="col-span-2">
          <RequestDetails request={request} />
        </div>
      </div>
    </div>
  );
};

export default Request;
