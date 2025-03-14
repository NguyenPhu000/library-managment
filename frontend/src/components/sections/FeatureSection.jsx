import React from "react";
import { FaBookOpen, FaStar, FaGift, FaUserShield } from "react-icons/fa";

const features = [
  {
    icon: <FaBookOpen className="text-6xl text-green-400" />,
    title: "Kho sách khổng lồ",
    description:
      "Hơn 50.000 đầu sách với nhiều thể loại khác nhau, liên tục cập nhật.",
  },
  {
    icon: <FaStar className="text-6xl text-yellow-400" />,
    title: "Sách được đánh giá cao",
    description:
      "Danh sách những cuốn sách được yêu thích và đánh giá cao nhất.",
  },
  {
    icon: <FaGift className="text-6xl text-pink-400" />,
    title: "Sách miễn phí",
    description: "Đọc hàng ngàn sách miễn phí mà không cần đăng ký tài khoản.",
  },
  {
    icon: <FaUserShield className="text-6xl text-blue-400" />,
    title: "Bảo mật & Tiện lợi",
    description: "Đăng nhập an toàn, trải nghiệm đọc sách không giới hạn.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      {/* Tiêu đề */}
      <h2
        className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-400 to-green-400 text-transparent bg-clip-text mb-12 "
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
      >
        Tại sao chọn <span className="text-green-400">Góc Thư Viện</span>?
      </h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            {/* Icon nằm giữa */}
            <div className="flex justify-center mb-4">{feature.icon}</div>

            <h3 className="text-2xl font-semibold mb-3 text-gray-100">
              {feature.title}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
