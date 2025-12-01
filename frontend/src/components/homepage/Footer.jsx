

const Footer = ({ CheckCircle }) => {
    function scrolltoFeatures(id) {
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      behavior: "smooth",
    });
  }
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">TodoApp</span>
            </div>
            <p className="text-gray-400">
              The simplest way to manage your tasks and boost productivity.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors" onClick={() => scrolltoFeatures("features")}>
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors" onClick={() => scrolltoFeatures("about")}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors" onClick={() => scrolltoFeatures("contact")}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 TodoApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
