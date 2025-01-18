import heart from "../../assets/heart.png";
import kho from "../../assets/kho_luu_tru.png";
import phongdang from "../../assets/phong_da_dang.png";
import phongduyet from "../../assets/phong_cho_duyet.png";
import contract from "../../assets/chukycanhan.png";
import yeucau from "../../assets/yeucauthue.png";
import chiso from "../../assets/chisodiennuoc.png";
import hoadon from "../../assets/hoadon.png";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  return (
    <div className="flex justify-center items-center p-8 w-[1300px] gap-10">
      <div className="w-1/3">
        <h1 className="text-2xl font-semibold mb-8">Phòng của bạn</h1>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[
            { title: "Phòng yêu thích", icon: heart, path: "/room/favorite" },
            { title: "Kho lưu trữ", icon: kho, path: "/room/favorite" },
            { title: "Phòng đã đăng", icon: phongdang, path: "/room/posted" },
            {
              title: "Phòng chờ duyệt",
              icon: phongduyet,
              path: "/room/favorite",
            },
          ].map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="bg-blue-40 text-[#fff] rounded-lg px-4 py-9 flex flex-col cursor-pointer items-start justify-center hover:bg-blue-60 transition"
            >
              <img src={item.icon} alt="" className="w-20 h-20" />
              <span className="text-lg">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[50%] rounded-lg p-6 border border-blue-95 mt-10 ">
        <h2 className="text-lg font-semibold mb-4 text-gray-20">
          Quản lý tài nguyên
        </h2>
        <ul>
          {[
            { title: "Hợp đồng thuê trọ", icon: contract, path: "/contract" },
            { title: "Yêu cầu thuê trọ", icon: yeucau, path: "/request" },
            { title: "Yêu cầu trả phòng", icon: yeucau, path: "/return-request" },
            { title: "Chỉ số điện nước", icon: chiso, path: "/index" },
            {
              title: "Hoá đơn thu tiền",
              icon: hoadon,
              path: "/invoice",
            },
          ].map((item) => (
            <li
              key={item.title}
              onClick={() => navigate(item.path)}
              className="flex items-center hover:bg-gray-90 cursor-pointer rounded-lg justify-between py-5"
            >
              <div className="flex px-4 items-center gap-5">
                <img src={item.icon} alt="" className="w-7 h-8" />
                <span className="text-gray-20">{item.title}</span>
              </div>
              <span className="text-gray-20">{">"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
