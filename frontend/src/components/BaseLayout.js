import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";

import "../styles/components/Navbar.css";
import "../styles/components/BaseLayout.css";
import Navbar from "./Navbar";

const BaseLayout = () => {
  return (
    <div className="base-layout">
      <div className="left-column">
        <Navbar />
      </div>
      <div className="right-column">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
