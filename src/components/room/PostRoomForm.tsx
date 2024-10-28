import { useState } from "react";
import { Button} from "antd";
import RoomInfoForm from "./form/RoomInfoForm";
import AddressForm from "./form/AddressForm";
import ImageAndAmenitiesForm from "./form/ImageAndAmenitiesForm";
import ConfirmationForm from "./form/ConfirmationForm";


const PostRoomForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    roomType: "",
    capacity: "",
    gender: "",
    area: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    houseNumber: "",
    roomNumber: "",
    price: "",
    deposit: "",
    electricFee: "",
    waterFee: "",
    internetFee: "",
    parking: false,
    parkingFee: "",
  });

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cập nhật state cho select dropdown
  const handleSelectChange = (value: string, name: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cập nhật state cho checkbox
  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  // };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
  };

  const steps = [
    {
      title: "Thông tin",
      content: <RoomInfoForm handleInputChange={handleInputChange} />,
    },
    {
      title: "Địa chỉ",
      content: (
        <AddressForm
          handleInputChange={handleInputChange}
          handleSelectChange={()=>handleSelectChange}
        />
      ),
    },
    {
      title: "Hình ảnh và tiện ích",
      content: (
        <ImageAndAmenitiesForm/>
      ),
    },
    {
      title: "Xác nhận",
      content: (
       <ConfirmationForm/>
      ),
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
              <div className="w-14 h-0.5 bg-gray-80 "></div>
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
