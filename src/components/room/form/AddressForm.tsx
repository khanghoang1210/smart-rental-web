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
      // Tìm mã code của thành phố từ tên thành phố
      const city = cities.find((c) => c.name_with_type === selectedCity);
      if (city) {
        const filteredDistricts = districts.filter(
          (district) => district.parent_code === city.code
        );
        setDistrictOptions(filteredDistricts); // Cập nhật danh sách quận/huyện

        // Reset state phụ thuộc
        setSelectedDistrict(null); // Reset quận/huyện
        setWardOptions([]); // Reset phường/xã
      } else {
        // Nếu không tìm thấy city, xóa các tùy chọn hiện có
        setDistrictOptions([]);
        setWardOptions([]);
      }
    } else {
      // Nếu không chọn thành phố, xóa các tùy chọn hiện có
      setDistrictOptions([]);
      setWardOptions([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      // Tìm mã code của quận/huyện từ tên quận/huyện
      const district = districts.find(
        (d) => d.name_with_type === selectedDistrict
      );
      if (district) {
        const filteredWards = wards.filter(
          (ward) => ward.parent_code === district.code
        );
        setWardOptions(filteredWards); // Cập nhật danh sách phường/xã
      } else {
        setWardOptions([]);
      }
    } else {
      // Nếu không chọn quận/huyện, xóa danh sách phường/xã
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
          showSearch
          placeholder="Chọn Thành phố"
          onChange={(value) => {
            prop.handleSelectChange(value, "city");
            setSelectedCity(value);
          }}
          className="h-[40px]"
          value={prop.formData?.city}
        >
          {cities.map((city) => (
            <Option key={city.code} value={city.name_with_type}>
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
          showSearch
          placeholder="Chọn Quận / Huyện"
          onChange={(value) => {
            prop.handleSelectChange(value, "district");
            setSelectedDistrict(value);
          }}
          className="h-[40px]"
          value={prop.formData?.district}
        >
          {districtOptions.map((district) => (
            <Option key={district.code} value={district.name_with_type}>
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
          showSearch
          placeholder="Chọn Phường / Xã"
          onChange={(value) => prop.handleSelectChange(value, "ward")}
          className="h-[40px]"
          value={prop.formData?.ward}
        >
          {wardOptions.map((ward) => (
            <Option key={ward.code} value={ward.name_with_type}>
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
