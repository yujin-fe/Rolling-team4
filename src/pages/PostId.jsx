import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";

const PostId = () => {
  const params = useParams();
  return (
    <>
      <MessageCard recipientId={params.id} />
    </>
  );
};

export default PostId;
