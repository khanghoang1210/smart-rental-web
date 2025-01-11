import Navbar from "@/components/home/Navbar";
import RequestDetails from "@/components/rental-request/RequestDetail";
import RequestList from "@/components/rental-request/RequestList";
import { RentalRequestByIDRes, RentalRequestRes } from "@/models/request";
import RequestService from "@/services/RequestService";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface RequestProps {
  requestID: number | null;
}

const Request = ({ requestID }: RequestProps) => {
  const [cookies] = useCookies(["token"]);
  const [selectedRequest, setSelectedRequest] =
    useState<number | null>(null);
  
  const [request, setRequest] = useState<RentalRequestByIDRes>();

    useEffect(() => {
      const fetchRequest = async () => {
        const requestService = new RequestService();
        const res = await requestService.getRentalRequestByID(
          cookies.token,
          selectedRequest
        );
        setRequest(res.data.data);
      };
      fetchRequest();
    }, [selectedRequest]);

    console.log(request)
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4 grid grid-cols-3 gap-6 w-[1100px]">
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
