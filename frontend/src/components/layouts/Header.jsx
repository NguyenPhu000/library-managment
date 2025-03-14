import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-8 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-tight flex items-center space-x-2">
        <span className="text-lightGreen">Góc</span>
        <span className="text-white">Thư</span>
        <span className="text-lightGreen">Viện</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        <Link to="/" className="hover:text-lightGreen transition-colors">
          Trang Chủ
        </Link>
        <Link to="/list" className="hover:text-lightGreen transition-colors">
          Danh Sách
        </Link>
        <Link to="/contact" className="hover:text-lightGreen transition-colors">
          Liên Hệ
        </Link>
      </nav>

      {/* Search & User */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-gray-800 text-white rounded-full px-5 py-2 pl-10 w-48 focus:w-64 focus:ring-2 focus:ring-lightGreen outline-none transition-all"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
        </div>

        {/* User Icon + Dropdown */}
        <div className="relative">
          <i
            className="fas fa-user-circle text-3xl cursor-pointer text-gray-400 hover:text-lightGreen transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ></i>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                📜 Hồ sơ
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                ⚙ Cài đặt
              </Link>
              <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700">
                🚪 Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
