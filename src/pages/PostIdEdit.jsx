import "./PostId.scss";
import { Suspense } from "react";
import { Link,useParams } from "react-router-dom";

import returnIcon from "../assets/icons/return_icon.png";
import Button from "../components/Button";
import MessageCard from "../components/MessageCard";

const PostIdEdit = () => {
  const params = useParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageCard
        recipientId={params.id}
        showAddCard={false}
        showDeleteCardBtn={true}
        showDeletePaperBtn={true}
      />
      <div className="btn-set">
        <div className="return-set">
          <div className="return-descipttion txt-15">돌아가기</div>
          <Link to={`/post/${params.id}`}>
            <Button
              variant="outlined"
              icon={returnIcon}
              className={"return-btn"}
            />
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default PostIdEdit;
