import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/Header";
import useIsMobile from "../hooks/useIsMobile"

const Layout = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const hideButton = location.pathname.startsWith("/post");
  const showHeaderOnMobile = ["/", "/list"]
  const shouldShowHeader = !isMobile || showHeaderOnMobile.includes(location.pathname);

  return (
    <div className="layout">
      {shouldShowHeader && <Header hideButton={hideButton} />}
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
