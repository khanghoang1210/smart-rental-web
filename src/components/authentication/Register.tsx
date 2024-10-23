import { Button, Input } from "antd";
import { RegisterReq } from "../../models/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState<RegisterReq>({
    phone_number: "",
    full_name: "",
    address: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.phone_number || !inputs.password) {
      toast.error("Vui lòng nhập số điện thoại hoặc mật khẩu");
      return false;
    }

    // const authService = new AuthenService();
  };
  return (
    <form
      className="bg-[#FFF] w-full max-w-[500px] shadow-lg rounded-[40px] p-8"
      onSubmit={handleRegister}
    >
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-normal text-gray-20">Tạo tài khoản mới</h2>
        <h1 className="text-[40px] font-medium">Đăng ký</h1>
      </div>

      <div className="mb-6">
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-20 mb-1"
        >
          Họ và tên
        </label>
        <Input
          onChange={handleChangeInput}
          placeholder="Nhập họ và tên"
          id="full_name"
          name="full_name"
          size="large"
          className="h-[40px] focus:border-blue-60 hover:border-blue-60"
        />
      </div>
      <div className="flex mb-6 space-x-5">
        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-20 mb-1"
          >
            Số điện thoại
          </label>
          <Input
            onChange={handleChangeInput}
            placeholder="Nhập số điện thoại"
            id="phone_number"
            name="phone_number"
            size="large"
            className="h-[40px] focus:border-blue-60 hover:border-blue-60"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-20 mb-1"
          >
            Địa chỉ hiện tại
          </label>
          <Input
            onChange={handleChangeInput}
            placeholder="Nhập địa chỉ"
            id="address"
            name="address"
            size="large"
            className="h-[40px] focus:border-blue-60 hover:border-blue-60"
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-20 mb-1"
        >
          Mật khẩu
        </label>
        <Input.Password
          onChange={handleChangeInput}
          placeholder="Nhập mật khẩu"
          id="password"
          name="password"
          size="large"
          className="h-[40px] focus:border-blue-60 hover:border-blue-60"
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full h-14 mb-10 bg-blue-40"
        size="large"
      >
        Đăng ký
      </Button>
      <div className="text-center text-gray-40">
        <span>Bạn đã có tài khoản? </span>
        <Link to="/auth/login" className="text-blue-40">
          Đăng nhập ngay
        </Link>
      </div>
    </form>
  );
};

export default Register;
