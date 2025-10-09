import "./PostLayout.scss"
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom"

import ActionBar from "../components/ActionBar"

const PostLayout = () => {
  const params = useParams();
  
  return (
    <div className="PostLayout">
      <ActionBar recipientId={params.id}/>
      <Outlet/>
    </div>
  );
};

export default PostLayout;
