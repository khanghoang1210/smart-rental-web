import { Form, Input } from 'antd';

interface ConfirmationFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const ConfirmationForm = (prop: ConfirmationFormProps) => {
  return (
    <Form layout="vertical" className="w-[725px]">
      {/* Tiêu đề bước */}
      <div className="border-b mb-5">
        <h1 className="text-base font-medium text-gray-60 mb-2">Bước 4</h1>
        <h3 className="text-lg font-medium text-blue-10 mb-4">Xác nhận</h3>
      </div>

      {/* Tiêu đề bài đăng */}
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">
            TIÊU ĐỀ BÀI ĐĂNG
          </label>
        }
        className="mb-4"
      >
        <Input
        name='title'
          placeholder="Nhập tiêu đề bài đăng"
          maxLength={60}
          showCount
          className="h-10"
          onChange={prop.handleInputChange}
        />
      </Form.Item>

      {/* Mô tả */}
      <Form.Item
        label={<label className="text-base font-medium text-gray-40">MÔ TẢ</label>}
        className="mb-4"
      >
        <Input.TextArea
          placeholder="Môi trường sống sạch, khu phố an ninh..."
          name="description"
          rows={6}
          maxLength={500}
          onChange={prop.handleInputChange}
        />
      </Form.Item>
    </Form>
  );
};

export default ConfirmationForm;
