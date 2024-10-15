
const UserDetail = () => {
  return (
    <div className="w-1/4 bg-white p-4 h-full">
      <div className="flex flex-col items-center mb-4">
        <div className="border-b border-gray-80 mb-12 w-full items-center justify-center flex">
          <h1 className="font-semibold text-xl text-gray-20 p-5">Chi tiết</h1>
        </div>

        <img
          src="https://via.placeholder.com/100"
          alt="User avatar"
          className="rounded-full w-20 h-20 mb-2"
        />
        <span className="text-lg font-semibold">Nam Huong</span>
        <span className="text-sm text-gray-500">Chủ nhà</span>
      </div>
      <div className="mb-4">
        <span className="text-md font-semibold text-gray-20">Danh sách phòng trọ</span>
        <div className="mt-2">
          <div className="flex items-center justify-between p-2 rounded-lg mb-2">
            <div className="flex space-x-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
                alt=""
                className="w-8 h-8"
              />
              <div className="flex flex-col">
                <span className="text-gray-20 font-semibold text-sm">
                  Tên phòng trọ
                </span>
                <span className="text-gray-60 font-semibold text-xs">
                  Địa chỉ phòng trọ
                </span>
              </div>
            </div>

            <button className="text-[#FFF] bg-blue-40 p-2 rounded-[4px] w-14 px-2 py-1 ">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
