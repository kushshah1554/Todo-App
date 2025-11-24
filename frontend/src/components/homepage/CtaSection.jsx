import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../TokenProvider";

const CtaSection = () => {
  const navigate = useNavigate();
  const { isTokenValid } = useContext(TokenContext);

  return (
    <section id="about" className="bg-gradient-to-r from-purple-600 to-pink-600 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Join thousands of users who are already organizing their lives with
          TodoApp
        </p>
        <button
          onClick={() => {
            isTokenValid ? navigate("todo") : navigate("login");
          }}
          className="bg-white hover:bg-gray-100 text-purple-600 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg cursor-pointer"
        >
          Start Free Trial
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
