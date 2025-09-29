import { Outlet } from "react-router-dom";

// import Header from "../components/Header";

const PostDetailLayout = () => {
  return (
    <>
      <div>헤더액션바</div>
      <main><Outlet/></main>
    </>
  );
};

export default PostDetailLayout;
