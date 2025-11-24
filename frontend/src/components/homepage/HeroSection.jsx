import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../TokenProvider";

const HeroSection = ({ CheckCircle }) => {
  const demoList = [
    "Complete project proposal",
    "Review code changes",
    "Schedule team meeting",
  ];
  const navigate = useNavigate();
  const { isTokenValid } = useContext(TokenContext);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Organize Your Life with
          <span className="text-purple-600"> TodoApp</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The simplest way to manage your tasks, boost productivity, and achieve
          your goals. Get started for free today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              isTokenValid ? navigate("/todo") : navigate("/login")
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl cursor-pointer"
          >
            Get Started Free
          </button>
          {/* <button className="bg-white hover:bg-gray-50 text-purple-600 font-semibold px-8 py-4 rounded-lg text-lg transition-colors border-2 border-purple-600 cursor-pointer">
            Watch Demo
          </button> */}
        </div>
      </div>

      {/* Hero Image/Illustration */}
      <div className="mt-12 md:mt-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="space-y-3">
            {demoList.map((list, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-green-50 rounded-lg"
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 line-through">{list}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
