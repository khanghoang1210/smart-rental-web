import { Button, Card, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import wc from "../../assets/wc.svg";
import win from "../../assets/bed.svg";
import wifi from "../../assets/wifi.svg";
import refri from "../../assets/refrigerator.svg";
import laundry from "../../assets/laundry.svg";
import bike from "../../assets/bike.svg";
import UtilitiesButton from "@/ui/UtilitiesButton";
import bulb from "../../assets/bulb_active.svg";
import bike_active from "../../assets/bike_active.svg";
import wifi_active from "../../assets/wifi_active.svg";
import water_active from "../../assets/water_active.svg";
import letter from "../../assets/letter.png";
import phone_call from "../../assets/phone_call.png";
import credit_card from "../../assets/credit_card.png";
import terms from "../../assets/terms.png";
import contract from "../../assets/contract.png";
import FeaturedRooms from "./FeaturedRoom";
import address from "../../assets/address.svg";
import message_white from "../../assets/message_white.svg";
import LandlordInfo from "../user/LandlordInfo";
import { useEffect, useState } from "react";
import Map from "../map/Map";
import { useNavigate, useParams } from "react-router-dom";
import { RoomRes } from "@/models/room";
import RoomService from "@/services/RoomService";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import Footer from "@/ui/Footer";
import Navbar from "../home/Navbar";
import { toCurrencyAbbreviation, toCurrencyFormat } from "@/utils/converter";
import UserService from "@/services/UserService";
import { UserRes } from "@/models/user";
import { CreateRentalRequestReq } from "@/models/chat/request";
import RequestService from "@/services/RequestService";
import ConversationService from "@/services/ConversationService";

const UtilitiesData = [
  { id: 1, name: "WC riêng", icon: wc },
  { id: 2, name: "Cửa sổ", icon: win },
  { id: 3, name: "Wifi", icon: wifi },
  { id: 5, name: "Máy giặt", icon: laundry },
  { id: 6, name: "Tủ lạnh", icon: refri },
  { id: 7, name: "Chỗ để xe", icon: bike },
];

interface FormValues {
  suggested_price: string;
  num_of_person: string;
  begin_date: Date;
  end_date: Date;
  addition_request: string;
}
const RoomDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [room, setRoom] = useState<RoomRes>();
  const [user, setUser] = useState<UserRes>();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const roomId = id ? parseInt(id, 10) : null;
  const [conversationId, setConversationId] = useState<number | null>(null);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (values: FormValues) => {
    if (!roomId) {
      toast.error("Invalid room ID");
      return;
    }
    if (
      parseFloat(values.suggested_price) < 0 ||
      parseInt(values.num_of_person, 10) < 0
    ) {
      toast.error("Giá trị không hợp lệ");
      return;
    }
    const requestService = new RequestService();
    const requestData: CreateRentalRequestReq = {
      room_id: roomId,
      suggested_price: parseFloat(values.suggested_price),
      num_of_person: parseInt(values.num_of_person, 10),
      begin_date: values.begin_date,
      end_date: values.end_date,
      addition_request: values.addition_request,
    };

    console.log(requestData);
    try {
      await requestService.createRentalRequest(token, requestData);
      toast.success("Gửi yêu cầu thuê thành công");
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  useEffect(() => {
    const roomService = new RoomService();
    const userSerivce = new UserService();
    if (roomId === null || isNaN(roomId)) {
      toast.error("Phòng không tồn tại");
      return;
    }
    const fetchRoomByID = async (id: number) => {
      try {
        const roomRes = await roomService.getByID(token, id);
        const data = roomRes.data.data;
        setRoom(data);
        if (room?.owner) {
          const landlord = await userSerivce.getUserByID(room?.owner, token);
          setUser(landlord.data.data);
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    fetchRoomByID(roomId);
  }, [id, token, room?.owner]);

  const handleStartConversation = async () => {
    try {
      // Nếu conversation đã tồn tại, điều hướng đến trang trò chuyện
      if (conversationId) {
        navigate(`/chat/${conversationId}`);
        return;
      }

      // Nếu chưa, tạo conversation mới
      const conversationService = new ConversationService();
      if (user) {
        const response = await conversationService.createConversation(
          token,
          user?.id
        );

        if (response && response.data) {
          const newConversationId = response.data.id; // ID của conversation mới
          setConversationId(newConversationId);

          // Điều hướng đến trang chat
          navigate(`/chat/${newConversationId}`);
        } else {
          toast.error("Không thể tạo cuộc trò chuyện, vui lòng thử lại.");
        }
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Đã xảy ra lỗi khi bắt đầu cuộc trò chuyện.");
    }
  };
  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-8">
        {/* Title and Address */}
        <div className="mb-8 text-center mt-12 space-y-5">
          <h1 className="text-[32px] font-bold text-blue-10">{room?.title}</h1>
          <div className="flex justify-center items-center space-x-2">
            <img src={address} alt="" />
            <p className="text-gray-60 text-xl ">{room?.address.join(", ")}</p>
          </div>
        </div>

        {/* Images Section */}
        <div className="flex grid-cols-3 gap-4 justify-center items-center">
          {/* Main Image */}
          <div className="col-span-1">
            <img
              src={room?.room_images[0]}
              alt="Main Property"
              className="rounded-lg object-cover w-[570px] h-80"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <img
              src={room?.room_images[0]}
              alt="Living Room"
              className="rounded-lg object-cover w-[450px] h-40"
            />
            <img
              src={room?.room_images[0]}
              alt="Bedroom"
              className="rounded-lg object-cover w-full h-40"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <div className="w-[570px]">
            <div className="mt-6 flex items-center justify-between bg-blue-98 p-4 rounded-lg">
              <div className="text-center">
                <span className="text-gray-20 text-sm uppercase block">
                  CÒN PHÒNG
                </span>
                <span className="text-blue-40 font-bold text-lg">
                  {room?.is_rent ? "Hết" : "Còn"}
                </span>
              </div>
              <div className="text-center">
                <span className="text-gray-20 text-sm uppercase block">
                  DIỆN TÍCH
                </span>
                <span className="text-blue-40 font-bold text-lg">
                  {room?.area}m2
                </span>
              </div>
              <div className="text-center">
                <span className="text-gray-20 text-sm uppercase block">
                  ĐẶT CỌC
                </span>
                <span className="text-blue-40 font-bold text-lg">
                  {toCurrencyAbbreviation(room?.deposit)}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-blue-10 mb-4">
                Mô tả
              </h3>
              <p className="text-gray-600">{room?.description}</p>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-blue-10 mb-4">
                Tiện ích
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {UtilitiesData.map((amenity) => (
                  <UtilitiesButton
                    key={amenity.id}
                    name={amenity.name}
                    icon={amenity.icon}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-5 w-[450px]">
            <Card className="shadow-md rounded-lg p-4 mt-6">
              <h3 className="text-2xl font-semibold text-blue-10 mb-4">
                Giá cả
              </h3>
              <h2 className="text-3xl font-bold text-blue-40 mb-4">
                {toCurrencyFormat(room?.total_price)} ₫ / phòng
              </h2>
              <div className="grid grid-cols-4 gap-4 border-2 border-blue-60 rounded-md p-4">
                <div className="flex flex-col items-center space-y-1">
                  <img src={bulb} alt="Bulb" className="w-8 h-8" />
                  <p className="font-bold text-blue-60">
                    {room?.internet_cost
                      ? room?.electricity_cost + "k"
                      : "Miễn phí"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <img src={water_active} alt="Water" className="w-8 h-8" />
                  <p className="font-bold text-blue-60">
                    {room?.internet_cost ? room?.water_cost + "k" : "Miễn phí"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <img src={wifi_active} alt="Wi-Fi" className="w-8 h-8" />
                  <p className="font-bold text-blue-60">
                    {room?.internet_cost
                      ? room?.internet_cost + "k"
                      : "Miễn phí"}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <img src={bike_active} alt="Bike" className="w-8 h-8" />
                  <p className="font-bold text-blue-60">
                    {room?.parking_fee ? room?.parking_fee + "k" : "Miễn phí"}
                  </p>
                </div>
              </div>

              <Button
                type="primary"
                block
                size="large"
                className="mt-6 bg-blue-40 text-white"
                onClick={showModal}
              >
                Thuê phòng ngay
              </Button>
            </Card>
          </div>
        </div>

        <FeaturedRooms title="Đề xuất" />
        <div className="flex items-center justify-center">
          <div className="flex justify-start items-center space-x-12 mr-24">
            <LandlordInfo name={user?.full_name} />
            <button
              onClick={handleStartConversation}
              className=" bg-blue-40 text-[#FFF] font-semibold py-2 px-6 rounded-lg shadow-md flex items-center justify-center h-14 w-[400px]"
            >
              <span className="mr-5">
                <img src={message_white} alt="" className="w-7" />
              </span>
              Nhắn tin cho Chủ nhà
            </button>
          </div>
        </div>

        <Map />
        {/* Modal zone */}
        <Modal
          className="flex flex-row justify-center items-center h-[700px] "
          title={
            <label
              style={{
                color: "#49454F",
                fontWeight: "500px",
                fontSize: "28px",
              }}
            >
              Gửi yêu cầu thuê phòng
            </label>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <div className=" p-8 flex space-x-10">
            {/* Left Column: Instructions */}
            <div className="bg-gray-90 px-6 py-10 rounded-lg w-[380px] text-gray-20">
              <h1 className="text-sm font-normal mb-4 text-center">
                Hoàn tất quá trình thuê phòng trọ nhanh chóng và an toàn với các
                bước sau:
              </h1>
              <div className="space-y-3">
                {/* Instruction steps */}
                <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                  <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <img src={letter} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">Gửi yêu cầu thuê phòng</h1>
                    <p className="text-[10px]">
                      Gửi yêu cầu thuê phòng của bạn đến chủ nhà
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                  <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <img src={phone_call} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">Thoả thuận với chủ nhà</h1>
                    <p className="text-[10px]">
                      Liên hệ với chủ nhà để thỏa thuận nếu cần thiết
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                  <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <img src={terms} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">Nhận và kiểm tra hợp đồng</h1>
                    <p className="text-[10px]">
                      Chủ nhà sẽ soạn thảo hợp đồng và gửi cho bạn qua ứng dụng
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                  <div className="rounded-full w-6 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <img src={contract} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">Ký hợp đồng điện tử</h1>
                    <p className="text-[10px]">
                      Nếu đồng ý với các điều khoản, thực hiện ký
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-[#FFF] py-2 px-4 border border-blue-80 rounded-xl">
                  <div className="rounded-full w-8 h-6 bg-blue-40 text-[#FFF] p-4 flex items-center justify-center">
                    5
                  </div>
                  <div>
                    <img src={credit_card} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-sm">Thanh toán tiền đặt cọc</h1>
                    <p className="text-[10px]">
                      Thực hiện thanh toán tiền đặt cọc để hoàn tất thủ tục thuê
                      phòng
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
                <div className="flex justify-center space-x-10 ">
                  <Form.Item
                    name="suggested_price"
                    label={
                      <label
                        style={{
                          color: "#878787",
                          fontWeight: "800px",
                          fontSize: "16px",
                        }}
                      >
                        Giá đề xuất
                      </label>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập giá đề xuất" },
                    ]}
                    className="w-[277px]"
                  >
                    <Input
                      placeholder="Nhập số tiền"
                      suffix={
                        <label
                          style={{
                            color: "#878787",
                            fontWeight: "800px",
                            fontSize: "16px",
                          }}
                        >
                          đ
                        </label>
                      }
                      className="h-[50px] rounded-[10px]"
                    />
                  </Form.Item>
                  <Form.Item
                    name="num_of_person"
                    label={
                      <label
                        style={{
                          color: "#878787",
                          fontWeight: "800px",
                          fontSize: "16px",
                        }}
                      >
                        Số người dự định ở cùng
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số người ở cùng",
                      },
                    ]}
                    className="w-[277px] text-gray-40"
                  >
                    <Input
                      placeholder="Số người"
                      className="h-[50px]  rounded-[10px]"
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-center space-x-10 ">
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
                        Ngày bắt đầu thuê
                      </label>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày dọn vào" },
                    ]}
                    className="w-[277px]"
                  >
                    <Checkbox className="mb-3 text-gray-40">
                      Có thể dọn vào ngay
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
                    name="end_date"
                    label={
                      <label
                        style={{
                          color: "#878787",
                          fontWeight: "500px",
                          fontSize: "16px",
                        }}
                      >
                        Ngày kết thúc thuê
                      </label>
                    }
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const beginDate = getFieldValue("begin_date");
                          if (!value || !beginDate || beginDate < value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu")
                          );
                        },
                      }),
                    ]}
                    className="w-[277px]"
                  >
                    <Checkbox className="mb-3 text-gray-40">
                      Tôi muốn thuê dài hạn
                    </Checkbox>

                    <DatePicker
                      className=" rounded-[10px]"
                      placeholder="Chọn ngày"
                      style={{ width: "100%", height: "50px" }}
                      onChange={(date) =>
                        form.setFieldsValue({
                          end_date: date?.toDate() ?? null,
                        })
                      }
                    />
                  </Form.Item>
                </div>

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
                      Yêu cầu đặc biệt
                    </label>
                  }
                >
                  <Input.TextArea
                    className=" rounded-[10px]"
                    rows={4}
                    placeholder="Cho phép nuôi thú cưng..."
                  />
                </Form.Item>
                <Form.Item>
                  <div className="flex justify-start items-start space-x-20 ">
                    <p className="text-start text-gray-40 text-base font-normal w-[290px]">
                      Bằng việc gửi yêu cầu thuê, chủ nhà có thể nhìn thấy thông
                      tin cá nhân của bạn
                    </p>
                    <Checkbox className="mb-3 text-gray-40">
                      Tôi đồng ý
                    </Checkbox>
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
      <Footer />
    </>
  );
};

export default RoomDetail;
