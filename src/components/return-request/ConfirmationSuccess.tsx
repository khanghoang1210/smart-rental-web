import { Button, Modal, Rate, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import success from "../../assets/success.png";
import digital from "../../assets/digital.svg";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

import CustomRate from "./CustomRate";

const ConfirmationSuccess = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    // Xử lý gửi đánh giá tại đây
    console.log("Rating:", rating, "Review:", review);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLater = () => {
    // Navigate back or perform other actions
    navigate("/");
  };
  const handleRatingChange = (value: number) => {
    console.log("Đánh giá:", value);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-4 bg-white">
        <div className="w-full max-w-md text-center p-6 bg-gray-50 rounded-lg">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <img src={success} alt="" className="w-16 h-16" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-medium text-gray-20 mb-8">
            Trả phòng thành công
          </h2>
          <p className="text-base text-gray-20 mb-14">
            Chúc mừng bạn! Quá trình trả phòng trọ của bạn đã hoàn tất thành
            công.
          </p>
          <p className="text-base text-gray-20">
            Hãy{" "}
            <span className="font-bold text-gray-20">đánh giá người thuê</span>{" "}
            để giúp các chủ nhà khác có thêm thông tin và nâng cao chất lượng
            cộng đồng thuê trọ.
          </p>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              className=" text-blue-60 border border-blue-60 font-medium px-16 py-5 rounded-[100px]"
              onClick={handleLater}
            >
              Để sau
            </Button>
            <Button
              className="bg-blue-60 text-[#fff] font-medium px-16 py-5 rounded-[100px] "
              onClick={showModal}
            >
              Đánh giá
            </Button>
          </div>
        </div>
        {/* Modal đánh giá */}
        <Modal
          className="w-[850px] max-h-[700px] overflow-hidden"
          title={
            <label className="text-gray-20 font-semibold">
              Đánh giá khách thuê
            </label>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Button
              key="submit"
              type="primary"
              className="bg-blue-60 text-[#fff] w-1/3 rounded-full py-5"
              onClick={handleOk}
            >
              Gửi
            </Button>
          }
        >
          {/* Avatar và thông tin người thuê */}
          <div className="flex justify-center space-x-16 mt-8 p-4">
            <div className="w-1/2">
              <div className="text-center mb-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold text-lg">Nguyễn Văn A</p>
                <Rate disabled defaultValue={4} />
              </div>
              {/* Nội dung đánh giá */}
              <p className="font-semibold text-gray-800 mb-2">
                Nhận xét về khách thuê
              </p>
              <TextArea
                placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                rows={4}
                onChange={(e) => setReview(e.target.value)}
              />
              {/* Upload ảnh */}
              <p className="font-semibold text-gray-20 mt-4 mb-2">
                Chưa hài lòng về phòng trọ?
              </p>
              <Upload.Dragger className="border-dashed ant-upload-drag">
                <div className="flex justify-center mb-3">
                  <img src={digital} alt="" className="w-10 h-10" />
                </div>
                <p className="text-blue-60 text-xs">
                  Bấm hoặc kéo thả hình ảnh vào đây để <br /> đăng hình ảnh từ
                  thư viện nhé!
                </p>
              </Upload.Dragger>
            </div>

            {/* Đánh giá từng tiêu chí */}
            <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
              <p>Khách thuê có thanh toán tiền đúng hạn không?</p>
              <CustomRate onChange={handleRatingChange} />

              <p>Khách thuê có bảo vệ và giữ gìn phòng tốt không?</p>
              <CustomRate onChange={handleRatingChange} />

              <p>Khách thuê có giấy phân tài rõ ràng không?</p>
              <CustomRate onChange={handleRatingChange} />

              <p>Khách thuê có tuân thủ các điều khoản hợp đồng không?</p>
              <CustomRate onChange={handleRatingChange} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmationSuccess;
