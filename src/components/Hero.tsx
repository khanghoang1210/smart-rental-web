import ButtonClick from "../ui/ButtonClick";
import homeImage from "../assets/home_image.png";
// type HomeProps = {

// };

const Hero = () => {
  return (
    <div className="flex justify-center mt-16">
      <div>
        <h1 className="text-blue-10 font-semibold text-2xl">
          Tìm Phòng Trọ Nhanh, Ở Ngay Hôm Nay!
        </h1>
        <p className="text-gray-80 font-[20px]">
          Dễ dàng tìm được chỗ ở phù hợp, bắt đầu cuộc sống mới thật tiện lợi!
        </p>
        <ButtonClick name="Khám phá ngay" />
      </div>
      <div className="w-[560px] h-[450px] shadow-[20px_20px_#fff]">
        <img src={homeImage} alt="" className="rounded-tl-[100px] rounded-lg" />
      </div>
     
    </div>
  );
};
export default Hero;
