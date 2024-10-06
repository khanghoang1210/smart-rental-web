import  { useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design reset styles
import 'tailwindcss/tailwind.css';

const NumOfPerson = () => {
  const [count, setCount] = useState(2);
  const [gender, setGender] = useState("Tất cả")

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-8 mt-8">
      <div className="flex items-center space-x-6">
        <span className="text-lg font-bold text-blue-10">Số người</span>
        <div className="flex items-center space-x-4">
          <Button
            onClick={decrement}
            className="w-[50px] h-[50px] border border-blue-60 text-blue-60 rounded-md"
          >
            -
          </Button>
          <div className="w-[100px] h-[50px] border border-gray-400 text-center rounded-md flex items-center justify-center">
            {count}
          </div>
          <Button
            onClick={increment}
            className="w-[50px] h-[50px] border border-blue-60 text-blue-60 rounded-md"
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-lg font-bold text-blue-10">Giới tính</span>
        <div className="flex space-x-7">
          <Button onClick={()=>setGender("Tất cả")} className={`${gender ==='Tất cả' ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Tất cả
          </Button>
          <Button onClick={()=>setGender("Nam")} className={`${gender ==='Nam' ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Nam
          </Button>
          <Button onClick={()=>setGender("Nữ")} className={`${gender ==='Nữ' ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Nữ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumOfPerson;
