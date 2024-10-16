import { Button } from "antd";

type UtilitiesButtonProps = {
  name: string;
  icon: string; 
  active?: boolean; 
  onClick?: () => void;
};

const UtilitiesButton = (prop: UtilitiesButtonProps) => {
  return (
    <Button
      className={`flex items-center border-none justify-center w-[160px] h-12 rounded-lg text-gray-40 font-semibold ${
        prop.active ? "bg-blue-98 text-blue-40" : "bg-gray-90 text-gray-40"
      } hover:bg-blue-50`}
      onClick={prop.onClick}
    >
      <div className={`flex space-x-4 items-center gap-1 ${prop.active ? "text-blue-40" : "text-gray-40"}`}>
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
