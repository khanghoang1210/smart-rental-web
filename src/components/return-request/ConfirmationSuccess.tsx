import { Button, Modal, Rate, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import success from "../../assets/success.png";
import digital from "../../assets/digital.svg";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

import CustomRate from "./CustomRate";
import { useAppStore } from "@/store";

const ConfirmationSuccess = () => {
  const navigate = useNavigate();
  const {userInfo} = useAppStore(); 
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, ] = useState(0);
  const [review, setReview] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };  
  
  const handleNext = () => {
    setCurrentStep(2); // Move to step 2
  };

  const handlePrevious = () => {
    setCurrentStep(1); // Move to step 2
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
            <span className="font-bold text-gray-20">{userInfo?.role === 1 ?"đánh giá người thuê":"đánh giá phòng trọ"}</span>{" "}
            {userInfo?.role === 1 ? "để giúp các chủ nhà khác có thêm thông tin và nâng cao chất lượng cộng đồng thuê trọ." : "để giúp người thuê sau có cái nhìn tổng quan và lựa chọn phù hợp hơn."}
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
        {isModalOpen && (
          <>
            {userInfo?.role === 2 ? (
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
        </Modal> ) : currentStep === 1 ? (<Modal
        className="w-[700px] max-h-[700px] overflow-hidden"
          title={
            <label className="text-gray-20 font-semibold">
              Đánh giá phòng trọ
            </label>
          }
          open={isModalOpen && currentStep === 1}
          onCancel={handleCancel}
          footer={[
            <Button className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5" key="next" type="primary" onClick={handleNext}>
              Tiếp theo
            </Button>,
          ]}
        >
          <div className="flex justify-center space-x-16 mt-8 p-4">
          <div className="w-1/2">
              <div className="text-center mb-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Avatar"
                  className="w-72 h-32 rounded-[30px] mx-auto mb-2"
                />
                <Rate defaultValue={4} onChange={handleRatingChange} />
              </div>
              {/* Nội dung đánh giá */}
              <p className="font-semibold text-gray-20 mb-2">
              Nhận xét về phòng trọ này
              </p>
              <TextArea
                placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                rows={4}
                onChange={(e) => setReview(e.target.value)}
              />
              {/* Upload ảnh */}
              <p className="font-semibold text-gray-20 mt-4 mb-2">
              Chia sẻ hình ảnh phòng trọ
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
            <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
              <p className="font-semibold">Tiện nghi như thế nào?</p>
              <CustomRate onChange={handleRatingChange} />
              <p className="font-semibold">Vị trí địa lý và xung quanh như thế nào?</p>
              <CustomRate onChange={handleRatingChange} />
              <p className="font-semibold">Phòng trọ có sạch sẽ không?</p>
              <CustomRate onChange={handleRatingChange} />
              <p className="font-semibold">Giá tiền có hợp lý không?</p>
              <CustomRate onChange={handleRatingChange} />
           
          </div>
          </div>
          
        </Modal>

) : (
        <Modal
          className="w-[700px] max-h-[700px] overflow-hidden"
          title="Đánh giá chủ nhà"
          open={isModalOpen && currentStep === 2}
          onCancel={handleCancel}
          footer={<div className="flex justify-between">
            <Button className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5" key="submit" type="primary" onClick={handlePrevious}>
              Quay lại
            </Button>
            <Button className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5" key="submit" type="primary" onClick={handleOk}>
              Gửi
            </Button>
            </div>
          }
        >
          <div className="flex justify-center space-x-16 mt-8 p-4">
          <div className="w-1/2">
          <div className="text-center mb-4">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold text-lg">Nguyễn Xuân Phương</p>
                <Rate onChange={handleRatingChange} defaultValue={4} />
              </div>
              {/* Nội dung đánh giá */}
              <p className="font-semibold mt-8 text-gray-20 mb-2">
              Nhận xét về chủ nhà
              </p>
              <TextArea
                placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                rows={5}
                onChange={(e) => setReview(e.target.value)}
              />
            
            </div>
          <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
            <p className="font-semibold">Chủ nhà có thân thiện không?</p>
            <CustomRate onChange={handleRatingChange} />
            <p className="font-semibold">Chủ nhà có cư xử chuyên nghiệp không?</p>
            <CustomRate onChange={handleRatingChange} />
            <p className="font-semibold">
              Mức độ hỗ trợ của chủ nhà như thế nào?
            </p>
            <CustomRate onChange={handleRatingChange} />
            <p className="font-semibold">
              Chủ nhà có minh bạch trong thông tin không?
            </p>
            <CustomRate onChange={handleRatingChange} />
           
          </div>
          </div>
        </Modal>
         )}
         </>
       )}
      </div>
    </>
  );
};

export default ConfirmationSuccess;
