import "./PostIdMessage.scss";
import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { useParams } from "react-router-dom";

import InputPost from "../components/InputPost";

import axios from "@/api/axios";

const PostIdMessage = () => {
  const [sender, setSender] = useState("");
  const [profileImg, setProfileImg] = useState([]);
  const [selectProfile, setselectProfile] = useState("");
  const [relation, setRelation] = useState("acquaintance");
  const [font, setFont] = useState("noto-sans");
  const [content, setContent] = useState("");
  const { id } = useParams();

  const isDisabled = !sender.trim() || !selectProfile || content || font;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/profile-images/");
      console.log("data", data);
      setProfileImg(data.imageUrls);
    };
    fetchData();
  }, []);

  const onClickImg = (img) => {
    setselectProfile(img);
  };
  const handleGenerate = async () => {
    const payload = {
      team: "19-4",
      recipientId: id,
      profileImageURL: selectProfile || profileImg[0],
      relationship: relation,
      content,
      font,
    };

    try {
      const res = await axios.post("/messages/", payload);
      console.log("등록 성공:", res.data);
    } catch (err) {
      console.error("등록 실패:", err);
    }
  };
  return (
    <div className="post-messase-wrap">
      <div className="post-message-container">
        <InputPost title="To." value={sender} onChange={setSender} />
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
            <label htmlFor="relation" className="tit txt-24-b mg-b12">
              상대와의 관계
            </label>
            <select
              id="relation"
              name="relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            >
              <option value="acquaintance">지인</option>
              <option value="colleague">동료</option>
              <option value="family">가족</option>
              <option value="friend">친구</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="tit txt-24-b mg-b12">
              내용을 입력해 주세요
            </label>
            <div className="editor">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
            <div
              className="preview"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="font" className="tit txt-24-b mg-b12">
              폰트 선택
            </label>
            <select
              id="font"
              name="font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="noto-sans">Noto Sans</option>
              <option value="pretendard">Pretendard</option>
              <option value="nanum-myeongjo">나눔명조</option>
              <option value="nanum-handwriting">나눔손글씨 손편지체</option>
            </select>
          </div>
        </section>
      </div>
      <button
        type="button"
        className="btn full"
        onClick={handleGenerate}
        disabled={isDisabled}
      >
        생성하기
      </button>
    </div>
  );
};

export default PostIdMessage;
