import "./ActionBar.scss";
import { useEffect, useState } from "react";

import { getMessages } from "../api/message.js";
import { getRecipient } from "../api/recipients.js";

import ActionBarBtnsGroup from "./ActionBarBtnsGroup.jsx";
import Profile from "./Profile";

const ActionBar = ({ recipientId }) => {
  const [recipientData, setRecipientData] = useState({});
  const [messagesData, setMessagesData] = useState({});
  const images =
    messagesData?.results?.map((message) => message.profileImageURL) ?? [];

  const getRecipientData = async () => {
    try {
      const recipientResData = await getRecipient(recipientId);
      setRecipientData(recipientResData);
    } catch (e) {
      console.log(e.message);
      alert("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getRecipientData();
    const fetchMessages = async () => {
      const messagesRes = await getMessages(recipientId);
      setMessagesData(messagesRes);
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
