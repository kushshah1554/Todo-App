import { useState } from "react";
import { Menu, X } from "lucide-react";

const HeaderTest = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 ">
      <header className="bg-white p-8 min-w-full ">
        <div className="flex justify-between ">
          <div>LOGO</div>
          <div className="md:flex gap-5 border-2 hidden ">
            <div>Home</div>
            <div>About</div>
            <div>Contact</div>
            <div>Login</div>
            <button>sign up</button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              {showMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {showMenu && (
          <div>
            <div className="md:hidden gap-5 border-t">
              <div>Home</div>
              <div>About</div>
              <div>Contact</div>
              <div>Login</div>
              <button>sign up</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default HeaderTest;
