import SearchBar from "../../ui/SearchBar";
import notiIcon from "../../assets/noti.svg";
import bellIcon from "../../assets/bell.svg";
import PersonalButton from "../../ui/PersonalButton";
import { AutoCompleteProps } from "antd";
import { useState } from "react";

// type TopbarProps = {
//   name: string;
//   role: string;
// };
const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Navbar = () => {
  // const [value, setValue] = useState('');
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  // const onChange = (data: string) => {
  //   setValue(data);

  // };
  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
  return (
    <nav className="relative flex justify-center items-center w-full mt-4 pb-2 border-b border-gray-80">
      <div className="px-24">
        {" "}
        <p>Smart Rental</p>
      </div>
      <SearchBar
        placeHolder="Tìm kiếm"
        onSearch={(text) => setOptions(getPanelValue(text))}
        onSelect={onSelect}
        options={options}
      />

      <button>
        <img src={notiIcon} alt="" className="pl-32 pr-10" />
      </button>
      <button>
        <img src={bellIcon} alt="" className="pr-24" />
      </button>
      <PersonalButton
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
        name="Sang Mỹ"
        role="Khách thuê"
      />
    </nav>
  );
};
export default Navbar;
