import { useState } from "react";
import ContractTemplate from "../contract/form/PreviewForm";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import letter from "../../assets/letter.png";
import term from "../../assets/terms.png";
import credit_card from "../../assets/credit_card.png";
import rating from "../../assets/rating.png";

interface FormValues {
  suggested_price: string;
  num_of_person: string;
  begin_date: Date;
  end_date: Date;
  addition_request: string;
}
const ContractDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  // Close the first modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Open the second modal
  const handleConfirmEndContract = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
  };

  // Close the second modal
  const handleCloseSecondModal = () => {
    setIsSecondModalVisible(false);
  };

  const handleSubmit = () => {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <h1 className="text-center my-10 text-2xl text-gray-20">
        Chi tiết hợp đồng
      </h1>
      <ContractTemplate formData={{}} />
      <div className="flex justify-between mt-6">
        <button
          onClick={handleOpenModal}
          className="border border-red text-red px-16 py-3 rounded-[100px]"
        >
          Kết thúc hợp đồng
        </button>
        <button className="bg-blue-60 text-[#FFF] px-16 py-3 rounded-[100px]">
          Gia hạn hợp đồng
        </button>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#fff] rounded-[20px] p-8 w-[400px] text-center relative">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-blue-60 w-16 h-16 flex items-center justify-center rounded-full text-[#fff] text-3xl">
                !
              </div>
              <h2 className="text-xl font-semibold text-gray-20">Thông báo</h2>
              <p className="text-gray-20">
                Bạn có chắc chắn muốn kết thúc{" "}
                <span>hợp đồng và tiến hành trả phòng</span>?
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  className="px-6 py-2 w-32 rounded-full border border-blue-60 text-blue-60 hover:bg-gray-100"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
                <button
                  className="px-6 py-2 w-32 rounded-full bg-blue-60 text-[#fff] hover:bg-blue-700"
                  onClick={handleConfirmEndContract}
                >
                  Chắc chắn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Modal
        className="flex flex-row justify-center items-center h-[600px] "
        title={
          <label
            style={{
              color: "#49454F",
              fontWeight: "500px",
              fontSize: "28px",
            }}
          >
            Gửi yêu cầu trả phòng
          </label>
        }
        open={isSecondModalVisible}
        onCancel={handleCloseSecondModal}
        footer={null}
      >
        <div className=" p-8 flex space-x-10">
          {/* Left Column: Instructions */}
          <div className="bg-gray-90 px-6 py-10 rounded-lg w-[380px] text-gray-20">
            <h1 className="text-sm font-normal mb-4 text-center">
              Hoàn tất quá trình trả phòng trọ với các bước sau:
            </h1>
            <div className="space-y-3">
              {/* Instruction steps */}
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  1
                </div>
                <div>
                  <img src={letter} alt="" className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Gửi yêu cầu trả phòng</h1>
                  <p className="text-[10px]">
                    Gửi yêu cầu trả phòng của bạn đến chủ nhà
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  2
                </div>
                <div>
                  <img src={term} alt="" className="w-10 h-10"  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Kiểm tra phòng và xác nhận</h1>
                  <p className="text-[10px]">
                    Chủ nhà sẽ kiểm tra phòng sau khi bạn trả
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  3
                </div>
                <div>
                  <img src={credit_card} alt="" className="w-10 h-10"  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Hoàn tiền đặt cọc</h1>
                  <p className="text-[10px]">
                    Tiền đặt cọc sẽ được hoàn trả cho bạn
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                <div className="rounded-full w-8 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                  4
                </div>
                <div>
                  <img src={rating} alt=""  className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-sm">Đánh giá chủ nhà</h1>
                  <p className="text-[10px]">
                    Đánh giá chủ nhà sau quá trình thuê
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-[585px]">
            <Form<FormValues>
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              
                <Form.Item
                  name="begin_date"
                  label={
                    <label
                      style={{
                        color: "#878787",
                        fontWeight: "800px",
                        fontSize: "16px",
                      }}
                    >
                      Ngày trả phòng
                    </label>
                  }
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày dọn vào" },
                  ]}
                  
                >
                  <Checkbox className="mb-3 text-gray-40">
                    Theo thời hạn hợp đồng
                  </Checkbox>
                  <DatePicker
                    className=" rounded-[10px]"
                    placeholder="Chọn ngày"
                    style={{ width: "100%", height: "50px" }}
                    onChange={(date) =>
                      form.setFieldsValue({
                        begin_date: date?.toDate() ?? null,
                      })
                    }
                  />
                </Form.Item>

                

              <Form.Item
                name="addition_request"
                label={
                  <label
                    style={{
                      color: "#878787",
                      fontWeight: "500px",
                      fontSize: "16px",
                    }}
                  >
                    Lý do
                  </label>
                }
              >
                <Input.TextArea
                  className=" rounded-[10px]"
                  rows={4}
                  placeholder="Nhập lý do"
                />
              </Form.Item>
              <Form.Item>
                <div className="flex justify-start items-start space-x-20 ">
                  <p className="text-start text-gray-40 text-base font-normal w-[290px]">
                    Bằng việc gửi yêu cầu thuê, chủ nhà có thể nhìn thấy thông
                    tin cá nhân của bạn
                  </p>
                  <Checkbox className="mb-3 text-gray-40">Tôi đồng ý</Checkbox>
                </div>
              </Form.Item>
              <Form.Item>
                <div className="flex justify-end space-x-8">
                  <Button className="h-[50px] w-[150px] rounded-[100px] border-blue-60 text-blue-60 text-base font-medium">
                    Huỷ
                  </Button>
                  <Button
                    className="h-[50px] w-[150px] rounded-[100px] bg-blue-60 text-[#FFF] font-medium text-base"
                    htmlType="submit"
                  >
                    Gửi
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      
    </div>
  );
};

export default ContractDetail;
