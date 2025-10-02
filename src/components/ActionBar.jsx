import "./ActionBar.scss"
import {useEffect, useState} from "react"

import instance from "../api/axios"
import emojiAdd from "../assets/icons/emoji-add.png"
import shareBtn from "../assets/icons/Union.svg"
import arrowBtn from "../assets/imgs/btn_arrow.svg"

import Button from "./Button"
import Emoji from "./Emoji"
import Profile from "./Profile"

const ActionBar = ({recipientId, messagesData}) => {
  const [recipientData, setRecipientData] = useState({});

  const images = messagesData?.results?.map((message)=>message.profileImageURL) ?? [];
  
  useEffect(()=>{
    const getRecipientData = async () => {
      const recipientRes = await instance.get(`/19-4/recipients/${recipientId}/`)
      setRecipientData(recipientRes.data)
    }

    getRecipientData();
  },[recipientId])
  
  return (
    <div className="ActionBar">
      <h2 className="recipient-name txt-28-b">To. {recipientData.name}</h2>
      <div className="menu-wrapper">
        <div className="profile-wrapper">
          <Profile images={images}/>
          <div className="txt-18"><span className="txt-18-b">{messagesData.count}</span>명이 작성했어요!</div>
        </div>
        <div className="divider"></div>
        <div className="reaction-wrapper">
          <div className="badges">
            {recipientData?.topReactions?.map(
              (emoji)=><Emoji 
                key={emoji.id} 
                emoji={emoji.emoji} 
                count={emoji.count}/>
            )}
          </div>
          <button><img src={arrowBtn} style={{transform:"rotate(180deg)"}}/></button>
        </div>
        <div className="btn-wrapper">
          <Button icon={emojiAdd} size="sm" variant="outlined">추가</Button>
          <div className="divider"></div>
          <Button icon={shareBtn} size="sm" variant="outlined"/>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;