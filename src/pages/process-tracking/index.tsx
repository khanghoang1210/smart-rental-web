import Navbar from "@/components/home/Navbar";
import ProcessTrackingPage from "@/components/process-tracking/ProcessTrackingPage";

const ProcessTracking = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-start min-h-screen">
        <div className="w-[1200px]">
          <ProcessTrackingPage />
        </div>
      </div>
    </>
  );
};

export default ProcessTracking;
