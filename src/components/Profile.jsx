import "./Profile.scss";

const Profile = ({ images = [] }) => {
  const isActive = true;
  // const [image, setImage] = useState([]);

  // useEffect(() => {
  //   const fetchProfileImages = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://rolling-api.vercel.app/profile-images/"
  //       );
  //       console.log("API 응답:", res.data);

  //       if (res.data && Array.isArray(res.data.imageUrls)) {
  //         setImage(res.data.imageUrls);
  //       } else {
  //         setImage([]);
  //       }
  //     } catch (error) {
  //       console.error("프로필 이미지 불러오기 실패:", error);
  //       setImage([]);
  //     }
  //   };

  //   fetchProfileImages();
  // }, []);

  return (
    <div className="profile">
      <div className="avatars">
        {images.slice(0, 3).map((url, id) => (
          <img key={id} src={url} alt="프로필 이미지" className="avatar-img" />
        ))}

        {images.length > 3 && (
          <div className={`avatar-extra txt-12 ${isActive ? "active" : ""}`}>
            +{images.length - 3}
          </div>
        )}
      </div>
      <div className="action_profile">{images.length}명이 작성했어요!</div>
    </div>
  );
};

export default Profile;
