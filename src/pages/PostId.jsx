import { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../components/Button";
import MessageCard from "../components/MessageCard";
import returnIcon from "../assets/icons/return_icon.png";
import modifyIcon from "../assets/icons/edit_icon.png";
import "./PostId.scss";

const PostId = () => {
  const params = useParams();

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init('4975786ff2b2079d75080f04d37d2ce8')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageCard recipientId={params.id} />
      <div className="btn-set">
        <div className="return-set">
          <div className="return-descipttion txt-15">
            리스트 페이지로 돌아가기
          </div>
          <Link to="/list">
            <Button
              variant="outlined"
              icon={returnIcon}
              className={"return-btn"}
            />
          </Link>
        </div>
        <div className="modify-set">
          <div className="modify-descipttion txt-15">편집하기</div>
          <Link to={`/post/${params.id}/edit`}>
            <Button
              variant="outlined"
              icon={modifyIcon}
              className={"modify-btn"}
            />
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default PostId;
