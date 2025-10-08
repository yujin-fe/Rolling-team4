import { Suspense } from "react";
import { useParams } from "react-router-dom";

import MessageCard from "../components/MessageCard";

const PostId = () => {
  const params = useParams();

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init('4975786ff2b2079d75080f04d37d2ce8')
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageCard recipientId={params.id} />
    </Suspense>
  );
};

export default PostId;
