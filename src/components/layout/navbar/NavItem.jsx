import { Link, useLocation } from "react-router-dom";

const NavItem = ({ name, path }) => {
  const location = useLocation();
  let pathname = location.pathname;

  return (
    <Link to={path}>
      <span
        className={`text-sm p-2 rounded-md text-white hover:bg-gray-600 me-2 ${
          pathname === path ? "bg-gray-600" : ""
        }`}
      >
        {name}
      </span>
    </Link>
  );
};

export default NavItem;
