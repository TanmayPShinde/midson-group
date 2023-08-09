// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-gray-700 fixed top-0 w-full z-10 shadow-xl">
      <div className="lg:mx-14 md:mx-12 sm:mx-8 mx-2 max-w-7xl">
        <div className="relative flex h-14 items-center justify-between">
          <Link to="/">
            <h1 className="text-white block text-base font-medium">
              Midson <span className="text-green-500">Group</span>
            </h1>
          </Link>
          <div>
            <Link to="/">
              <span className="text-sm p-2 text-white rounded-md hover:bg-slate-600 me-2">
                Home
              </span>
            </Link>
            <Link to="/createCustomer">
              <sapn className="text-sm p-2 text-white rounded-md hover:bg-slate-600">
                Add Customer
              </sapn>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
