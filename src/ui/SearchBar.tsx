import searchIcon from "../assets/search.svg"
import { Input } from "antd";

type SearchBarProps = {
  placeHolder: string;
};

const SearchBar = (prop: SearchBarProps) => {
  return (
    <Input
      className="w-1/3 h-10 bg-blue-98"
      suffix={
        <div className="rounded-full bg-blue-40  w-7 h-7 items-center flex justify-center">
        <img src={searchIcon} alt="Search Icon" />
      </div>
      }
      placeholder={prop.placeHolder}
    />
  );
};
export default SearchBar;
