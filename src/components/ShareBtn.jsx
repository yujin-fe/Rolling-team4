import shareBtn from "../assets/icons/Union.svg";
import {useToast} from "../contexts/ToastContext"

import Dropdown from "./Dropdown";

const ShareBtn = ({ recipientData }) => {
  const {showToast} = useToast();

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "롤링",
        description: `${recipientData.name}님의 롤링페이퍼 보러가기`,
        imageUrl:
          recipientData.backgroundImageURL ??
          `https://cdn.enewstoday.co.kr/news/photo/201706/1069327_235136_2726.jpg`,
        link: {
          webUrl: window.location.href,
          mobileWebUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            webUrl: window.location.href,
            mobileWebUrl: window.location.href,
          },
        },
      ],
    });
  };

  const shareUrl = () => {
    try{
      const currentUrl = window.location.href; // 현재 페이지 URL 가져오기
      navigator.clipboard.writeText(currentUrl); // 클립보드에 URL 복사
      showToast("url이 복사되었습니다.")
    }catch(e){
      console.error(e.message)
      alert('url복사에 실패하였습니다.')
    }
  };

  const handleSelectChange = (input) => {
    switch (input) {
    case "카카오톡 공유":
      shareKakao();
      break;
    case "url 공유":
      shareUrl();
      break;
    default:
      return null;
    }
  };

  return (
    <div>
      <Dropdown
        data={[
          { id: 1, content: "카카오톡 공유" },
          { id: 2, content: "url 공유" },
        ]}
        handleSelectChange={handleSelectChange}
        titleSize="sm"
        icon={shareBtn}
        size="sm"
        variant="outlined"
      />
    </div>
  );
};

export default ShareBtn;
