import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm px-8 pt-6 pb-12 border-t border-primary md:py-24">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
        {/* Top Text */}
        <p className="text-gray-300 text-center md:text-start font-semibold leading-relaxed">
          Strategic Material Exchange™ is a registered trademark. This website
          utilizes the patented encryption technology
          <br />
          from QLIX Technologies, Inc. QLIX® is a registered trademark of QLIX
          Technologies, Inc.
        </p>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="mb-4 md:mb-0 font-semibold ">
            © Strategic Material Exchange™ All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-primary">
            <Link to="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:underline">
              Terms & Agreement
            </Link>
            <span>|</span>
            <Link to="/faqs" className="hover:underline">
              FAQs
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <span>|</span>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
