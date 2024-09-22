import { Button } from "antd";


type ButtonClickProps = {
    name: string;
}
const ButtonClick = (prop: ButtonClickProps) => {
    return (
      <Button className="bg-blue-60 hover:bg-blue-40 rounded-full text-gray-90" >{prop.name}</Button>
    );
  }
  
  export default ButtonClick;
  