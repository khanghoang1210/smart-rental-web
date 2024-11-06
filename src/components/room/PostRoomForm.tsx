import { useState } from "react";
import { Button, RadioChangeEvent } from "antd";
import RoomInfoForm from "./form/RoomInfoForm";
import AddressForm from "./form/AddressForm";
import ImageAndAmenitiesForm from "./form/ImageAndAmenitiesForm";
import ConfirmationForm from "./form/ConfirmationForm";
import { toast } from "sonner";
import RoomService from "@/services/RoomService";
import { useCookies } from "react-cookie";
import { CreateRoomForm } from "@/models/room";
import { useAppStore } from "@/store";

const PostRoomForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const {userInfo} = useAppStore();
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

  console.log("====", userInfo)

  const [addressData, setAddressData] = useState({
    city: undefined,
    district: undefined,
    ward: undefined,
    street: undefined,
    houseNumber: undefined,
  });

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

    const reqData: CreateRoomForm = {
      title: formData.title,
      address: address,
      roomNumber: formData.roomNumber,
      roomImages: formData.roomImages,
      utilities: formData.utilities,
      description: formData.description,
      roomType: formData.roomType,
      owner: userInfo?.id,
      capacity: formData.capacity,
      gender: formData.gender,
      area: formData.area,
      totalPrice: formData.totalPrice,
      deposit: formData.deposit,
      electricityCost: formData.electricityCost,
      waterCost: formData.waterCost,
      internetCost: formData.internetCost,
      isParking: formData.isParking,
      parkingFee: formData.parkingFee,
      status: formData.status,
      isRent: formData.isRent,
    };
    try {
      console.log(reqData);
      const roomService = new RoomService();
      const response = await roomService.createRoom(token, reqData);
      console.log(response.data);
      toast.success("Tạo phòng thành công");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
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
      content: <ImageAndAmenitiesForm handleImageUpload={handleImageUpload} />,
    },
    {
      title: "Xác nhận",
      content: <ConfirmationForm />,
    },
  ];

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
