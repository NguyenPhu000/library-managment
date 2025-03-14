import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-6 flex flex-col lg:flex-row items-center justify-center">
      {/* Nội dung chính */}
      <div className="relative z-10 max-w-3xl text-center lg:text-left">
        <h1
          className="text-6xl font-extrabold leading-tight tracking-wide bg-gradient-to-r from-white via-gray-400 to-lightGreen text-transparent bg-clip-text"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
        >
          Khám phá kho tàng tri thức
        </h1>

        <p className="mt-5 text-lg opacity-90">
          Đọc hàng ngàn cuốn sách miễn phí, bất cứ lúc nào, bất cứ nơi đâu!
        </p>

        {/* Nút CTA */}
        <button className="mt-6 bg-lightGreen px-8 py-3 rounded-full text-black font-semibold text-lg hover:bg-green-500 transition-all shadow-lg transform hover:scale-105">
          🚀 Khám phá ngay
        </button>
      </div>

      {/* Hình ảnh minh họa (Đặt bên phải) */}
      <div className="mt-10 lg:mt-0 lg:ml-16 w-full max-w-xs lg:max-w-md">
        <img
          src="./uploads/coverBook.jpg"
          alt="Books"
          className="rounded-lg shadow-2xl hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
};

export default HeroSection;
