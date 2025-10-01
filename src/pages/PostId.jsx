import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import instance from "../api/axios.js"
import ActionBar from "../components/ActionBar.jsx"

const PostId = () => {
  const params = useParams();
  const [recipientData, setRecipientData] = useState({})

  useEffect(()=>{
    const getRecipientData = async () => {
      const res = await instance.get(`/19-4/recipients/${params.id}/`)
      setRecipientData(res.data)
    }
    getRecipientData();
  },[params.id])

  return (
    <>
      <ActionBar data={recipientData}/>
      <div>{params.id}번 페이지</div>
    </>
  )
}

export default PostId;