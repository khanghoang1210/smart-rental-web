import SearchBar from "../../ui/SearchBar";
import notiIcon from "../../assets/noti.svg";
import bellIcon from "../../assets/bell.svg";
import user from "../../assets/user.png";
import home from "../../assets/home.png";
import eye from "../../assets/eye.png";
import logout from "../../assets/logout.png";
import PersonalButton from "../../ui/PersonalButton";
import { AutoCompleteProps } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import cities from "../../assets/data/cities.json";
import districts from "../../assets/data/districts.json";
import wards from "../../assets/data/wards.json";
import RoomService from "@/services/RoomService";
import { RoomRes } from "@/models/room";
import { toast } from "sonner";
import { useAppStore } from "@/store";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";
import { useCookies } from "react-cookie";
import { customStorage } from "@/utils/localStorage";

interface NavbarProps {
  searchKey?: string;
}
const Navbar = (prop: NavbarProps) => {
  const { userInfo, clearUserInfo } = useAppStore();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [cookies, , removeCookie] = useCookies(["token"]);

  const [, setRoomData] = useState<RoomRes[]>([]);
  const combinedData = [
    ...cities.map((item) => item.name_with_type),
    ...districts.map((item) => item.path_with_type),
    ...wards.map((item) => item.path_with_type),
  ];

  const callApiAndNavigate = async (value: string) => {
    console.log("Call API with value:", value);
    setRoomData([]);
    try {
      const roomService = new RoomService();
      const response = await roomService.searchByAddress(value);

      if (response && response.data) {
        console.log("Room Data:", response.data);

        setRoomData(response.data);

        navigate(`/filter?search=${encodeURIComponent(value)}`, {
          state: { roomData: response.data.data.rooms },
          replace: true,
        });
      } else {
        console.warn("Không tìm thấy dữ liệu phòng");
        setRoomData([]);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    if (prop.searchKey !== undefined) {
      setSearchText(prop.searchKey);
    }
  }, [prop.searchKey]);

  const onSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setOptions([]);
      return;
    }

    const normalizedText = text.toLowerCase().trim();

    const filteredOptions = combinedData
      .filter((entry) => {
        const normalizedEntry = entry.toLowerCase();
        return normalizedText
          .split(" ")
          .every((word) => normalizedEntry.includes(word));
      })
      .slice(0, 10)
      .map((item) => ({
        value: item,
      }));

    setOptions(filteredOptions);
  };

  const onSelect = async (value: string) => {
    console.log("onSelect", value);
    await callApiAndNavigate(value);
    setSearchText(value);
  };

  const onPressEnter = async () => {
    if (searchText.trim() === "") {
      toast.error("Vui lòng nhập nội dung tìm kiếm");
      return;
    }
    await callApiAndNavigate(searchText);
  };
  const navigate = useNavigate();

  const onClickLogout = () => {
    removeCookie("token");
    clearUserInfo();
    customStorage.removeItem("currentUser");
    navigate("/auth/login");
  };
  const onClickHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDropdownVisible(false);
  };

  const handleButtonClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleOpenMessage = () => {
    navigate("/chat");
  };

  const handleClickLogin = () => {
    navigate("/auth/login");
  };
  console.log(searchText);
  return (
    <div>
      <nav className="relative flex justify-center items-center w-full mt-4 pb-2 border-b border-gray-80">
        <div className="px-24 cursor-pointer" onClick={() => onClickHome()}>
          {" "}
          <p>Smart Rental</p>
        </div>
        <SearchBar
          placeHolder="Tìm kiếm"
          onSearch={onSearch}
          onSelect={onSelect}
          options={options}
          onPressEnter={onPressEnter}
          value={searchText}
        />

        <button onClick={handleOpenMessage}>
          <img src={notiIcon} alt="" className="pl-32 pr-10" />
        </button>
        <button>
          <img src={bellIcon} alt="" className="pr-24" />
        </button>
        {/* PersonalButton */}
        <div className="relative ">
          <div
            className="cursor-pointer"
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            {userInfo ? (
              <PersonalButton
                avatarUrl={userInfo?.avatar_url || USER_DEFAULT_AVATAR}
                name={userInfo?.full_name}
                role={
                  userInfo?.role === 1
                    ? "Chủ nhà"
                    : userInfo?.role === 0
                      ? "Khách thuê"
                      : ""
                }
              />
            ) : (
              <div
                onClick={handleClickLogin}
                className="flex items-center text-blue-60 space-x-4 px-4 py-1 rounded-lg border border-gray-80 shadow-sm"
              >
                Đăng nhập
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute -right-50 top-14 text-gray-20 text-sm font-medium shadow-lg rounded-[20px] px-1 py-2 z-10 w-[235px] bg-[#fff]"
            >
              <div
                className="flex border-b items-center space-x-2 px-2 py-3 cursor-pointer rounded-lg hover:bg-gray-90"
                onClick={() => handleMenuClick("/account")}
              >
                <img src={user} alt="Tài khoản" className="w-5 h-5 mr-2" />
                <span>Tài khoản</span>
              </div>
              <div
                className="flex border-b items-center  space-x-2  px-2 py-3 cursor-pointer rounded-lg hover:bg-gray-90"
                onClick={() => handleMenuClick("/dashboard")}
              >
                <img src={home} alt="Phòng" className="w-5 h-5 mr-2" />
                <span>Phòng của bạn</span>
              </div>
              <div
                className="border-b flex space-x-2 items-center  px-2 py-3 cursor-pointer rounded-lg hover:bg-gray-90"
                onClick={() => handleMenuClick("/process-tracking")}
              >
                <img src={eye} alt="Theo dõi" className="w-5 h-4 mr-2" />
                <span>Theo dõi quá trình thuê trọ</span>
              </div>
              <div
                className="flex items-center  space-x-2 px-2  py-3 cursor-pointer rounded-lg hover:bg-gray-90"
                onClick={onClickLogout}
              >
                <img src={logout} alt="Đăng xuất" className="w-5 h-5 mr-2" />
                <span>Đăng xuất</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
