import { Button, Input, Spin } from "antd";
import { LoginReq } from "../../models/auth";
import { useState } from "react";
import AuthenService from "../../services/AuthService";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import UserService from "@/services/UserService";
import { useAppStore } from "@/store";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<LoginReq>({
    phone_number: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.phone_number || !inputs.password) {
      toast.error("Vui lòng nhập số điện thoại hoặc mật khẩu");
      return false;
    }
    setLoading(true);
    const authService = new AuthenService();
    const userService = new UserService();
    try {
      const authRes = await authService.login(inputs);
      const result = authRes.data;
      const token = result.data.accessToken;
      const userRes = await userService.getCurrentUser(token);
      console.log(userRes.data.data)
      setUserInfo(userRes.data.data);
      toast.success("Đăng nhập thành công");

      setCookie("token", token, { path: "/" });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false); 
    }
  };
  return (
    <form
      className="bg-[#FFF] w-full max-w-[500px] shadow-lg rounded-[40px] p-8"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-normal text-gray-20">
          Chào mừng bạn trở lại
        </h2>
        <h1 className="text-[40px] font-medium">Đăng nhập</h1>
      </div>

      <div className="mb-6">
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
      <div className="text-right mb-6">
        <a href="#" className="text-blue-10">
          Quên mật khẩu?
        </a>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full h-14 mb-10 bg-blue-40"
        size="large"
        disabled={loading}
      >
        {loading ? <Spin /> : "Đăng nhập"}
      </Button>
      <div className="text-center text-gray-40">
        <span>Bạn chưa có tài khoản? </span>
        <Link to="/auth/register" className="text-blue-40">
          Đăng ký ngay
        </Link>
      </div>
    </form>
  );
};

export default Login;
