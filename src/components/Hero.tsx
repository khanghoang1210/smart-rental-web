
import homeImage from "../assets/home_image.png";
import PrimaryButton from "../ui/PrimaryButton";
// type HomeProps = {

// };

const Hero = () => {
  return (
    <div className="flex justify-center mt-16">
      <div className="mr-36 space-y-6">
        <h1 className="text-blue-10 font-semibold text-2xl">
          Tìm Phòng Trọ Nhanh, <br /> Ở Ngay Hôm Nay!
        </h1>
        <p className="text-gray-80 font-[20px]">
          Dễ dàng tìm được chỗ ở phù hợp, <br /> bắt đầu cuộc sống mới thật tiện lợi!
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
  );
};
export default Hero;
