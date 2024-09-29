import { Button } from "antd";


type PrimaryButtonProps = {
    name: string;
}
const PrimaryButton = (prop: PrimaryButtonProps) => {
    return (
      <Button className="bg-blue-40 hover:bg-blue-10 rounded-lg text-gray-90 px-5 py-4"  >{prop.name}</Button>
    );
  }
  
  export default PrimaryButton;
  