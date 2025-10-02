import "./PostIdMessage.scss";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import InputPost from "../components/InputPost";

import axios from "@/api/axios";

const PostIdMessage = () => {
  const [sender, setSender] = useState("");
  const [profileImg, setProfileImg] = useState([]);
  const [selectProfile, setselectProfile] = useState("");
  const [relation, setRelation] = useState("지인");
  const [font, setFont] = useState("noto-sans");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getValiedText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const isDisabled =
    !sender.trim() ||
    !selectProfile ||
    !relation ||
    !getValiedText(content).trim() ||
    !font;

  useEffect(() => {
    const fetchData = async () => {
      console.log("sender", sender);

      const { data } = await axios.get("/profile-images/");
      setProfileImg(data.imageUrls);
    };
    fetchData();
  }, []);

  const onClickImg = (img) => {
    setselectProfile(img);
  };
  const handleGenerate = async () => {
    const payload = {
      sender: sender,
      profileImageURL: selectProfile || profileImg[0],
      relationship: relation,
      content,
      font,
    };

    try {
      const res = await axios.post(`/19-4/recipients/${id}/messages/`, payload);
      console.log("등록 성공:", res.data, "sender", sender);
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("등록 실패:", err);
    }
  };

  return (
    <div className="post-messase-wrap">
      <div className="post-message-container">
        <InputPost
          title="From."
          value={sender}
          onChange={setSender}
          placeholder="이름을 입력해 주세요."
        />
        <div className="profile-wrap">
          <p className="tit txt-24-b mg-b12">프로필 이미지</p>
          <div className="profile-imgs">
            {profileImg.length > 0 && (
              <div className="profile-main">
                <img
                  src={selectProfile || profileImg[0]}
                  alt="대표 프로필"
                  loading="lazy"
                />
              </div>
            )}
            <div className="profile-list">
              <p className="txt txt-16 mg-b12">프로필 이미지를 선택해주세요!</p>
              <ul>
                {Array.isArray(profileImg) &&
                  profileImg.slice(1).map((item, idx) => {
                    return (
                      <li key={item} onClick={() => onClickImg(item)}>
                        <img src={item} alt={`프로필 ${idx}`} loading="lazy" />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        <section className="form-section mg-t50">
          <div className="form-group">
            <p className="tit txt-24-b mg-b12">상대와의 관계</p>
            {/* <select
              id="relation"
              name="relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            >
              <option value="지인">지인</option>
              <option value="동료">동료</option>
              <option value="가족">가족</option>
              <option value="친구">친구</option>
            </select> */}
            <Dropdown
              title="관계를 선택하세요"
              data={[
                { id: 1, content: "지인" },
                { id: 2, content: "동료" },
                { id: 3, content: "가족" },
                { id: 4, content: "친구" },
              ]}
              value={relation}
              handleSelectChange={setRelation}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content" className="tit txt-24-b mg-b12">
              내용을 입력해 주세요
            </label>
            <div className="editor">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
          </div>

          <div className="form-group">
            <p className="tit txt-24-b mg-b12">폰트 선택</p>
            {/* <select
              id="font"
              name="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="Noto Sans">Noto Sans</option>
              <option value="Pretendard">Pretendard</option>
              <option value="Nanum Myeongjo">나눔명조</option>
              <option value="나눔손글씨 손편지체">나눔손글씨 손편지체</option>
            </select> */}
            <Dropdown
              title="폰트를 선택하세요."
              data={[
                { id: 1, content: "Noto Sans" },
                { id: 2, content: "Pretendard" },
                { id: 3, content: "나눔명조" },
                { id: 4, content: "나눔손글씨 손편지체" },
              ]}
              value={font}
              handleSelectChange={setRelation}
            />
          </div>
        </section>
      </div>
      <Button size="full" onClick={handleGenerate} disabled={isDisabled}>
        생성하기
      </Button>
    </div>
  );
};

export default PostIdMessage;
