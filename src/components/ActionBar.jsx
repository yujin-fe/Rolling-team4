import "./ActionBar.scss";
import { useEffect, useState } from "react";

import { getMessages } from "../api/message.js";

import ActionBarBtnsGroup from "./ActionBarBtnsGroup.jsx";
import Profile from "./Profile";

const ActionBar = ({ recipientId, recipientData, getRecipientData }) => {
  const [messagesData, setMessagesData] = useState({});
  const images =
    messagesData?.results?.map((message) => message.profileImageURL) ?? [];

  useEffect(() => {
    const fetchMessages = async () => {
      try{
        const messagesRes = await getMessages(recipientId);
        setMessagesData(messagesRes);
      }catch(e){
        console.error(e.message)
      }
    };
    fetchMessages();
  }, [recipientId]);

  return (
    <div className="ActionBar">
      <div className="action-bar-container">
        <h2 className="recipient-name txt-28-b">To. {recipientData?.name}</h2>
        <div className="menu-wrapper">
          <div className="profile-wrapper">
            <Profile images={images} />
            <div className="txt-18">
              <span className="txt-18-b">{messagesData?.count}</span>명이
              작성했어요!
            </div>
          </div>
          <div className="divider"></div>
          <ActionBarBtnsGroup
            recipientId={recipientId}
            recipientData={recipientData}
            getRecipientData={getRecipientData}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
