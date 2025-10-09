import "./PostLayout.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getRecipient } from "../api/recipients";
import ActionBar from "../components/ActionBar";
import useIsMobile from "../hooks/useIsMobile"

const PostLayout = () => {
  const [recipientName, setRecipientName] = useState('');
  const params = useParams();
  const isMobile = useIsMobile();

  const getRecipientName = async () => {
    try {
      const recipientData = await getRecipient(params.id);
      setRecipientName(recipientData.name)
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
  };

  useEffect(()=>{
    getRecipientName();
  },[])

  return (
    <div className="PostLayout">
      {isMobile && <header className="mobile-header txt-18-b">To. {recipientName}</header>}
      <ActionBar recipientId={params.id}/>
      <Outlet />
    </div>
  );
};

export default PostLayout;
