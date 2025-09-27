import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
