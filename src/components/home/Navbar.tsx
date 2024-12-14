import SearchBar from "../../ui/SearchBar";
import notiIcon from "../../assets/noti.svg";
import bellIcon from "../../assets/bell.svg";
import PersonalButton from "../../ui/PersonalButton";
import { AutoCompleteProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cities from "../../assets/data/cities.json";
import districts from "../../assets/data/districts.json";
import wards from "../../assets/data/wards.json";
import RoomService from "@/services/RoomService";
import { RoomRes } from "@/models/room";
import { toast } from "sonner";
import { useAppStore } from "@/store";



const Navbar = () => {
  const {userInfo} = useAppStore();
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [, setRoomData] = useState<RoomRes[]>([]);
  const combinedData = [
    ...cities.map((item) => item.name_with_type),
    ...districts.map((item) => item.path_with_type),
    ...wards.map((item) => item.path_with_type),
  ];

  
  const callApiAndNavigate = async (value: string) => {
    console.log("Call API with value:", value);
    try {
      const roomService = new RoomService();
      const response = await roomService.searchByAddress(value);

      if (response && response.data) {
        console.log("Room Data:", response.data);

        setRoomData(response.data);

        navigate("/filter", { state: { roomData: response.data.data.rooms } });
      } else {
        console.warn("Không tìm thấy dữ liệu phòng");
        setRoomData([]);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

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
  };

  const onPressEnter = async () => {
    if (searchText.trim() === "") {
      toast.error("Vui lòng nhập nội dung tìm kiếm");
      return;
    }
    await callApiAndNavigate(searchText);
  };
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

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
        />

        <button>
          <img src={notiIcon} alt="" className="pl-32 pr-10" />
        </button>
        <button>
          <img src={bellIcon} alt="" className="pr-24" />
        </button>
        <PersonalButton
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
          name={userInfo?.full_name}
          role={userInfo?.role === 1 ? "Chủ nhà" : "Khách thuê"}
        />
      </nav>
    </div>
  );
};
export default Navbar;
