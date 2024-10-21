import { Button, Checkbox, Form, Input, Radio } from "antd";

interface RoomInfoFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const RoomInfoForm = (prop: RoomInfoFormProps) => (
  <Form layout="vertical" className="w-[725px]">
    <div className="border-b mb-5">
      <h1 className="text-base font-medium text-gray-60 mb-2">Bước 1</h1>
      <h3 className="text-lg font-medium text-blue-10 mb-4">Thông tin phòng</h3>
    </div>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">LOẠI PHÒNG</label>
      }
    >
      <Radio.Group name="roomType" onChange={() => prop.handleInputChange}>
        <div className="flex justify-center items-center space-x-6">
          <div className="flex flex-col space-y-4 w-[350px]">
            <Radio
              value="homestay"
              className="text-gray-20 w-full text-center items-center px-6 py-4 border rounded-lg"
            >
              Kí túc xá/Homestay
            </Radio>
            <Radio
              value="rentalRoom"
              className=" text-gray-20 w-full  text-center px-6 py-4 border rounded-lg"
            >
              Phòng cho thuê
            </Radio>
          </div>
          <div className="flex flex-col space-y-4 w-[350px]">
            <Radio
              value="houseRental"
              className="text-gray-20 w-full text-center px-6 py-4 border rounded-lg"
            >
              Nhà cho thuê
            </Radio>
            <Radio
              value="apartment"
              className="text-gray-20 w-full  text-center px-6 py-4 border rounded-lg"
            >
              Căn hộ
            </Radio>
          </div>
        </div>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">SỨC CHỨA</label>
      }
    >
      <Input
        name="capacity"
        onChange={prop.handleInputChange}
        placeholder="Nhập số người/phòng"
        suffix={"người/phòng"}
        className="h-[40px] "
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">GIỚI TÍNH</label>
      }
    >
      <Radio.Group name="gender" onChange={() => prop.handleInputChange}>
        <div className="flex space-x-5">
          <Radio
            className="text-center px-3 py-2 space-x-4 border rounded-lg w-40"
            value="all"
          >
            Tất cả
          </Radio>
          <Radio
            className="text-center px-3 py-2 space-x-4 border rounded-lg w-40"
            value="male"
          >
            Nam
          </Radio>
          <Radio
            className="text-center px-3 py-2 space-x-4 border rounded-lg w-40"
            value="female"
          >
            Nữ
          </Radio>
        </div>
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">DIỆN TÍCH</label>
      }
    >
      <Input
        name="area"
        onChange={prop.handleInputChange}
        placeholder="Nhập diện tích"
        suffix={"m2"}
        className="h-[40px]"
      />
    </Form.Item>
    <div className="border-b mb-5">
      <h2 className="text-xl font-medium text-blue-10 mb-4">Chi phí</h2>
    </div>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          GIÁ CHO THUÊ
        </label>
      }
    >
      <Input
        name="price"
        onChange={prop.handleInputChange}
        placeholder="Nhập giá cho thuê"
        suffix={"đ"}
        className="h-[40px]"
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">ĐẶT CỌC</label>
      }
    >
      <Input
        name="deposit"
        onChange={prop.handleInputChange}
        placeholder="Nhập số tiền đặt cọc"
        suffix={"đ"}
        className="h-[40px]"
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TIỀN ĐIỆN</label>
      }
    >
      <div className="flex items-center gap-4">
        <Button
          value="free"
          className="w-40 border-none text-gray-40 font-bold bg-gray-90 text-center py-5 px-8"
        >
          Miễn phí
        </Button>

        <Input
          placeholder="Nhập số tiền"
          suffix="đ"
          className="w-full h-[40px]"
        />
      </div>
    </Form.Item>

    {/* Tiền nước */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TIỀN ĐIỆN</label>
      }
    >
      <div className="flex items-center gap-4">
        <Button
          value="free"
          className="w-40 border-none text-gray-40 font-bold bg-gray-90 text-center py-5 px-8"
        >
          Miễn phí
        </Button>
        <Input placeholder="Nhập số tiền" suffix="đ" className="w-full h-[40px]" />
      </div>
    </Form.Item>

    {/* Tiền Internet/Wi-Fi */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TIỀN ĐIỆN</label>
      }
    >
      <div className="flex items-center gap-4">
        <Button
          value="free"
          className="w-40 border-none text-gray-40 font-bold bg-gray-90 text-center py-5 px-8"
        >
          Miễn phí
        </Button>
        <Input placeholder="Nhập số tiền" suffix="đ" className="w-full h-[40px]" />
      </div>
    </Form.Item>

    {/* Chỗ để xe */}
    <Form.Item>
      <Checkbox name="parking" className="font-medium text-gray-20 space-x-3 text-base">Có chỗ để xe</Checkbox>
    </Form.Item>

    {/* Phí giữ xe */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TIỀN ĐIỆN</label>
      }
    >
      <div className="flex items-center gap-4">
        <Button
          value="free"
          className="w-40 border-none text-gray-40 font-bold bg-gray-90 text-center py-5 px-8"
        >
          Miễn phí
        </Button>
        <Input placeholder="Nhập số tiền" suffix="đ" className="w-full h-[40px]" />
      </div>
    </Form.Item>
  </Form>
);

export default RoomInfoForm;
