
const list = [1, 2, 3];
const RequestList = () => {
  return (
    <div className="shadow-sm rounded-lg">
      <h3 className="text-gray-20 text-xl font-bold mb-8">
        Yêu cầu thuê trọ
      </h3>
      <div className="flex items-center space-x-5">
        <h1 className="text-gray-60 text-xs font-medium">
          Số 9 Nguyễn Văn Huyên, Dịch Vọng, Cầu Giấy, Hà Nội
        </h1>
        <div className="bg-gray-90 px-3 rounded-3xl text-xs font-semibold text-gray-20">{list.length}</div>
      </div>

      <div className="mt-2 space-y-3">
        {list.map((item) => (
          <div
            className="flex justify-between items-center hover:bg-blue-98 cursor-pointer focus:border-none p-5 rounded-md border border-gray-90"
            key={item}
          >
            <div className="flex items-center space-x-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbfoE1_T9wLTh03pgANUPJ69psN0Zz2fvzQ&s"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-20 text-sm">Lê Bảo Như</p>
                <p className="text-xs text-gray-40">
                  Thời gian gửi: 8:30 04/12/2023
                </p>
              </div>
            </div>
            <p className="text-blue-40 text-xs font-semibold">Chưa xử lý</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestList;
