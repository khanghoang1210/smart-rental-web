import bg from '../../assets/authbg.png';
import Login from '../../components/authentication/Login';

const Auth = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-auto" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex justify-center items-center w-full h-full p-4">
        <Login />
      </div>
    </div>
  );
};

export default Auth;
