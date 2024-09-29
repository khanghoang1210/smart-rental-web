const Footer = () => {
    return (
      <footer className="mt-16 border-t border-gray-80 py-10 px-24">
        <div className="container mx-auto flex justify-between space-x-6">
          {/* Company Info */}
          <div className="w-1/4">
            <h2 className="text-xl font-semibold text-blue-500">Smart<span className="text-gray-900">Rent</span></h2>
            <p className="text-gray-60 mt-4">Nền tảng thuê phòng trọ toàn diện</p>
          </div>
  
          {/* Explore Section */}
          <div className="w-1/4">
            <h3 className="font-semibold text-lg text-blue-10">Khám phá thêm</h3>
            <ul className="mt-4 space-y-2 text-gray-60">
              <li>New Account</li>
              <li>Start Booking a Room</li>
              <li>Use Payments</li>
            </ul>
          </div>
  
          {/* About Section */}
          <div className="w-1/4">
            <h3 className="font-semibold text-lg text-blue-10">Về chúng tôi</h3>
            <ul className="mt-4 space-y-2 text-gray-60">
              <li>Our Careers</li>
              <li>Privacy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
  
          {/* Support Section */}
          <div className="w-1/4">
            <h3 className="font-semibold text-lg text-blue-10">Hỗ trợ</h3>
            <ul className="mt-4 space-y-2 text-gray-60">
              <li>support@staycation.id</li>
              <li>021 - 2208 - 1996</li>
              <li>Staycation, Kemang, Jakarta</li>
            </ul>
          </div>
        </div>
        <div className="mt-8  pt-6 text-center text-gray-60">
          Copyright 2019 • All rights reserved • SmartRent
        </div>
      </footer>
    );
  };
  
  export default Footer;
  