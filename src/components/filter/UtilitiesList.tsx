import wc from "../../assets/wc.svg";
import win from "../../assets/bed.svg";
import wifi from "../../assets/wifi.svg";
import kitchen from "../../assets/kitchen.svg";
import refri from "../../assets/refrigerator.svg";
import laundry from "../../assets/laundry.svg";
import bike from "../../assets/bike.svg";
import clock from "../../assets/clock.svg";
import churieng from "../../assets/churieng.svg";
import secure from "../../assets/secure.svg";
import gaclung from "../../assets/gaclung.svg";
import bed from "../../assets/bed.svg";
import pet from "../../assets/pet.svg";
import tudo from "../../assets/tudo.svg";
import snow from "../../assets/snow.svg";
import UtilitiesButton from "../../ui/UtilitiesButton";
import { useState } from "react";

const UtilitiesData = [
  { id: 1, name: "WC riêng", icon: wc },
  { id: 2, name: "Cửa sổ", icon: win },
  { id: 3, name: "Wifi", icon: wifi },
  { id: 4, name: "Nhà bếp", icon: kitchen },
  { id: 5, name: "Máy giặt", icon: laundry },
  { id: 6, name: "Tủ lạnh", icon: refri },
  { id: 7, name: "Chỗ để xe", icon: bike },
  { id: 8, name: "Tự do", icon: clock },
  { id: 9, name: "Chủ riêng", icon: churieng },
  { id: 10, name: "An ninh", icon: secure, active: true },
  { id: 11, name: "Thú cưng", icon: pet, active: true },
  { id: 12, name: "Gác lửng", icon: gaclung },
  { id: 13, name: "Giường", icon: bed },
  { id: 14, name: "Tủ đồ", icon: tudo },
  { id: 15, name: "Máy lạnh", icon: snow },
];
const UtilitiesList = () => {
  const [activeStates, setActiveStates] = useState(
    UtilitiesData.reduce(
      (acc, utility) => {
        acc[utility.id] = false;
        return acc;
      },
      {} as { [key: number]: boolean }
    )
  );

  const toggleActive = (id: number) => {
    setActiveStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      {UtilitiesData.map((utility) => (
        <UtilitiesButton
          key={utility.id}
          name={utility.name}
          icon={utility.icon}
          active={activeStates[utility.id]}
          onClick={() => toggleActive(utility.id)}
        />
      ))}
    </div>
  );
};
export default UtilitiesList;
