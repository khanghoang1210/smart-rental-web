import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
const { Option } = Select;
interface ContractInfoFormProps {
  formData: Record<string, any>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleDateChange: (
    date: dayjs.Dayjs | null,
    dateString: string,
    name: string
  ) => void;
}

const ContractInfoForm = (prop: ContractInfoFormProps) => {
  return (
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
          name="address"
          value={
            prop.formData.city
              ? prop.formData.houseNumber +
                ", " +
                prop.formData.street +
                ", " +
                prop.formData.ward +
                ", " +
                prop.formData.district +
                ", " +
                prop.formData.city
              : undefined
          }
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
          value={prop.formData.roomNumber}
          name="roomNumber"
          onChange={prop.handleInputChange}
          placeholder="Nhập số phòng"
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
          value={prop.formData.price}
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
          placeholder="Chọn hình thức thanh toán"
          onChange={(value) => prop.handleSelectChange(value, "paymentMethod")}
          className="h-[40px]"
        >
          <Option value="cash">Tiền mặt</Option>
          <Option value="credit">Chuyển khoản</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            TIỀN ĐIỆN
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
            name="electricFee"
            onChange={prop.handleInputChange}
            value={prop.formData.electricFee}
            placeholder="Nhập số tiền"
            suffix="đ/kwh"
            className="w-full h-[40px]"
          />
        </div>
      </Form.Item>

      {/* Tiền nước */}
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            TIỀN NƯỚC
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
            name="waterFee"
            onChange={prop.handleInputChange}
            value={prop.formData.waterFee}
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
            name="internetFee"
            onChange={prop.handleInputChange}
            value={prop.formData.internetFee}
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
          checked={prop.formData.parking}
        >
          Có chỗ để xe
        </Checkbox>
      </Form.Item>

      {/* Phí giữ xe */}
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            PHÍ GIỮ XE
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
            name="parkingFee"
            onChange={prop.handleInputChange}
            value={prop.formData.parkingFee}
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
      {["beginDate", "endDate"].map((dateField) => (
        <Form.Item
          key={dateField}
          label={
            <label className="text-base font-medium text-gray-40">
              {dateField === "beginDate" ? "Từ ngày" : "Đến ngày"}
            </label>
          }
        >
          <DatePicker
            name={dateField}
            value={
              prop.formData[dateField] ? dayjs(prop.formData[dateField]) : null
            }
            onChange={(date, dateString) =>
              prop.handleDateChange(date, dateString[0], dateField)
            }
            className="h-[40px] w-full"
            placeholder="Nhấn để chọn ngày"
          />
        </Form.Item>
      ))}
    </Form>
  );
};

export default ContractInfoForm;
