import "./ActionBar.scss"

import Emoji from "./Emoji"
import Profile from "./Profile"

const ActionBar = ({data}) => {
  const images = data?.recentMessages?.map((message)=>message.profileImageURL) ?? [];

  return (
    <div className="ActionBar">
      <h2 className="recipient-name">title</h2>
      <div className="menu-wrapper">
        <Profile images={images}/>
        <div>{data.messageCount}명이 작성했어요.</div>
        <div className="reaction-wrapper">
          {data?.topReactions?.map(
            (emoji)=><Emoji 
              key={emoji.id} 
              emoji={emoji.emoji} 
              count={emoji.count}/>
          )}
        </div>
        <div>리액션</div>
        <button>공유</button>
      </div>
    </div>
  );
};

export default ActionBar;