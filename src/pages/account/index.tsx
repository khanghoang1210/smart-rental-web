import Navbar from "@/components/home/Navbar";
import Account from "@/components/user/Account";
import React from "react";

const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className=" flex justify-center mt-8 bg-gray-100">
        <Account />
      </div>
    </div>
  );
};

export default AccountPage;
