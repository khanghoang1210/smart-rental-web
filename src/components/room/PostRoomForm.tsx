import { useState } from "react";
import { Button, RadioChangeEvent, Spin } from "antd";
import RoomInfoForm from "./form/RoomInfoForm";
import AddressForm from "./form/AddressForm";
import ImageAndAmenitiesForm from "./form/ImageAndAmenitiesForm";
import ConfirmationForm from "./form/ConfirmationForm";
import { toast } from "sonner";
import RoomService from "@/services/RoomService";
import { useCookies } from "react-cookie";
import { Address, CreateRoomForm } from "@/models/room";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

const PostRoomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { userInfo } = useAppStore();
  const [formData, setFormData] = useState<CreateRoomForm>({
    title: "",
    address: [],
    roomImages: [],
    roomType: "",
    capacity: 0,
    gender: 0,
    area: 0,
    roomNumber: 0,
    totalPrice: 0,
    deposit: 0,
    electricityCost: 0,
    waterCost: 0,
    internetCost: 0,
    isParking: false,
    parkingFee: 0,
    utilities: [],
    description: "",
    owner: 0,
    status: 0,
    isRent: false,
  });

  const [addressData, setAddressData] = useState<Address>(Object);
  const navigate = useNavigate();
  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | RadioChangeEvent
  ) => {
    const { name, value } = e.target;

    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUtilitySelect = (utilities: string[]) => {
    setFormData((prev) => ({
      ...prev,
      utilities,
    }));
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (images: File[]) => {
    setFormData((prev) => ({
      ...prev,
      roomImages: images,
    }));
  };
  // Cập nhật state cho checkbox
  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    const address = [
      addressData.houseNumber,
      addressData.street,
      addressData.ward,
      addressData.district,
      addressData.city,
    ].filter(Boolean); // Use .filter(Boolean) to remove any empty strings
    console.log(address);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("room_number", formData.roomNumber.toString());
    form.append("description", formData.description);
    form.append(
      "room_type",
      formData.roomType === "homestay"
        ? "Kí túc xá/Homestay"
        : formData.roomType === "rentalRoom"
          ? "Phòng cho thuê"
          : formData.roomType === "houseRental"
            ? "Nhà nguyên căn"
            : "Căn hộ"
    );
    form.append("owner", userInfo?.id ? userInfo.id.toString() : "");
    form.append("capacity", formData.capacity.toString());
    form.append("gender", formData.gender.toString());
    form.append("status", formData.status.toString());
    form.append("isRent", formData.isRent.toString());
    form.append("total_price", formData.totalPrice.toString());
    form.append("deposit", formData.deposit.toString());
    form.append("electricity_cost", formData.electricityCost.toString());
    form.append("water_cost", formData.waterCost.toString());
    form.append("internet_cost", formData.internetCost.toString());
    form.append("is_parking", formData.isParking.toString());
    form.append("parking_fee", formData.parkingFee.toString());
    form.append("status", formData.status.toString());
    form.append("isRent", formData.isRent.toString());

    formData.utilities.forEach((utility) => {
      form.append("utilities", utility); // Each utility added separately
    });

    formData.roomImages.forEach((file) => {
      form.append(`room_images`, file);
    });

    address.forEach((add) => {
      form.append("address", add);
    });

    setIsLoading(true);
    try {
      console.log("form", form);
      const roomService = new RoomService();
      const response = await roomService.createRoom(token, form);
      console.log(response.data);
      toast.success("Tạo phòng thành công");
      navigate("/room/posted")
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      title: "Thông tin",
      content: (
        <RoomInfoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      ),
    },
    {
      title: "Địa chỉ",
      content: (
        <AddressForm
          formData={addressData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleAddressInputChange={handleAddressInputChange}
        />
      ),
    },
    {
      title: "Hình ảnh và tiện ích",
      content: (
        <ImageAndAmenitiesForm
          handleImageUpload={handleImageUpload}
          handleUtilitySelect={handleUtilitySelect}
        />
      ),
    },
    {
      title: "Xác nhận",
      content: <ConfirmationForm handleInputChange={handleInputChange} />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 w-[750px]">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div className="flex items-center" key={index}>
            <div
              className={`flex items-center border  rounded-[50px] py-3 px-4  ${
                index === currentStep ? "border-blue-40" : "border-gray-80"
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full border font-medium ${
                  index === currentStep
                    ? "border-blue-40 bg-white text-blue-40 "
                    : "border-gray-80 bg-gray-100 text-gray-20"
                }`}
              >
                <span>{index + 1}</span>
              </div>

              <div
                className={`ml-2 font-bold text-sm ${
                  index === currentStep ? "text-gray-20 " : "text-gray-60"
                }`}
              >
                {step.title}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="w-12 h-0.5 bg-gray-80 "></div>
            )}
          </div>
        ))}
      </div>
      <div className="my-8 ">{steps[currentStep].content}</div>
      <div className="text-right">
        {currentStep < steps.length - 1 && (
          <Button
            className="float-end w-48 h-12 rounded-[100px] text-lg font-medium text-blue-60 border-blue-60"
            onClick={next}
          >
            Tiếp theo
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            className="float-end w-48 h-12 rounded-[100px] text-lg font-medium text-blue-60 border-blue-60"
            onClick={handleSubmit}
          >
            Đăng phòng
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            className="float-start w-48 h-12 rounded-[100px] text-lg font-medium text-blue-60 border-blue-60"
            onClick={prev}
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostRoomForm;
