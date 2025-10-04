import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";

const Layout = () => {
  const location = useLocation();
  const hideButton = location.pathname.startsWith("/post/");
  return (
    <div className="layout">
      <Header hideButton={hideButton} />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
