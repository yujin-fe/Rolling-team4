import { useParams } from "react-router-dom"

const PostIdEdit = () => {
  const params = useParams();

  return (
    <div>{params.id}번 수정페이지</div>
  )
}

export default PostIdEdit;