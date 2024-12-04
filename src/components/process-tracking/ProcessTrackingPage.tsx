import React, { useState } from "react";

const ProcessTrackingPage = () => {
  // Mock data for items and details
  const items = [
    {
      id: 1,
      title: "HOMESTAY DOOM MẶT ...",
      price: "1.6 triệu VND/người",
      address: "Khối 5, thị trấn Đức Thọ",
      time: "12:45 06/08/2024",
      status: "Hợp đồng thuê trọ đã sẵn sàng",
    },
    {
      id: 2,
      title: "HOMESTAY DOOM MẶT ...",
      price: "1.6 triệu VND/người",
      address: "Khối 5, thị trấn Đức Thọ",
      time: "12:45 06/08/2024",
      status: "Yêu cầu thuê phòng đã được gửi",
    },
  ];

  const [, setSelectedItem] = useState(items[0]);

  const statusDetails = [
    {
      date: "13/08/2024",
      time: "09:50",
      actor:"",
      description: "Quá trình thuê trọ hoàn tất",
      isComplete: false,
    },
    {
      date: "13/08/2024",
      time: "09:50",
      actor:"Bạn",
      description: "Đã ký hợp đồng và thanh toán tiền đặt cọc",
      isComplete: true,
    },
    {
      date: "13/08/2024",
      time: "09:50",
      actor: "Nguyễn Xuân Hoàng - Chủ nhà",
      description: "Đã tạo hợp đồng thuê trọ",
      isComplete: true,
    },
    {
      date: "13/08/2024",
      time: "09:50",
      actor:"Nguyễn Xuân Hoàng - Chủ nhà",
      description:
        "Đã tiếp nhận yêu cầu thuê trọ của bạn",
      isComplete: true,
    },
    {
      date: "13/08/2024",
      time: "09:50",
      actor: "Bạn",
      description: "Đã gửi yêu cầu thuê trọ",
      isComplete: true,
    },
  ];
  

  return (
    <div className="flex space-x-6 p-6 mt-6">
      {/* Left: Tracking Items */}
      <div className="w-[45%] space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-[20px] cursor-pointer text-[#fff] bg-blue-40 text-white`}
            onClick={() => setSelectedItem(item)}
          >
            <div className="flex space-x-4 border-b border-[#fff]">
              <div>
                <img
                  src="https://via.placeholder.com/150"
                  alt=""
                  className="w-14 h-14 rounded-lg"
                />
              </div>
              <div>
                <div className="flex space-x-20 items-center">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <button className="bg-opacity-30 bg-[#FFF] text-sm font-semibold px-2 py-1 rounded-[50px] ">
                    Chi tiết
                  </button>
                </div>
                <p className="text-sm">{item.price}</p>
                <p className="text-xs mb-4">{item.address}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-xs font-medium">Trạng thái</p>
              <p className="text-xs">{item.time}</p>
            </div>
            <p className="text-sm mt-2">{item.status}</p>
          </div>
        ))}
      </div>

      {/* Right: Details */}
      <div className="w-2/3 space-y-6">
        {/* Property Details */}
        <div className="p-6 bg-white rounded-lg border border-blue-95">
          <h1 className="mb-4 text-gray-20">Thông tin phòng trọ</h1>
          <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Room"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-lg">
                Tên phòng trọ được hiển thị tối đa 2 dòng
              </h3>
              <p className="text-gray-500 text-sm">
                Địa chỉ phòng trọ được hiển thị tối đa 2 dòng
              </p>
              <p className="text-blue-60 font-bold text-lg mt-2">
                2.000.000 đ/phòng
              </p>
            </div>
          </div>
        </div>

        {/* Status Tracking */}
        <div className="p-6 bg-white rounded-lg border border-blue-95">
          <h3 className="font-semibold text-gray-20 text-lg mb-4">
            Chi tiết trạng thái
          </h3>
          <div className="relative space-y-8">
            {statusDetails.map((detail, index) => (
              <div key={index} className="flex items-center ">
                {/* Date and Time */}
                <div className="w-[100px] flex-shrink-0 text-right pr-4">
                  <p className="text-sm font-medium text-gray-40">{detail.date}</p>
                  <p className="text-sm text-gray-40">{detail.time}</p>
                </div>

                {/* Vertical Line and Circle */}
                <div className="relative flex flex-col items-center">
                  {/* Status Circle */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      detail.isComplete
                        ? "bg-blue-4 text-white"
                        : detail.isComplete
                          ? "bg-gray-300"
                          : "bg-gray-200"
                    }`}
                  >
                    {detail.isComplete ? (
                      <div className="bg-gray-40 w-3 h-3 rounded-full"></div>
                    ) : (
                      <div className="bg-blue-40 w-3 h-3 rounded-full"></div>
                    )}
                  </div>
                  {/* Vertical Line */}
                  {index !== statusDetails.length - 1 && (
                    <div
                      className="absolute top-[24px] bottom-6 w-[2px]"
                      style={{
                        height: "calc(100% + 20px)",
                        backgroundColor: detail.isComplete
                          ? "#878787"
                          : "#0077B6",
                      }}
                    ></div>
                  )}
                </div>

                {/* Status Details */}
                <div className="ml-4 flex-shrink-0">
                    <p className="text-xs font-medium text-gray-40">{detail.actor}</p>
                  <p className="text-sm font-semibold text-gray-20">{detail.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTrackingPage;
