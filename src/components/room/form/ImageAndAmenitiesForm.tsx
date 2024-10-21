import { Form, Upload } from "antd";
import { UtilitiesData } from "../../filter/UtilitiesList";
import UtilitiesButton from "@/ui/UtilitiesButton";
import digital from "../../../assets/digital.svg";

const ImageAndAmenitiesForm = () => {
  return (
    <Form layout="vertical" className="w-[725px]">
      <div className="border-b mb-5">
        <h1 className="text-base font-medium text-gray-60 mb-2">Bước 3</h1>
        <h3 className="text-lg font-medium text-blue-10 mb-4">
          Thông tin hình ảnh và tiện ích
        </h3>
      </div>

      {/* Hình ảnh */}
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">HÌNH ẢNH</label>
        }
        className="mb-6"
      >
        <Upload.Dragger className="h-44 border-dashed">
          <div className="ant-upload-drag-icon flex justify-center mb-3">
            <img src={digital} alt="" />
          </div>
          <p className="ant-upload-text text-blue-60">
            Bấm hoặc kéo thả hình ảnh vào đây để <br /> đăng hình ảnh từ thư
            viện nhé!
          </p>
        </Upload.Dragger>
      </Form.Item>

      {/* Tiện ích */}
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">TIỆN ÍCH</label>
        }
        className="mb-4"
      >
        <div className="grid grid-cols-4 gap-4">
          {UtilitiesData.map((utility) => (
            <UtilitiesButton name={utility.name} icon={utility.icon} />
          ))}
        </div>
      </Form.Item>
    </Form>
  );
};

export default ImageAndAmenitiesForm;
