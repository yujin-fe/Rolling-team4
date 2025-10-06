import { Suspense } from "react";
import { useParams } from "react-router-dom";

import MessageCard from "../components/MessageCard";

const PostId = () => {
  const params = useParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessageCard recipientId={params.id} />
    </Suspense>
  );
};

export default PostId;
