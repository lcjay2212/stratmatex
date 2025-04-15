import { Menu, X } from "lucide-react"; // Optional: for icons
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/stratmatex-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-medium" : "hover:text-primary"
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-primary font-medium" : "hover:text-primary"
          }
          onClick={() => setIsOpen(false)}
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-primary font-medium" : "hover:text-primary"
          }
          onClick={() => setIsOpen(false)}
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-black/70 text-white px-8 py-4 shadow-md absolute inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </div>

        <ul className="hidden md:flex gap-8 text-[16px]">{navLinks}</ul>

        <div className="hidden md:flex gap-4 text-sm">
          <Link
            to="/register"
            className="border border-white rounded-full px-6 py-2 hover:bg-primary hover:border-primary transition"
          >
            Sign up
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 px-4">
          <ul className="flex flex-col gap-4 text-[16px]">{navLinks}</ul>
          <div className="mt-4">
            <Link
              to="/register"
              className="block text-center border border-white rounded-full px-6 py-2 hover:bg-primary hover:border-primary transition"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
