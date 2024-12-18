import Navbar from "@/components/home/Navbar";
import Dashboard from "@/components/user/Dashboard";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className=" flex justify-center mt-4 bg-gray-100">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
