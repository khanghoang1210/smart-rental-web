import Register from '@/components/authentication/Register';
import bg from '../../assets/authbg.png';
import Login from '../../components/authentication/Login';
import VerifyOtp from '@/components/authentication/VerifyOtp';

interface AuthProps {
  type: "login" | "register" | "verifyOtp" | "forgotPassword";
}

const Auth = (prop: AuthProps) => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-auto" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex justify-center items-center w-full h-full p-4">
        {prop.type === "login" ? <Login/> : prop.type === "register" ? <Register/> : <VerifyOtp/>}
      </div>
    </div>
  );
};

export default Auth;
