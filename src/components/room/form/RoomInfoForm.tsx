import { CreateRoomForm } from "@/models/room";
import { Button, Checkbox, Form, Input, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

interface RoomInfoFormProps {
  handleInputChange: (
    e:
      | RadioChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckboxChange: (checked: boolean, name: string) => void;
  formData: CreateRoomForm;
}

const RoomInfoForm: React.FC<RoomInfoFormProps> = (props) => {
  const [isElectricityFree, setElectricityFree] = useState(false);
  const [isWaterFree, setWaterFree] = useState(false);
  const [isInternetFree, setInternetFree] = useState(false);
  const [isParkingFree, setParkingFree] = useState(false);

  return (
    <Form layout="vertical" className="w-[725px]">
      <div className="border-b mb-5">
        <h1 className="text-base font-medium text-gray-60 mb-2">Bước 1</h1>
        <h3 className="text-lg font-medium text-blue-10 mb-4">Thông tin phòng</h3>
      </div>

      {/* Room Type */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">LOẠI PHÒNG</label>}>
        <Radio.Group name="roomType" onChange={props.handleInputChange} value={props.formData.roomType}>
          <div className="flex justify-center items-center space-x-6">
            <div className="flex flex-col space-y-4 w-[350px]">
              <Radio value="homestay" className="text-gray-20 w-full text-center items-center px-6 py-4 border rounded-lg">
                Kí túc xá/Homestay
              </Radio>
              <Radio value="rentalRoom" className="text-gray-20 w-full text-center px-6 py-4 border rounded-lg">
                Phòng cho thuê
              </Radio>
            </div>
            <div className="flex flex-col space-y-4 w-[350px]">
              <Radio value="houseRental" className="text-gray-20 w-full text-center px-6 py-4 border rounded-lg">
                Nhà cho thuê
              </Radio>
              <Radio value="apartment" className="text-gray-20 w-full text-center px-6 py-4 border rounded-lg">
                Căn hộ
              </Radio>
            </div>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* Capacity */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">SỨC CHỨA</label>}>
        <Input
          name="capacity"
          onChange={props.handleInputChange}
          placeholder="Nhập số người/phòng"
          suffix="người/phòng"
          className="h-[40px]"
          value={props.formData.capacity}
        />
      </Form.Item>

      {/* Gender */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">GIỚI TÍNH</label>}>
        <Radio.Group name="gender" onChange={props.handleInputChange} value={props.formData.gender}>
          <div className="flex space-x-5">
            <Radio className="text-center px-3 py-2 border rounded-lg w-40" value="all">Tất cả</Radio>
            <Radio className="text-center px-3 py-2 border rounded-lg w-40" value="male">Nam</Radio>
            <Radio className="text-center px-3 py-2 border rounded-lg w-40" value="female">Nữ</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* Area */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">DIỆN TÍCH</label>}>
        <Input
          name="area"
          onChange={props.handleInputChange}
          placeholder="Nhập diện tích"
          suffix="m2"
          className="h-[40px]"
          value={props.formData.area}
        />
      </Form.Item>

      <div className="border-b mb-5">
        <h2 className="text-xl font-medium text-blue-10 mb-4">Chi phí</h2>
      </div>

      {/* Rental Price */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">GIÁ CHO THUÊ</label>}>
        <Input
          name="totalPrice"
          onChange={props.handleInputChange}
          placeholder="Nhập giá cho thuê"
          suffix="đ"
          className="h-[40px]"
          value={props.formData.totalPrice}
        />
      </Form.Item>

      {/* Deposit */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">ĐẶT CỌC</label>}>
        <Input
          name="deposit"
          onChange={props.handleInputChange}
          placeholder="Nhập số tiền đặt cọc"
          suffix="đ"
          className="h-[40px]"
          value={props.formData.deposit}
        />
      </Form.Item>

      {/* Electricity Cost */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">TIỀN ĐIỆN</label>}>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setElectricityFree(!isElectricityFree)}
            className={`w-40 font-bold py-5 px-8 text-center border-none ${isElectricityFree ? "bg-blue-98 text-blue-40" : "bg-gray-90 text-gray-40"}`}
          >
            Miễn phí
          </Button>
          <Input
            name="electricityCost"
            onChange={props.handleInputChange}
            placeholder="Nhập số tiền"
            suffix="đ"
            className="w-full h-[40px]"
            disabled={isElectricityFree}
            value={isElectricityFree ? "" : props.formData.electricityCost}
          />
        </div>
      </Form.Item>

      {/* Water Cost */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">TIỀN NƯỚC</label>}>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setWaterFree(!isWaterFree)}
            className={`w-40 font-bold py-5 px-8 text-center border-none ${isWaterFree ? "bg-blue-98 text-blue-40" : "bg-gray-90 text-gray-40"}`}
          >
            Miễn phí
          </Button>
          <Input
            name="waterCost"
            onChange={props.handleInputChange}
            placeholder="Nhập số tiền"
            suffix="đ"
            className="w-full h-[40px]"
            disabled={isWaterFree}
            value={isWaterFree ? "" : props.formData.waterCost}
          />
        </div>
      </Form.Item>

      {/* Internet Cost */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">TIỀN INTERNET/WIFI</label>}>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setInternetFree(!isInternetFree)}
            className={`w-40 font-bold py-5 px-8 text-center border-none ${isInternetFree ? "bg-blue-98 text-blue-40" : "bg-gray-90 text-gray-40"}`}
          >
            Miễn phí
          </Button>
          <Input
            name="internetCost"
            onChange={props.handleInputChange}
            placeholder="Nhập số tiền"
            suffix="đ"
            className="w-full h-[40px]"
            disabled={isInternetFree}
            value={isInternetFree ? "" : props.formData.internetCost}
          />
        </div>
      </Form.Item>

      {/* Parking */}
      <Form.Item>
        <Checkbox
          name="isParking"
          className="font-medium text-gray-20 space-x-3 text-base"
          onChange={(e) => props.handleCheckboxChange(e.target.checked, "isParking")}
          checked={props.formData.isParking}
        >
          Có chỗ để xe
        </Checkbox>
      </Form.Item>

      {/* Parking Fee */}
      <Form.Item label={<label className="text-base font-medium text-gray-40">PHÍ GIỮ XE</label>}>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setParkingFree(!isParkingFree)}
            className={`w-40 font-bold py-5 px-8 text-center border-none ${isParkingFree ? "bg-blue-98 text-blue-40" : "bg-gray-90 text-gray-40"}`}
          >
            Miễn phí
          </Button>
          <Input
            name="parkingFee"
            onChange={props.handleInputChange}
            placeholder="Nhập số tiền"
            suffix="đ"
            className="w-full h-[40px]"
            disabled={isParkingFree}
            value={isParkingFree ? "" : props.formData.parkingFee}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default RoomInfoForm;
