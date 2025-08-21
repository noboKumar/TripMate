import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="py-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
