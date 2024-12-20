import searchIcon from "../assets/search.svg";
import { AutoComplete, AutoCompleteProps, Input } from "antd";

type SearchBarProps = {
  placeHolder: string;
  options: AutoCompleteProps["options"];
  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  onPressEnter: () => void;
  value: string;
};

const SearchBar = (prop: SearchBarProps) => {
  console.log(prop.value)
  return (
    <AutoComplete
      className="w-1/3"
      options={prop.options}
      onSelect={prop.onSelect}
      onSearch={prop.onSearch}
      value={prop.value}
      style={{ width: "100%" }}
    >
      <Input
        className="h-10 bg-blue-98 border-none rounded-md"
        onPressEnter={prop.onPressEnter}
        suffix={
          <div className="rounded-full bg-blue-40 w-7 h-7 items-center flex justify-center">
            <img src={searchIcon} alt="Search Icon" />
          </div>
        }
        placeholder={prop.placeHolder}
      />
    </AutoComplete>
  );
};
export default SearchBar;
