import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Input } from "antd";

const PriceRange = () => {
  const [price, setPrice] = useState([0, 1000000]);

  const handleSliderChange = (newPrice: number | number[]) => {
    if (Array.isArray(newPrice)) {
      setPrice(newPrice);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4 text-blue-10">Giá cả</h2>
      <div className="flex items-center justify-between mb-4 space-x-9">
        <div>
          <label className="block mb-2 font-semibold  text-gray-20">Từ</label>
          <Input
            
            name="min"
            id="minPrice"
            value={price[0]}
            suffix="đ"
            onChange={(e) =>
              handleSliderChange([Number(e.target.value), price[1]])
            }
            className="w-[160px] px-3 py-2 border border-gray-40 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-20">Đến</label>
          <Input
            name="max"
            id="maxPrice"
            value={price[1]}
            suffix="đ"
            onChange={(e) =>
              handleSliderChange([price[0], Number(e.target.value)])
            }
            className="w-[160px] px-3 py-2 border border-gray-40 rounded"
          />
        </div>
      </div>
      <div className="px-1 mb-4">
        <Slider
          className="w-[340px]"
          range
          min={0}
          max={10000000}
          step={500000}
          value={price}
          onChange={handleSliderChange}
          styles={{
            track: { backgroundColor: "#0077B6", height: 8 },
            handle: {
              backgroundColor: "#0077B6",
              borderColor: "#0077B6",
              height: 20,
              width: 20,
              marginTop: -6,
            },
            rail: { backgroundColor: "#CAF0F8", height: 8 },
          }}
        />
      </div>
    </div>
  );
};

export default PriceRange;
