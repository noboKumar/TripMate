import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink>Trips</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm sticky top-0">
      <div className="navbar w-10/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="cursor-pointer lg:hidden"
            >
              <GiHamburgerMenu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <Link to={"/signIn"} className="btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
