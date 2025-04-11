import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/stratmatex-logo.png";

const Navbar = () => (
  <nav className="text-white px-8 py-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </div>

      <ul className="flex gap-8 text-sm">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-medium" : "hover:text-orange-400"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-medium" : "hover:text-orange-400"
            }
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-orange-500 font-medium" : "hover:text-orange-400"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div className="flex gap-4 text-sm">
        {/* <Link to="/login" className="hover:text-orange-400">
          Login
        </Link> */}
        <Link
          to="/signup"
          className="border border-white rounded-full px-6 py-2 hover:bg-orange-500 hover:border-orange-500 transition"
        >
          Sign up
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
