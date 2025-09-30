import { useParams } from "react-router-dom";
import { useState } from "react";
import "./PostIdMessage.scss";
import InputPost from "../components/InputPost";

const PostIdMessage = () => {
  const [sender, setSender] = useState("");

  const params = useParams();
  const isDisabled = !sender.trim();

  const handleGenerate = async () => {};
  return (
    <div className="post-messase-wrap">
      <div>{params.id}번 포스트에 작성될 카드</div>
      <div className="post-container">
        <InputPost title="To." value={sender} onChange={setSender} />
      </div>
      <button
        type="button"
        className="btn full"
        onClick={handleGenerate}
        disabled={isDisabled}
      >
        생성하기
      </button>
    </div>
  );
};

export default PostIdMessage;
