import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-base-100 shadow-sm sticky top-0">
      <div className="navbar w-10/12 mx-auto">
        <div className="navbar-start">
          <Logo></Logo>
        </div>
        <div className="navbar-end gap-2">
          {user && <p className="font-semibold bg-gray-100 px-4 py-2 rounded-2xl">{user.displayName}</p>}
          {user ? (
            <button className="btn bg-red-500 text-white">Log Out</button>
          ) : (
            <Link to={"/signIn"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
