import "./ActionBar.scss"

import Profile from "./Profile"

const images=[];

const ActionBar = () => {
  return (
    <div className="ActionBar">
      <h2 className="recipient-name">title</h2>
      <div className="menu-wrapper">
        <Profile images={images}/>
        <div>리액션</div>
        <button>리액션추가</button>
        <button>공유</button>
      </div>
    </div>
  );
};

export default ActionBar;