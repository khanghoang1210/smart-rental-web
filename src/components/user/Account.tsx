import React, { useEffect, useState } from "react";
import { Input, Button, message, Upload, Spin, Modal } from "antd";
import { EditFilled } from "@ant-design/icons";
import { BankRes } from "@/models/payment";
import PaymentService from "@/services/PaymentService";
import { toast } from "sonner";
import { useCookies } from "react-cookie";


const Account: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [banks, setBanks] = useState<BankRes[]>([])
  const [filteredBanks, setFilteredBanks] = useState<BankRes[]>([]);
  const [searchBank, setSearchBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Lê Bảo Như",
    phoneNumber: "0987654321",
    address: "Thủ Đức, TPHCM",
    gender: "Nữ",
    birthYear: "2003",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    accountNumber: "",
    accountName: "",
    bank: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    setPaymentInfo({ ...paymentInfo, [field]: value });
  };

  useEffect(() => {
    if (isModalOpen && banks.length === 0) {
      fetchAllBanks();
    }
  }, [isModalOpen]);

  const fetchAllBanks = async () => {
    setIsLoading(true);
    try {
      const paymentService = new PaymentService();
      const response = await paymentService.getAllBanks(token);
      setBanks(response.data.data);
      setFilteredBanks(response.data.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchBank(value);
    const filtered = banks.filter((bank) =>
      bank.short_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  const handleSelectBank = (bank: string) => {
    setPaymentInfo({ ...paymentInfo, bank });
    setIsModalOpen(false);
  };

  const handleEditMode = (field: string) => {
    setEditMode(field);
  };

  const handleSubmit = () => {
    if (!paymentInfo.accountNumber || !paymentInfo.accountName || !paymentInfo.bank) {
      message.error("Vui lòng điền đầy đủ thông tin thanh toán.");
      return;
    }
    message.success("Thông tin thanh toán đã được cập nhật!");
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      message.success(`${file.name} đã được tải lên.`);
      return false;
    },
  };

  return (<>
    <div className="flex justify-center p-8 w-[1300px] gap-10">
        
      {/* Left: Personal Information */}
      <div className="w-[45%] bg-white rounded-lg border border-blue-95 p-6 mr-4">
        <h2 className="text-base font-semibold mb-4 text-gray-20">Thông tin cá nhân</h2>
        <div className="text-start mb-6 cursor-pointer">
          <Upload {...uploadProps} showUploadList={false}>
            <div className="relative w-24 h-24 mx-auto">
              <img
                src="https://via.placeholder.com/80"
                alt="Avatar"
                className="rounded-full w-24 h-24 object-cover"
              />
              <Button
                icon={<EditFilled  className="text-[#fff]"/>}
                className="absolute bottom-0 right-0 rounded-full bg-blue-40 text-white border border-[#fff]"
              />
            </div>
          </Upload>
        </div>
        <div>
          <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4" onClick={() => handleEditMode("fullName")}>
            <p className="font-medium text-xs text-gray-40">Họ tên</p>
            {editMode === "fullName" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={personalInfo.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
              <p className="font-semibold text-sm text-blue-40">{personalInfo.fullName}</p>
            )}
          </div>
          <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4" onClick={() => handleEditMode("phoneNumber")}>
            <p className="font-medium text-xs text-gray-40">Số điện thoại</p>
            {editMode === "phoneNumber" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={personalInfo.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
            <p className="font-semibold text-sm text-blue-40" > {personalInfo.phoneNumber}</p>
            )}
          </div>
          <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4" onClick={() => handleEditMode("address")}>
            <p className="font-medium text-xs text-gray-40">Địa chỉ</p>
            {editMode === "address" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={personalInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
            <p className="font-semibold text-sm text-blue-40" > {personalInfo.address}</p>
            )}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
                <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4" onClick={() => handleEditMode("gender")}>
                    <p className="font-medium text-xs text-gray-40">Giới tính</p>
                    {editMode === "gender" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={personalInfo.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
                    <p className="font-semibold text-sm text-blue-40" > {personalInfo.gender}</p>
                )}
                </div>
            
            </div>
            <div className="w-1/2">
                <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4" onClick={() => handleEditMode("birthYear")}>
                    <p className="font-medium text-xs text-gray-40">Năm sinh</p>
                    {editMode === "birthYear" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={personalInfo.birthYear}
                onChange={(e) => handleInputChange("birthYear", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
                    <p className="font-semibold text-sm text-blue-40" > {personalInfo.birthYear}</p>
            )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Payment Information */}
      <div className="w-[58%] bg-white ">
        <div className=" border border-blue-95 rounded-lg p-6">
            <h2 className="text-base font-semibold mb-4 text-gray-20">Thông tin thanh toán</h2>
            <div className="p-2 bg-red-100 border border-red text-red text-xs rounded mb-10">
            Vui lòng cập nhật thông tin tài khoản ngân hàng của bạn để nhận các khoản thanh toán một cách nhanh chóng!
            </div>
            <div>
            <div className="bg-gray-90 px-5 py-2 rounded-lg mb-6" onClick={() => handleEditMode("accountNumber")}>
            <p className="font-medium text-gray-40 text-xs">Số tài khoản</p>
            {editMode === "accountNumber" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={paymentInfo.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
                    <p className="font-semibold text-sm text-blue-40" > {paymentInfo.accountNumber || "Chưa cập nhật"}</p>
            )}
    
            </div>
            <div className="bg-gray-90 px-5 py-2 rounded-lg mb-6" onClick={() => handleEditMode("accountName")}>
            <p className="font-medium text-gray-40 text-xs">Tên tài khoản (Tiếng Việt không dấu, viết hoa)</p>
            {editMode === "accountName" ? (
              <input
                className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                value={paymentInfo.accountName}
                onChange={(e) => handleInputChange("accountName", e.target.value)}
                onBlur={() => setEditMode(null)} 
                autoFocus
              />
            ) : (
                    <p className="font-semibold text-sm text-blue-40" > {paymentInfo.accountName || "Chưa cập nhật"}</p>
            )}
            </div>

            <div onClick={() => setIsModalOpen(true)} className="bg-gray-90 px-5 py-2 rounded-lg mb-6 cursor-pointer">
                <p className="font-medium text-gray-40 text-xs">Ngân hàng</p>
                <p className="font-semibold text-sm text-blue-40">{paymentInfo.bank || "Chọn ngân hàng"}</p>
            </div>
          </div>
          
        </div>
        <Button
            type="primary"
            onClick={handleSubmit}
            className="w-1/2 bg-blue-60 mt-10 py-6 rounded-[100px] text-[#fff] font-semibold"
          >
            Lưu thông tin
          </Button>
      </div>
    </div>
    <Modal
        title={<label className="text-gray-20">Chọn ngân hàng</label>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Input
          placeholder="Tìm kiếm ngân hàng"
          value={searchBank}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-4"
        />
        <div className="overflow-y-auto max-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Spin />
            </div>
          ) : (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => handleSelectBank(bank.bank_name)}
              > <div className="flex space-x-4 items-center">
                    <div>
                        <img src={bank.logo} alt="" className="w-20 h-10 object-contain"/>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-gray-20">{bank.short_name}</p>
                        <p className="text-xs text-gray-40">{bank.bank_name}</p>
                    </div>
                </div>
                
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
};

export default Account;
