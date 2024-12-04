import Dropdown from "../components/Dropdown";
import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="">
      <Dropdown />
      <Outlet />
    </div>
  );
}

export default Layout;
