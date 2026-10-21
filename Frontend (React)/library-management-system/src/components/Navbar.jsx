import { Link } from "react-router";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { BookOpen, Info, Mail } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/allBooks" className="flex items-center gap-2">
                <BookOpen size={18} className="text-blue-300" />
                All Books
              </Link>
            </li>

            <li>
              <Link to="/about" className="flex items-center gap-2">
                <Info size={18} className="text-blue-300" />
                About Us
              </Link>
            </li>

            <li>
              <Link to="/contact" className="flex items-center gap-2">
                <Mail size={18} className="text-blue-300" />
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img className="h-9 w-9" src="../../public/icon.png" alt="" />
          LibraryHub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/allBooks" className="flex items-center gap-2">
              <BookOpen size={18} className="text-blue-300" />
              All Books
            </Link>
          </li>

          <li>
            <Link to="/about" className="flex items-center gap-2">
              <Info size={18} className="text-blue-300" />
              About Us
            </Link>
          </li>

          <li>
            <Link to="/contact" className="flex items-center gap-2">
              <Mail size={18} className="text-blue-300" />
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Login Button */}
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Login
        </button>

        {/* Login Modal */}
        <dialog
          id="my_modal_3"
          className="modal modal-bottom sm:modal-middle p-2"
        >
          <Login />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Signup Modal */}
        <dialog
          id="signup_modal"
          className="modal modal-bottom sm:modal-middle p-2"
        >
          <SignUp />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
