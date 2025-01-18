import { Button, Modal, Rate, Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import success from "../../assets/success.png";
import digital from "../../assets/digital.svg";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

import CustomRate from "./CustomRate";
import { useAppStore } from "@/store";
import RatingService from "@/services/RatingService";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { UserInfo } from "@/store/slice/authSlice";
import { RoomRes } from "@/models/room";
import UserService from "@/services/UserService";
import RoomService from "@/services/RoomService";

const ConfirmationSuccess = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { userInfo } = useAppStore();
  const [tenant, setTenant] = useState<UserInfo>();
  const [landlord, setLandlord] = useState<UserInfo>();
  const [room, setRoom] = useState<RoomRes>();
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const { tenantID, roomID, landlordID } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overallTenantRating, setOverallTenantRating] = useState<number>(0);
  const [overallLandlordRating, setOverallLandlordRating] = useState<number>(0);
  const [overallRoomRating, setOverallRoomRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  console.log(tenantID, roomID, landlordID);
  const [criteriaRatings, setCriteriaRatings] = useState<
    Record<string, number>
  >({
    payment: 0,
    propertyCare: 0,
    disturbance: 0,
    compliance: 0,
    friendliness: 0,
    professionalism: 0,
    support: 0,
    transparency: 0,
    amenities: 0,
    location: 0,
    cleanliness: 0,
    price: 0,
  });

  const handleNext = () => {
    setCriteriaRatings((prev) => ({
      ...prev,
      amenities: 0,
      location: 0,
      cleanliness: 0,
      price: 0,
    }));
    setReview("");
    setCurrentStep(2); // Move to step 2
  };

  const handlePrevious = () => {
    setCurrentStep(1); // Move to step 2
  };

  useEffect(() => {
    const fetchTenant = async () => {
      const userService = new UserService();
      const res = await userService.getUserByID(tenantID, token);
      const data = res.data.data;
      setTenant(data);
    };

    if (tenantID) fetchTenant();
  }, [tenantID]);

  useEffect(() => {
    const fetchLandlord = async () => {
      const userService = new UserService();
      const res = await userService.getUserByID(landlordID, token);
      const data = res.data.data;
      setLandlord(data);
    };

    const fetchRoom = async () => {
      const roomService = new RoomService();
      const res = await roomService.getByID(token, roomID);
      const data = res.data.data;
      setRoom(data);
    };
    if (landlordID && roomID) {
      fetchLandlord();
      fetchRoom();
    }
  }, [roomID, landlordID]);
  const handleOk = async () => {
    const ratingService = new RatingService();
    try {
      if (userInfo?.role === 1 && tenantID) {
        // Tenant rating
        const formData = new FormData();
        formData.append("tenant_id", tenantID);
        formData.append("payment_rating", criteriaRatings.payment.toString());
        formData.append(
          "property_care_rating",
          criteriaRatings.propertyCare.toString()
        );
        formData.append(
          "neighborhood_disturbance_rating",
          criteriaRatings.disturbance.toString()
        );
        formData.append(
          "contract_compliance_rating",
          criteriaRatings.compliance.toString()
        );
        formData.append("overall_rating", overallTenantRating.toString());
        formData.append("comments", review);
        fileList.forEach((file) => {
          formData.append("images", file.originFileObj);
        });

        await ratingService.createTenantRating(token, formData);
      } else {
        const formData = new FormData();
        formData.append("room_id", roomID);
        formData.append(
          "amenities_rating",
          criteriaRatings.amenities.toString()
        );
        formData.append("location_rating", criteriaRatings.location.toString());
        formData.append(
          "cleanliness_rating",
          criteriaRatings.cleanliness.toString()
        );
        formData.append("price_rating", criteriaRatings.price.toString());
        formData.append("overall_rating", overallRoomRating.toString());
        formData.append("comments", review);
        fileList.forEach((file) => {
          formData.append("images", file.originFileObj);
        });

        const payload = {
          landlord_id: landlordID,
          friendliness_rating: criteriaRatings.friendliness,
          professionalism_rating: criteriaRatings.professionalism,
          support_rating: criteriaRatings.support,
          transparency_rating: criteriaRatings.transparency,
          overall_rating: overallLandlordRating,
          comments: review,
        };

        // Room Rating
        await ratingService.createRoomRating(token, formData);
        // Landlord rating
        await ratingService.createLandlordRating(token, payload);
      }

      toast.success("Đánh giá thành công");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const handleRatingChange = (value: number, field: string) => {
    if (field === "tenant_overall") {
      setOverallTenantRating(value); // Update overall rating directly
    } else if (field === "room_overall") {
      setOverallRoomRating(value);
    } else if (field === "landlord_overall") {
      setOverallLandlordRating(value);
    } else {
      setCriteriaRatings((prev) => ({
        ...prev,
        [field]: value, // Update specific criteria ratings
      }));
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLater = () => {
    // Navigate back or perform other actions
    navigate("/");
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
            <span className="font-bold text-gray-20">
              {userInfo?.role === 1
                ? "đánh giá người thuê"
                : "đánh giá phòng trọ"}
            </span>{" "}
            {userInfo?.role === 1
              ? "để giúp các chủ nhà khác có thêm thông tin và nâng cao chất lượng cộng đồng thuê trọ."
              : "để giúp người thuê sau có cái nhìn tổng quan và lựa chọn phù hợp hơn."}
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
            {userInfo?.role === 1 ? (
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
                        src={tenant?.avatar_url}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full mx-auto mb-2"
                      />
                      <p className="font-semibold text-lg">
                        {tenant?.full_name}
                      </p>
                      <Rate
                        onChange={(value) =>
                          handleRatingChange(value, "tenant_overall")
                        }
                      />
                    </div>
                    {/* Nội dung đánh giá */}
                    <p className="font-semibold text-gray-800 mb-2">
                      Nhận xét về khách thuê
                    </p>
                    <TextArea
                      placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                      rows={4}
                      onChange={(e) => setReview(e.target.value)}
                      value={review}
                    />
                    {/* Upload ảnh */}
                    <p className="font-semibold text-gray-20 mt-4 mb-2">
                      Chưa hài lòng về phòng trọ?
                    </p>
                    <Upload.Dragger
                      multiple
                      fileList={fileList}
                      onChange={(info) => setFileList(info.fileList)}
                      className="border-dashed ant-upload-drag"
                    >
                      <div className="flex justify-center mb-3">
                        <img src={digital} alt="" className="w-10 h-10" />
                      </div>
                      <p className="text-blue-60 text-xs">
                        Bấm hoặc kéo thả hình ảnh vào đây để <br /> đăng hình
                        ảnh từ thư viện nhé!
                      </p>
                    </Upload.Dragger>
                  </div>

                  {/* Đánh giá từng tiêu chí */}
                  <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
                    <p>Khách thuê có thanh toán tiền đúng hạn không?</p>
                    <CustomRate
                      onChange={(value) => handleRatingChange(value, "payment")}
                    />

                    <p>Khách thuê có bảo vệ và giữ gìn phòng tốt không?</p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "propertyCare")
                      }
                    />

                    <p>Khách thuê có giấy phân tài rõ ràng không?</p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "disturbance")
                      }
                    />

                    <p>Khách thuê có tuân thủ các điều khoản hợp đồng không?</p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "compliance")
                      }
                    />
                  </div>
                </div>
              </Modal>
            ) : currentStep === 1 ? (
              <Modal
                className="w-[700px] max-h-[700px] overflow-hidden"
                title={
                  <label className="text-gray-20 font-semibold">
                    Đánh giá phòng trọ
                  </label>
                }
                open={isModalOpen && currentStep === 1}
                onCancel={handleCancel}
                footer={[
                  <Button
                    className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5"
                    key="next"
                    type="primary"
                    onClick={handleNext}
                  >
                    Tiếp theo
                  </Button>,
                ]}
              >
                <div className="flex justify-center space-x-16 mt-8 p-4">
                  <div className="w-1/2">
                    <div className="text-center mb-4">
                      <img
                        src={room?.room_images[0]}
                        alt="Avatar"
                        className="w-72 h-32 rounded-[30px] mx-auto mb-2"
                      />
                      <Rate
                        onChange={(value) =>
                          handleRatingChange(value, "room_overall")
                        }
                      />
                    </div>
                    {/* Nội dung đánh giá */}
                    <p className="font-semibold text-gray-20 mb-2">
                      Nhận xét về phòng trọ này
                    </p>
                    <TextArea
                      placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                      rows={4}
                      onChange={(e) => setReview(e.target.value)}
                      value={review}
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
                        Bấm hoặc kéo thả hình ảnh vào đây để <br /> đăng hình
                        ảnh từ thư viện nhé!
                      </p>
                    </Upload.Dragger>
                  </div>
                  <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
                    <p className="font-semibold">Tiện nghi như thế nào?</p>
                    <CustomRate
                      value={criteriaRatings.amenities} // Bind to state
                      onChange={(value) =>
                        handleRatingChange(value, "amenities")
                      }
                    />

                    <p className="font-semibold">
                      Vị trí địa lý và xung quanh như thế nào?
                    </p>
                    <CustomRate
                      value={criteriaRatings.location} // Bind to state
                      onChange={(value) =>
                        handleRatingChange(value, "location")
                      }
                    />

                    <p className="font-semibold">Phòng trọ có sạch sẽ không?</p>
                    <CustomRate
                      value={criteriaRatings.cleanliness} // Bind to state
                      onChange={(value) =>
                        handleRatingChange(value, "cleanliness")
                      }
                    />

                    <p className="font-semibold">Giá tiền có hợp lý không?</p>
                    <CustomRate
                      value={criteriaRatings.price} // Bind to state
                      onChange={(value) => handleRatingChange(value, "price")}
                    />
                  </div>
                </div>
              </Modal>
            ) : (
              <Modal
                className="w-[700px] max-h-[700px] overflow-hidden"
                title="Đánh giá chủ nhà"
                open={isModalOpen && currentStep === 2}
                onCancel={handleCancel}
                footer={
                  <div className="flex justify-between">
                    <Button
                      className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5"
                      key="submit"
                      type="primary"
                      onClick={handlePrevious}
                    >
                      Quay lại
                    </Button>
                    <Button
                      className="border border-blue-60 bg-[#fff] text-blue-60 w-1/3 rounded-full py-5"
                      key="submit"
                      type="primary"
                      onClick={handleOk}
                    >
                      Gửi
                    </Button>
                  </div>
                }
              >
                <div className="flex justify-center space-x-16 mt-8 p-4">
                  <div className="w-1/2">
                    <div className="text-center mb-4">
                      <img
                        src={landlord?.avatar_url}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full mx-auto mb-2"
                      />
                      <p className="font-semibold text-lg">
                        {landlord?.full_name}
                      </p>
                      <Rate
                        onChange={(value) =>
                          handleRatingChange(value, "landlord_overall")
                        }
                      />
                    </div>
                    {/* Nội dung đánh giá */}
                    <p className="font-semibold mt-8 text-gray-20 mb-2">
                      Nhận xét về chủ nhà
                    </p>
                    <TextArea
                      placeholder="Viết vài câu để tóm tắt trải nghiệm của bạn"
                      rows={5}
                      onChange={(e) => setReview(e.target.value)}
                      value={review}
                    />
                  </div>
                  <div className="mt-6 space-y-4 w-[60%] text-gray-20 font-semibold">
                    <p className="font-semibold">
                      Chủ nhà có thân thiện không?
                    </p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "friendliness")
                      }
                    />

                    <p className="font-semibold">
                      Chủ nhà có cư xử chuyên nghiệp không?
                    </p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "professionalism")
                      }
                    />

                    <p className="font-semibold">
                      Mức độ hỗ trợ của chủ nhà như thế nào?
                    </p>
                    <CustomRate
                      onChange={(value) => handleRatingChange(value, "support")}
                    />

                    <p className="font-semibold">
                      Chủ nhà có minh bạch trong thông tin không?
                    </p>
                    <CustomRate
                      onChange={(value) =>
                        handleRatingChange(value, "transparency")
                      }
                    />
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
