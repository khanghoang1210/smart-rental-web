import { Form, Input } from "antd";

interface ContractInfoFormProps {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (value: string, name: string) => void;
}

const ResponsibityForm = (prop:ContractInfoFormProps) => {
  return (
    <Form  layout="vertical" className="w-[725px]">
      <div className="border-b mb-5">
        <h1 className="text-base font-medium text-gray-60 mb-2">Bước 2</h1>
        <h3 className="text-lg font-medium text-blue-10 mb-4">
        Trách nhiệm của các bên
        </h3>
      </div>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">TRÁNH NHIỆM CỦA BÊN A</label>
        }
        className="mb-4"
      >
        <Input.TextArea
          placeholder="Môi trường sống sạch, khu phố an ninh..."
          name="responsibilityA"
          rows={6}
          maxLength={500}
          onChange={prop.handleInputChange}
        />
      </Form.Item>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">TRÁNH NHIỆM CỦA BÊN B</label>
        }
        className="mb-4"
      >
        <Input.TextArea
          placeholder="Môi trường sống sạch, khu phố an ninh..."
          name="responsibilityB"
          rows={6}
          maxLength={500}
          onChange={prop.handleInputChange}
        />
      </Form.Item>
      <Form.Item
        label={
          <label className="text-base font-medium text-gray-40">TRÁNH NHIỆM CHUNG</label>
        }
        className="mb-4"
      >
        <Input.TextArea
          name="generalResponsibility"
          placeholder="Môi trường sống sạch, khu phố an ninh..."
          rows={6}
          maxLength={500}
          onChange={prop.handleInputChange}
        />
      </Form.Item>
    </Form>
  );
};

export default ResponsibityForm;
