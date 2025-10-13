import "./PostLayout.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getRecipient } from "../api/recipients";
import ActionBar from "../components/ActionBar";
import useIsMobile from "../hooks/useIsMobile"

const PostLayout = () => {
  const [recipientData, setRecipientData] = useState({});
  const params = useParams();
  const isMobile = useIsMobile();

  const getRecipientData = async () => {
    try {
      const recipientResData = await getRecipient(params.id);
      setRecipientData(recipientResData);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(()=>{
    getRecipientData();
  },[params.id])

  return (
    <div className="PostLayout">
      {isMobile && <header className="mobile-header txt-18-b">To. {recipientData.name}</header>}
      <ActionBar 
        recipientId={params.id} 
        recipientData={recipientData} 
        getRecipientData={getRecipientData}/>
      <Outlet />
    </div>
  );
};

export default PostLayout;
