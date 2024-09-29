import homeImage from "../assets/home_image.png";
import heroImage1 from "../assets/hero_img1.png";
import PrimaryButton from "../ui/PrimaryButton";
// type HomeProps = {

// };

const Hero = () => {
  return (
    <div className="flex flex-col justify-center mt-16">
      <div className="flex justify-center space-x-10">
        <div className="mr-36 space-y-6">
          <h1 className="text-blue-10 font-semibold text-2xl">
            Tìm Phòng Trọ Nhanh, <br /> Ở Ngay Hôm Nay!
          </h1>
          <p className="text-gray-80 font-[20px]">
            Dễ dàng tìm được chỗ ở phù hợp, <br /> bắt đầu cuộc sống mới thật
            tiện lợi!
          </p>
          <PrimaryButton name="Khám phá ngay" />
        </div>
        <div className="relative w-[520px] h-[410px]">
          <div className="absolute top-8 left-8 w-full h-full rounded-tl-[100px] border-2 border-gray-80 rounded-xl" />
          <img
            src={homeImage}
            alt=""
            className="relative rounded-tl-[100px] rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-gradient-to-b from-blue-40 to-blue-80 relative flex justify-between items-center mt-16 rounded-3xl h-[300px] w-[950px]">
          <div className="space-y-4 ml-16">
            <h1 className="text-gray-80 font-bold text-3xl">
              Bạn có phòng trọ <br /> muốn cho thuê?
            </h1>
            <p className="text-gray-80 text-base">
              Đăng tin phòng trọ nhanh chóng và dễ dàng, <br /> giúp bạn tiếp
              cận ngay với hàng nghìn người <br /> đang tìm kiếm chỗ ở phù hợp!
            </p>
            <PrimaryButton name="Đăng phòng trọ" />
          </div>

          <div className="absolute right-7 mr-16">
            <img
              src={heroImage1}
              alt=""
              className="relative h-[300px] w-auto "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
