import { Button } from "antd";

type UtilitiesButtonProps = {
  name: string;
  icon: string; 
  active?: boolean; 
  onClick: () => void;
};

const UtilitiesButton = (prop: UtilitiesButtonProps) => {
  return (
    <Button
      className={`flex items-center justify-center w-28 h-12 rounded-lg text-gray-40 font-semibold border ${
        prop.active ? "bg-blue-80 text-blue-40" : "bg-gray-80 text-gray-40"
      } hover:bg-blue-50`}
      onClick={prop.onClick}
    >
      <div className={`flex items-center gap-1 ${prop.active ? "text-blue-40" : "text-gray-40"}`}>
        <img
          src={prop.icon}
          alt=""
          className="bg-current"
        />
        <span>{prop.name}</span>
      </div>
    </Button>
  );
};

export default UtilitiesButton;
