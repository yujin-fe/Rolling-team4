import "./PostLayout.scss"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom"

import instance from "../api/axios.js"
import ActionBar from "../components/ActionBar"

const PostLayout = () => {
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
    <div className="PostLayout">
      <ActionBar data={recipientData}/>
      <Outlet/>
    </div>
  );
};

export default PostLayout;
