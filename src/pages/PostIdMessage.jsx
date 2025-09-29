import { useParams } from "react-router-dom"

const PostIdMessage = () => {
  const params = useParams();
  return(
    <div>{params.id}번 포스트에 작성될 카드</div>
  )
}

export default PostIdMessage;