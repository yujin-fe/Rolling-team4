import "./PostLayout.scss"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom"

import instance from "../api/axios.js"
import ActionBar from "../components/ActionBar"

const PostLayout = () => {
  const params = useParams();
  const [messagesData, setMessagesData] = useState({})

  useEffect(()=>{
    const getMessageData = async () => {
      const MessageRes = await instance.get(`/19-4/recipients/${params.id}/messages/`)
      setMessagesData(MessageRes.data);
    }
    getMessageData();
  },[params.id])
  
  return (
    <div className="PostLayout">
      <ActionBar messagesData={messagesData} recipientId={params.id}/>
      <Outlet/>
    </div>
  );
};

export default PostLayout;
