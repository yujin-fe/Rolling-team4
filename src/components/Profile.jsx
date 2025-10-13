import "./Profile.scss";

const Profile = ({ images = [] }) => {
  return (
    <div className="profile">
      <div className="avatars">
        {images.slice(0, 3).map((url, id) => (
          <img key={id} src={url} alt="프로필 이미지" className="avatar-img" />
        ))}

        {images.length > 3 && (
          <div className="avatar-extra txt-12">+{images.length - 3}</div>
        )}
      </div>
      <div className="action_profile">{images.length}명이 작성했어요!</div>
    </div>
  );
};

export default Profile;
