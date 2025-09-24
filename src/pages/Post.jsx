import BackgroundSelect from "../components/BackgroundSelect";
import InputPost from "../components/InputPost";
import "./Post.scss";

const Post = () => {
  return (
    <div className="post-wrap">
      <InputPost title="To." />

      <BackgroundSelect />
    </div>
  );
};

export default Post;
