import React, { useEffect, useState } from "react";
import { Input, Button, message, Upload, Spin, Modal, DatePicker } from "antd";
import { EditFilled } from "@ant-design/icons";
import { BankRes } from "@/models/payment";
import PaymentService from "@/services/PaymentService";
import { toast } from "sonner";
import { useCookies } from "react-cookie";
import { useAppStore } from "@/store";
import UserService from "@/services/UserService";
import { BankInfoRes } from "@/models/user";
import { convertDate } from "@/utils/converter";
import dayjs from "dayjs";
import { UserInfo } from "@/store/slice/authSlice";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";

const Account: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const { userInfo } = useAppStore();
  const [bankInfo, setBankInfo] = useState<BankInfoRes | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [banks, setBanks] = useState<BankRes[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<BankRes[]>([]);
  const [searchBank, setSearchBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBanksLoading, setIsBanksLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    avatarUrl: userInfo?.avatar_url,
    fullName: userInfo?.full_name,
    phoneNumber: userInfo?.phone_number,
    address: userInfo?.address,
    role: userInfo?.role,
    gender: userInfo?.gender === 1 ? "Nam" : "Nữ",
    birthYear: userInfo?.dob,
  });

  console.log(personalInfo.birthYear);
  const fetchBankInfo = async () => {
    const token = cookies.token;
    if (!token) {
      toast.error("Không tìm thấy token, vui lòng đăng nhập lại!");
      return;
    }
    try {
      const userService = new UserService();
      const response = await userService.getBankInfoByUser(token);
      if (!response.data.data) setBankInfo(null);
      setBankInfo(response.data.data);
    } catch (error: any) {
      toast.error(
        error.message || "Đã xảy ra lỗi khi tải thông tin ngân hàng."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBankInfo();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setBankInfo(
      (prevState) =>
        ({
          ...prevState,
          [field]: value,
        }) as BankInfoRes
    );
  };

  useEffect(() => {
    if (isModalOpen && banks.length === 0) {
      fetchAllBanks();
    }
  }, [isModalOpen]);

  const fetchAllBanks = async () => {
    const paymentService = new PaymentService();
    try {
      setIsBanksLoading(true);
      const response = await paymentService.getAllBanks(token);
      setBanks(response.data.data);
      setFilteredBanks(response.data.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsBanksLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchBank(value);
    const filtered = banks.filter((bank) =>
      bank.short_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBanks(filtered);
  };

  const handleSelectBank = (bankName: string) => {
    setBankInfo(
      (prevState) =>
        ({
          ...prevState,
          bank_name: bankName,
          bank_id: banks.find((bank) => bank.bank_name === bankName)?.id,
        }) as BankInfoRes
    );
    setIsModalOpen(false);
  };

  const handleEditToggle = () => {
    if (editMode) {
      handleUpdateInfo();
      handleUpdateBankInfo();
    } else {
      setEditMode(true);
    }
  };

  const handleUpdateInfo = async () => {
    setIsLoading(true);
    try {
      const userService = new UserService();

      console.log(fileList);
      const formData = new FormData();
      formData.append("id", userInfo?.id.toString() || ""); // ID người dùng
      formData.append("phone_number", personalInfo.phoneNumber || "");
      formData.append("full_name", personalInfo.fullName || "");
      formData.append("address", personalInfo.address || "");
      formData.append("gender", personalInfo.gender === "Nam" ? "1" : "2");
      formData.append("dob", personalInfo.birthYear || "");

      formData.append("role", userInfo?.role.toString() || "");
      if (fileList && fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("avatar_url", file.originFileObj);
          }
        });
      }

      await userService.updateUserInfo(token, formData);
      const response = await userService.getCurrentUser(token);
      const updatedUserInfo: UserInfo = response.data.data;
      useAppStore.getState().setUserInfo(updatedUserInfo);
      toast.success("Thông tin cá nhân đã được cập nhật!");
      setEditMode(false);
      setFileList([]);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBankInfo = async () => {
    setIsLoading(true);
    try {
      const userService = new UserService();

      // Tạo payload cho API
      const payload = {
        bank_id: bankInfo?.bank_id, // ID ngân hàng
        account_number: bankInfo?.account_number || "", // Số tài khoản
        card_number: "", // Số thẻ (nếu có)
        account_name: bankInfo?.account_name || "", // Tên tài khoản
        currency: "VND", // Đơn vị tiền tệ
      };

      // Gửi yêu cầu cập nhật
      await userService.updateUserBankInfo(token, payload);
      toast.success("Thông tin ngân hàng đã được cập nhật!");
      setEditMode(false); // Tắt chế độ chỉnh sửa
    } catch (error: any) {
      toast.error(
        error.message || "Có lỗi xảy ra khi cập nhật thông tin ngân hàng."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const uploadProps = {
  //   beforeUpload: (file: File) => {
  //     message.success(`${file.name} đã được tải lên.`);
  //     return false;
  //   },
  // };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center p-8 w-[1300px] gap-10">
        {/* Left: Personal Information */}
        <div className="w-[45%] bg-white rounded-lg border border-blue-95 p-6 mr-4">
          <h2 className="text-base font-semibold mb-4 text-gray-20">
            Thông tin cá nhân
          </h2>
          <div className="text-start mb-6 cursor-pointer">
            <Upload
              onChange={(info) => setFileList(info.fileList)}
              fileList={fileList}
            >
              <div className="relative w-24 h-24 mx-auto">
                <img
                  src={userInfo?.avatar_url || USER_DEFAULT_AVATAR}
                  alt="Avatar"
                  className="rounded-full w-24 h-24 object-cover"
                />
                <Button
                  icon={<EditFilled className="text-[#fff]" />}
                  className="absolute bottom-0 right-0 rounded-full bg-blue-40 text-white border border-[#fff]"
                />
              </div>
            </Upload>
          </div>
          <div>
            <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4">
              <p className="font-medium text-xs text-gray-40">Họ tên</p>
              {editMode ? (
                <input
                  className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              ) : (
                <p className="font-semibold text-sm text-blue-40">
                  {userInfo?.full_name}
                </p>
              )}
            </div>
            <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4">
              <p className="font-medium text-xs text-gray-40">Số điện thoại</p>
              {editMode ? (
                <input
                  className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                  value={personalInfo.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  autoFocus
                />
              ) : (
                <p className="font-semibold text-sm text-blue-40">
                  {" "}
                  {userInfo?.phone_number}
                </p>
              )}
            </div>
            <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4">
              <p className="font-medium text-xs text-gray-40">Địa chỉ</p>
              {editMode ? (
                <input
                  className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                  value={personalInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="font-semibold text-sm text-blue-40">
                  {" "}
                  {userInfo?.address}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4">
                  <p className="font-medium text-xs text-gray-40">Giới tính</p>
                  {editMode ? (
                    <input
                      className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                      value={personalInfo.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      autoFocus
                    />
                  ) : (
                    <p className="font-semibold text-sm text-blue-40">
                      {" "}
                      {personalInfo.gender}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="bg-gray-90 px-5 py-2 rounded-lg mb-4">
                  <p className="font-medium text-xs text-gray-40">Ngày sinh</p>
                  {editMode ? (
                    <DatePicker
                      className="w-full focus:border-none h-3 font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                      value={
                        personalInfo.birthYear
                          ? dayjs(personalInfo.birthYear)
                          : null
                      }
                      onChange={(date) => {
                        if (date) {
                          handleInputChange(
                            "birthYear",
                            date.format("YYYY-MM-DD")
                          );
                        }
                      }}
                      format="DD/MM/YYYY"
                      allowClear={false} // Ngăn người dùng xóa ngày
                    />
                  ) : (
                    <p className="font-semibold text-sm text-blue-40">
                      {personalInfo.birthYear
                        ? dayjs(personalInfo.birthYear).format("DD/MM/YYYY")
                        : "Chưa cập nhật"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Payment Information */}
        <div className="w-[58%] bg-white ">
          <div className=" border border-blue-95 rounded-lg p-6">
            <h2 className="text-base font-semibold mb-4 text-gray-20">
              Thông tin thanh toán
            </h2>
            {!bankInfo && (
              <div className="p-2 bg-red-100 border border-red text-red text-xs rounded mb-10">
                Vui lòng cập nhật thông tin tài khoản ngân hàng của bạn để nhận
                các khoản thanh toán một cách nhanh chóng!
              </div>
            )}
            <div>
              <div className="bg-gray-90 px-5 py-2 rounded-lg mb-6">
                <p className="font-medium text-gray-40 text-xs">Số tài khoản</p>
                {editMode ? (
                  <input
                    className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                    value={bankInfo?.account_number}
                    onChange={(e) =>
                      handleInputChange("account_number", e.target.value)
                    }
                    autoFocus
                  />
                ) : (
                  <p className="font-semibold text-sm text-blue-40">
                    {" "}
                    {bankInfo?.account_number || "Chưa cập nhật"}
                  </p>
                )}
              </div>
              <div className="bg-gray-90 px-5 py-2 rounded-lg mb-6">
                <p className="font-medium text-gray-40 text-xs">
                  Tên tài khoản (Tiếng Việt không dấu, viết hoa)
                </p>
                {editMode ? (
                  <input
                    className="focus:border-none font-semibold text-sm bg-gray-90 focus:outline-none focus:ring-0 border-none text-blue-40"
                    value={bankInfo?.account_name}
                    onChange={(e) =>
                      handleInputChange("account_name", e.target.value)
                    }
                    autoFocus
                  />
                ) : (
                  <p className="font-semibold text-sm text-blue-40">
                    {" "}
                    {bankInfo?.account_name || "Chưa cập nhật"}
                  </p>
                )}
              </div>

              <div
                onClick={editMode ? () => setIsModalOpen(true) : () => {}}
                className="bg-gray-90 px-5 py-2 rounded-lg mb-6 cursor-pointer"
              >
                <p className="font-medium text-gray-40 text-xs">Ngân hàng</p>
                <p className="font-semibold text-sm text-blue-40">
                  {bankInfo?.bank_name || "Chọn ngân hàng"}
                </p>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            onClick={handleEditToggle}
            className="w-1/2 bg-blue-60 mt-10 py-6 rounded-[100px] text-[#fff] font-semibold"
          >
            {editMode ? "Lưu thông tin" : "Cập nhật thông tin"}
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
          {isBanksLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <Spin />
            </div>
          ) : (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => handleSelectBank(bank.bank_name)}
              >
                {" "}
                <div className="flex space-x-4 items-center">
                  <div>
                    <img
                      src={bank.logo}
                      alt=""
                      className="w-20 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-20">
                      {bank.short_name}
                    </p>
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
