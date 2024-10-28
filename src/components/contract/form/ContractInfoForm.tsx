import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
const { Option } = Select;
interface ContractInfoFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (value: string, name: string) => void;
}

const ContractInfoForm = (prop: ContractInfoFormProps) => (
  <Form layout="vertical" className="w-[725px]">
    <div className="border-b mb-5">
      <h1 className="text-base font-medium text-gray-60 mb-2">Bước 1</h1>
      <h3 className="text-lg font-medium text-blue-10 mb-4">
        Nội dung thuê phòng trọ
      </h3>
    </div>

    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          ĐỊA CHỈ PHÒNG TRỌ
        </label>
      }
    >
      <Input
        name="capacity"
        onChange={prop.handleInputChange}
        placeholder="Nhập địa chỉ"
        className="h-[40px] "
      />
    </Form.Item>

    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">PHÒNG SỐ</label>
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
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          GIÁ CHO THUÊ
          <div className="mt-4">
            <p className="text-xs font-normal">
              *Giá niêm yết: 5 000 000 đ/tháng
            </p>
            <p className="text-xs font-normal">
              {" "}
              ** Giá yêu cầu: 4 500 000 đ/tháng
            </p>
          </div>
        </label>
      }
    >
      <Input
        name="price"
        onChange={prop.handleInputChange}
        placeholder="Nhập giá cho thuê"
        suffix={"đ/tháng"}
        className="h-[40px]"
      />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          HÌNH THỨC THANH TOÁN
        </label>
      }
    >
      <Select
        placeholder="Chọn Thành phố"
        onChange={(value) => prop.handleSelectChange(value, "city")}
        className="h-[40px]"
      >
        <Option value="cash">Tiền mặt</Option>
        <Option value="credit">Chuyển khoản</Option>
      </Select>
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
          suffix="đ/kwh"
          className="w-full h-[40px]"
        />
      </div>
    </Form.Item>

    {/* Tiền nước */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">TIỀN NƯỚC</label>
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

    {/* Tiền Internet/Wi-Fi */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          TIỀN INTERNET/WIFI
        </label>
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

    {/* Chỗ để xe */}
    <Form.Item>
      <Checkbox
        name="parking"
        className="font-medium text-gray-20 space-x-3 text-base"
      >
        Có chỗ để xe
      </Checkbox>
    </Form.Item>

    {/* Phí giữ xe */}
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">PHÍ GIỮ XE</label>
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

    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">
          Ngày thanh toán hàng tháng
        </label>
      }
    >
      <Input
        name="price"
        onChange={prop.handleInputChange}
        placeholder="Nhập ngày thanh toán"
        className="h-[40px]"
      />
    </Form.Item>
    <div className="border-b mb-5">
      <h2 className="text-xl font-medium text-blue-10 mb-4">
        Thời hạn hợp đồng
      </h2>
    </div>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">Từ ngày</label>
      }
    >
      <DatePicker className="h-[40px] w-full" placeholder="Nhấn để chọn ngày" />
    </Form.Item>
    <Form.Item
      label={
        <label className="text-base font-medium text-gray-40">Đến ngày</label>
      }
    >
      <DatePicker className="h-[40px] w-full" placeholder="Nhấn để chọn ngày" />
    </Form.Item>
  </Form>
);

export default ContractInfoForm;
