import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 px-8 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Links */}
        <nav className="flex justify-center space-x-6 mb-4 text-sm">
          <Link to="/" className="hover:text-lightGreen transition-colors">
            Trang Chủ
          </Link>
          <Link to="/list" className="hover:text-lightGreen transition-colors">
            Danh Sách
          </Link>
          <Link
            to="/contact"
            className="hover:text-lightGreen transition-colors"
          >
            Liên Hệ
          </Link>
          <Link to="/terms" className="hover:text-lightGreen transition-colors">
            Điều khoản
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs">
          © {new Date().getFullYear()}{" "}
          <span className="text-lightGreen">Góc Thư Viện</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
