import { Button } from "antd";


type ButtonAddProps = {
    name: string;
};

const ButtonAdd = (prop:ButtonAddProps) => {
    
    return (
    <>
        <Button className="bg-blue-60 hover:bg-blue-40 rounded-full text-gray-90"> +  {prop.name}</Button>
    </>
    )
}
export default ButtonAdd;