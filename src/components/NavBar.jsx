import React, { useContext } from "react";
import Logo from "./Logo";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out.",
          icon: "success",
        });
        logoutUser();
      }
    });
  };
  return (
    <div className="bg-gray-200 border-b-2 border-gray-300 shadow-sm sticky top-0 z-10">
      <div className="navbar w-10/12 mx-auto">
        <div className="navbar-start">
          <Logo></Logo>
        </div>
        <div className="navbar-end gap-2">
          {user && (
            <p className="font-semibold text-sm bg-gray-100 px-4 py-2 rounded-2xl">
              {user.displayName || "User"}
            </p>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn bg-red-500 text-white rounded-xl"
            >
              Log Out
            </button>
          ) : (
            <Link to={"/signIn"} className="btn bg-blue-500 text-white rounded-xl">
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
