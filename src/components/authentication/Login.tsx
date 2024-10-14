import { Button, Input } from "antd";
import { LoginReq } from "../../models/auth";
import { useState } from "react";
import AuthenService from "../../services/AuthService";

const Login = () => {
  const [inputs, setInputs] = useState<LoginReq>({
    phone_number: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.phone_number || !inputs.password)
      return alert("Please fill all field");
    const authService = new AuthenService();
    try {
      const authRes = await authService.login(inputs);
      const result = authRes.data;
      if(result.errCode == 200) {
          const token = result.data.accessToken;
          console.log(token)
          // setCookie('token', token, { path: '/' })
          // router.push('/');

      }else if(result.errCode != 200){
          alert("User name or password are wrong")
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form
      className="bg-[#FFF] w-full max-w-[450px] shadow-lg rounded-[40px] p-8"
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
          className="h-[50px] focus:border-blue-60 hover:border-blue-60"
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
          className="h-[50px] focus:border-blue-60 hover:border-blue-60"
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
      >
        Đăng nhập
      </Button>
      <div className="text-center text-gray-40">
        <span>Bạn chưa có tài khoản? </span>
        <a href="#" className="text-blue-40">
          Đăng ký ngay
        </a>
      </div>
    </form>
  );
};

export default Login;
