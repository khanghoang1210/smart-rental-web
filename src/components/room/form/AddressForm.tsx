import { Form, Input, Select } from "antd";
import cities from "../../../assets/data/cities.json";
import districts from "../../../assets/data/districts.json";
import wards from "../../../assets/data/wards.json";
import { useEffect, useState } from "react";
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

interface Location {
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
}
const AddressForm = (prop: AddressFormProps) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [districtOptions, setDistrictOptions] = useState<Location[]>([]);
  const [wardOptions, setWardOptions] = useState<Location[]>([]);

  useEffect(() => {
    if (selectedCity) {
      const filteredDistricts = districts.filter(
        (district) => district.parent_code === selectedCity
      );
      setDistrictOptions(filteredDistricts); // TypeScript giờ sẽ hiểu kiểu dữ liệu
      setSelectedDistrict(null); // Reset quận/huyện
      setWardOptions([]); // Reset phường/xã
    } else {
      setDistrictOptions([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const filteredWards = wards.filter(
        (ward) => ward.parent_code === selectedDistrict
      );
      setWardOptions(filteredWards);
    } else {
      setWardOptions([]);
    }
  }, [selectedDistrict]);
  return (
    <Form layout="vertical">
      <div className="border-b mb-5">
        <h1 className="text-base font-medium text-gray-60 mb-2">Bước 2</h1>
        <h3 className="text-lg font-medium text-blue-10 mb-4">Địa chỉ</h3>
      </div>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            THÀNH PHỐ
          </label>
        }
      >
        <Select
          placeholder="Chọn Thành phố"
          onChange={(value) => {
            prop.handleSelectChange(value, "city");
            setSelectedCity(value);
          }}
          className="h-[40px]"
          value={prop.formData?.city}
        >
          {cities.map((city) => (
            <Option key={city.code} value={city.code}>
              {city.name_with_type}
            </Option>
          ))}
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
          onChange={(value) => {
            prop.handleSelectChange(value, "district");
            setSelectedDistrict(value);
          }}
          className="h-[40px]"
          value={prop.formData?.district}
        >
          {districtOptions.map((district) => (
            <Option key={district.code} value={district.code}>
              {district.name_with_type}
            </Option>
          ))}
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
          {wardOptions.map((ward) => (
            <Option key={ward.code} value={ward.code}>
              {ward.name_with_type}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            TÊN ĐƯỜNG
          </label>
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
};

export default AddressForm;
