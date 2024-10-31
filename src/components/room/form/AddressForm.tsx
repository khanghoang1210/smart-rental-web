import { Form, Input, Select } from "antd";
const { Option } = Select;

interface AddressFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddressInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  formData:
    | {
        city: string | undefined;
        district: string | undefined;
        ward: string | undefined;
        street: string | undefined;
        houseNumber: string | undefined;
      }
    | undefined;
}

const AddressForm = (prop: AddressFormProps) => (
  <Form layout="vertical">
    <div className="border-b mb-5">
      <h1 className="text-base font-medium text-gray-60 mb-2">Bước 2</h1>
      <h3 className="text-lg font-medium text-blue-10 mb-4">Địa chỉ</h3>
    </div>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">THÀNH PHỐ</label>
      }
    >
      <Select
        placeholder="Chọn Thành phố"
        onChange={(value) => prop.handleSelectChange(value, "city")}
        className="h-[40px]"
        value={prop.formData?.city}
      >
        <Option value="hoChiMinh">Hồ Chí Minh</Option>
        <Option value="hanoi">Hà Nội</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          QUẬN / HUYỆN
        </label>
      }
    >
      <Select
        placeholder="Chọn Quận / Huyện"
        onChange={(value) => prop.handleSelectChange(value, "district")}
        className="h-[40px]"
        value={prop.formData?.district}
      >
        <Option value="district1">Quận 1</Option>
        <Option value="district2">Quận 2</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          PHƯỜNG / XÃ
        </label>
      }
    >
      <Select
        placeholder="Chọn Phường / Xã"
        onChange={(value) => prop.handleSelectChange(value, "ward")}
        className="h-[40px]"
        value={prop.formData?.ward}
      >
        <Option value="ward1">Phường 1</Option>
        <Option value="ward2">Phường 2</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TÊN ĐƯỜNG</label>
      }
    >
      <Input
        name="street"
        onChange={prop.handleAddressInputChange}
        placeholder="Nhập tên đường"
        className="h-[40px]"
        value={prop.formData?.street}
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">SỐ NHÀ</label>
      }
    >
      <Input
        name="houseNumber"
        onChange={prop.handleAddressInputChange}
        placeholder="Nhập số nhà"
        className="h-[40px]"
        value={prop.formData?.houseNumber}
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">PHÒNG SỐ</label>
      }
    >
      <Input
        name="roomNumber"
        onChange={prop.handleInputChange}
        placeholder="Nhập số phòng"
        className="h-[40px]"
      />
    </Form.Item>
  </Form>
);

export default AddressForm;
