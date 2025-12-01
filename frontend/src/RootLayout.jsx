import { Outlet } from "react-router-dom";
import Header from "./components/homepage/Header";
import { useState } from "react";
import { CheckCircle, Menu, X } from "lucide-react";


const RootLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Header */}

      <Header
        Menu={Menu}
        X={X}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        CheckCircle={CheckCircle}
      />
      <Outlet />
     
    </>
  );
};

export default RootLayout;
