import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../TokenProvider";

const Header = ({
  Menu,
  X,
  mobileMenuOpen,
  setMobileMenuOpen,
  CheckCircle,
}) => {
  const navigate = useNavigate();
  const { isTokenValid, setIsTokenValid } = useContext(TokenContext);

  const logoutControll = (mobile) => {
    localStorage.removeItem("accessToken");
    setIsTokenValid(false);
    if (mobile === "mb") {
      setMobileMenuOpen(false);
    }
    navigate("/");
  };

  const scrolltoFeature = (id,mobile,e) => {
    navigate("/");
  e?.preventDefault();

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
        if (mobile === "mb") {
      setMobileMenuOpen(false);
    }
      }
    }, 100);
  };
  return (
    <header className="bg-white shadow-sm fixed inset-x-0 top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">TodoApp</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              onClick={(e) => scrolltoFeature("features","",e)}
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => scrolltoFeature("about","",e)}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => scrolltoFeature("contact","",e)}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Contact
            </a>

            {isTokenValid ? (
              <button
                onClick={() => logoutControll()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    navigate("login");
                  }}
                  className="text-purple-600 hover:text-purple-700 font-semibold px-4 py-2 transition-colors cursor-pointer "
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("signup");
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md cursor-pointer "
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <a
              href="#features"
              onClick={() => scrolltoFeature("features", "mb")}
              className="block text-gray-700 hover:text-purple-600 font-medium py-2"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => scrolltoFeature("about", "mb")}
              className="block text-gray-700 hover:text-purple-600 font-medium py-2"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => scrolltoFeature("contact", "mb")}
              className="block text-gray-700 hover:text-purple-600 font-medium py-2"
            >
              Contact
            </a>

            {isTokenValid ? (
              <button
                onClick={() => logoutControll("mb")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("login");
                  }}
                  className="w-full text-left text-purple-600 hover:text-purple-700 font-semibold py-2 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("signup");
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
