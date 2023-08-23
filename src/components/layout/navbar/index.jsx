import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { AiFillHome } from "react-icons/ai";
import { FaUserPlus, FaUsers } from "react-icons/fa";

const navItems = [
  { name: <AiFillHome className="inline text-lg" />, path: "/" },
  { name: <FaUserPlus className="inline text-lg" />, path: "/createCustomer" },
  { name: <FaUsers className="inline text-lg" />, path: "/createGroup" },
];

const Navbar = () => {
  return (
    <nav className="bg-slate-700 fixed top-0 w-full z-10 shadow-lg">
      <div className="lg:mx-14 md:mx-12 sm:mx-8 mx-2 max-w-7xl">
        <div className="relative flex h-14 items-center justify-between">
          <Link to="/">
            <h1 className="text-white block text-base font-medium">
              Midson <span className="text-green-500">Group</span>
            </h1>
          </Link>
          <div>
            {navItems.map((navItem, index) => (
              <NavItem key={index} name={navItem.name} path={navItem.path} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
