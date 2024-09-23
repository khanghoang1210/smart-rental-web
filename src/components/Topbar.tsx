import SearchBar from "../ui/SearchBar";
import notiIcon from "../assets/noti.svg";
import bellIcon from "../assets/bell.svg";
import PersonalButton from "../ui/PersonalButton";

//type TopbarProps = {};

const Topbar = () => {
  return (
    <nav className="relative flex items-center w-full mt-4">
      <div className="px-24">
        {" "}
        <p>Smart Rental</p>
      </div>
      <SearchBar placeHolder="Tìm kiếm" />
      <img src={notiIcon} alt="" className="pl-32 pr-10" />
      <img src={bellIcon} alt="" className="pr-24" />
      <PersonalButton
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
        name="Sang Mỹ"
        role="Khách thuê"
      />
    </nav>
  );
};
export default Topbar;
