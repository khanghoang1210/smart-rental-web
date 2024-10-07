import bg from '../../assets/authbg.png'
import Login from '../../components/authentication/Login';

const Auth = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-full"
        src={bg}
        alt="Background"
      />
      <Login/>
    </div>
    );
};
export default Auth;
