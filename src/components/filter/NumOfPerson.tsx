import  { useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design reset styles
import 'tailwindcss/tailwind.css';

interface NumOfPersonProps {
  onGenderChange: (gender: number) => void;
  onNumOfPersonChange: (numOfPerson: number) => void;
}

const NumOfPerson: React.FC<NumOfPersonProps> = ({
  onGenderChange,
  onNumOfPersonChange,
}) => {
  const [count, setCount] = useState(2);
  const [gender, setGender] = useState(1)

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onNumOfPersonChange(newCount);
  };

  const decrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onNumOfPersonChange(newCount); // Gọi callback để cập nhật số người
    }
  };

  const handleGenderChange = (selectedGender: number) => {
    setGender(selectedGender);
    onGenderChange(selectedGender); // Gọi callback để cập nhật giới tính
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
          <Button   onClick={() => handleGenderChange(1)} className={`${gender === 1 ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Tất cả
          </Button>
          <Button  onClick={() => handleGenderChange(2)} className={`${gender === 2 ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Nam
          </Button>
          <Button onClick={() => handleGenderChange(3)} className={`${gender ===3 ?'bg-blue-40 text-[#FFF]' : 'bg-gray-90 text-gray-40'} rounded-lg w-24 h-11`}>
            Nữ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumOfPerson;
