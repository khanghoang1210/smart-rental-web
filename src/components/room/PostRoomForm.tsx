import  { useState } from "react";
import {  Button, Form, Input, Radio, Select, Checkbox } from "antd";

const { Option } = Select;

const PostRoomFlow = () => {
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
  };

  const steps = [
    {
      title: "Thông tin",
      content: (
        <Form layout="vertical">
          <Form.Item label="Loại phòng">
            <Radio.Group name="roomType" onChange={handleInputChange}>
              <Radio value="homestay">Kí túc xá/Homestay</Radio>
              <Radio value="rentalRoom">Phòng cho thuê</Radio>
              <Radio value="houseRental">Nhà cho thuê</Radio>
              <Radio value="apartment">Căn hộ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Sức chứa">
            <Input
              name="capacity"
              onChange={handleInputChange}
              placeholder="Nhập số người/phòng"
            />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group name="gender" onChange={handleInputChange}>
              <Radio value="all">Tất cả</Radio>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Diện tích (m²)">
            <Input
              name="area"
              onChange={handleInputChange}
              placeholder="Nhập diện tích"
              suffix="m²"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Địa chỉ",
      content: (
        <Form layout="vertical">
          <Form.Item label="Thành phố">
            <Select
              placeholder="Bấm để chọn Thành phố"
              onChange={(value) => handleSelectChange(value, "city")}
            >
              <Option value="hoChiMinh">Hồ Chí Minh</Option>
              <Option value="hanoi">Hà Nội</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Quận / Huyện">
            <Select
              placeholder="Bấm để chọn Quận / Huyện"
              onChange={(value) => handleSelectChange(value, "district")}
            >
              <Option value="district1">Quận 1</Option>
              <Option value="district2">Quận 2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Phường / Xã">
            <Select
              placeholder="Bấm để chọn Phường / Xã"
              onChange={(value) => handleSelectChange(value, "ward")}
            >
              <Option value="ward1">Phường 1</Option>
              <Option value="ward2">Phường 2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tên đường">
            <Input
              name="street"
              onChange={handleInputChange}
              placeholder="Nhập tên đường"
            />
          </Form.Item>
          <Form.Item label="Số nhà">
            <Input
              name="houseNumber"
              onChange={handleInputChange}
              placeholder="Nhập số nhà"
            />
          </Form.Item>
          <Form.Item label="Phòng số">
            <Input
              name="roomNumber"
              onChange={handleInputChange}
              placeholder="Nhập số phòng"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Hình ảnh và tiện ích",
      content: (
        <Form layout="vertical">
          <Form.Item label="Giá cho thuê (đ/phòng)">
            <Input
              name="price"
              onChange={handleInputChange}
              placeholder="Nhập giá cho thuê"
            />
          </Form.Item>
          <Form.Item label="Đặt cọc (đ)">
            <Input
              name="deposit"
              onChange={handleInputChange}
              placeholder="Nhập số tiền đặt cọc"
            />
          </Form.Item>
          <Form.Item label="Tiền điện">
            <Radio.Group name="electricFee" onChange={handleInputChange}>
              <Radio value="free">Miễn phí</Radio>
              <Radio value="input">Nhập số tiền</Radio>
            </Radio.Group>
            {formData.electricFee === "input" && (
              <Input
                name="electricFee"
                onChange={handleInputChange}
                placeholder="Nhập số tiền"
              />
            )}
          </Form.Item>
          <Form.Item label="Tiền nước">
            <Radio.Group name="waterFee" onChange={handleInputChange}>
              <Radio value="free">Miễn phí</Radio>
              <Radio value="input">Nhập số tiền</Radio>
            </Radio.Group>
            {formData.waterFee === "input" && (
              <Input
                name="waterFee"
                onChange={handleInputChange}
                placeholder="Nhập số tiền"
              />
            )}
          </Form.Item>
          <Form.Item label="Tiền Internet/Wi-Fi">
            <Radio.Group name="internetFee" onChange={handleInputChange}>
              <Radio value="free">Miễn phí</Radio>
              <Radio value="input">Nhập số tiền</Radio>
            </Radio.Group>
            {formData.internetFee === "input" && (
              <Input
                name="internetFee"
                onChange={handleInputChange}
                placeholder="Nhập số tiền"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Checkbox name="parking" onChange={handleCheckboxChange}>
              Có chỗ để xe
            </Checkbox>
          </Form.Item>
          {formData.parking && (
            <Form.Item label="Phí giữ xe">
              <Input
                name="parkingFee"
                onChange={handleInputChange}
                placeholder="Nhập số tiền"
              />
            </Form.Item>
          )}
        </Form>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <div>
          <h3>Xác nhận thông tin</h3>
          <ul>
            <li>
              <b>Loại phòng:</b> {formData.roomType}
            </li>
            <li>
              <b>Sức chứa:</b> {formData.capacity}
            </li>
            <li>
              <b>Giới tính:</b> {formData.gender}
            </li>
            <li>
              <b>Diện tích:</b> {formData.area} m²
            </li>
            <li>
              <b>Thành phố:</b> {formData.city}
            </li>
            <li>
              <b>Quận/Huyện:</b> {formData.district}
            </li>
            <li>
              <b>Phường/Xã:</b> {formData.ward}
            </li>
            <li>
              <b>Giá cho thuê:</b> {formData.price} đ
            </li>
            <li>
              <b>Đặt cọc:</b> {formData.deposit} đ
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 w-[790px]">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div className="flex items-center" key={index}>
            <div
              className={`flex items-center border  rounded-[50px] p-2  ${
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
                className={`ml-2 font-bold ${
                  index === currentStep ? "text-gray-20 " : "text-gray-60"
                }`}
              >
                {step.title}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="w-16 h-0.5 bg-gray-80 "></div>
            )}
          </div>
        ))}
      </div>
      <div className="my-8 ">{steps[currentStep].content}</div>
      <div className="text-right">
        {currentStep < steps.length - 1 && (
          <Button className="float-end w-64 h-14 rounded-[100px] text-xl font-medium text-blue-60 border-blue-60" onClick={next}>
            Tiếp theo
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button className="float-end w-64 h-14 rounded-[100px] text-xl font-medium text-blue-60 border-blue-60" onClick={handleSubmit}>
            Đăng phòng
          </Button>
        )}
        {currentStep > 0 && (
          <Button className="float-start w-64 h-14 rounded-[100px] text-xl font-medium text-blue-60 border-blue-60" onClick={prev}>
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostRoomFlow;
