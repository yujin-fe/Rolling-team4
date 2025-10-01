import "./PostLayout.scss"
import { Outlet } from "react-router-dom";

import ActionBar from "../components/ActionBar"

const PostLayout = () => {
  
  return (
    <div className="PostLayout">
      <ActionBar/>
      <Outlet/>
    </div>
  );
};

export default PostLayout;
