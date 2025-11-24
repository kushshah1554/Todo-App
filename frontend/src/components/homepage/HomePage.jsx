import { useState } from "react";
import { CheckCircle, List, Clock, Users } from "lucide-react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import CtaSection from "./CtaSection";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 mt-9">
      {/* Hero Section */}
      <HeroSection CheckCircle={CheckCircle} />
      {/* Features Section */}
      <FeatureSection List={List} Clock={Clock} Users={Users} />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <Footer CheckCircle={CheckCircle} />
    </div>
  );
};

export default HomePage;
