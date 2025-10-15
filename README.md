# 💌 롤링페이퍼 커뮤니티 플랫폼

> **누구나 마음을 남길 수 있는 공간**  
> 롤링페이퍼 감성을 웹으로 확장한 커뮤니티형 플랫폼

---

## 🚀 프로젝트 개요

- **프로젝트 이름:** Rolling
- **목표:** 롤링페이퍼를 웹에서 자유롭게 작성하고 공유할 수 있는 커뮤니티 플랫폼 개발  
- **핵심 가치:** 감정 공유, 관계 확장, 디지털 감성 커뮤니케이션  
- **개발 기간:** 2025.9.24 ~ 2025.10.15  
- **팀 구성:** 프론트엔드 4명

---

## 🧭 주요 기능

- ✍️ **롤링페이퍼 작성** — 친구나 동료, 가족, 지인에게 메시지 카드 작성  
- 🧾 **페이퍼 컬렉션 보기** — 다양한 페이퍼 디자인과 폰트로 구성  
- 💬 **댓글 및 피드백** — 사용자의 감정 교류 기능  
- 🌈 **사용자 커스터마이징** — 테마, 배경, 폰트 등 선택 가능  
- 📱 **반응형 UI** — 모바일·PC 모두 최적화된 인터페이스  

---

## 🛠️ 기술 스택

### Frontend
- **Framework:** React / Vite
- **Styling:** SCSS 
- **Deployment:** Vercel  

### Collaboration
- **Version Control:** Git & GitHub  
- **Design:** Figma  
- **Communication:** Notion / Discord

---

## 🧩 폴더 구조

```bash
src/
├── api/                 # 서버 통신 및 데이터 요청 관련 모듈
├── assets/              # 정적 리소스 (스타일, 폰트, 아이콘, 이미지 등)
│   ├── css/             # 공통 CSS 파일
│   ├── fonts/           # 폰트 파일
│   ├── icons/           # SVG, 아이콘 리소스
│   └── imgs/            # 이미지 파일
├── components/          # 재사용 가능한 UI 컴포넌트
├── contexts/            # 전역 상태 관리 및 Context API 관련 코드
├── hooks/               # 커스텀 훅 (Custom Hooks)
├── layouts/             # 공통 레이아웃 및 페이지 구조 관련 컴포넌트
├── pages/               # 라우팅되는 주요 페이지 컴포넌트
├── App.css              # 전체 스타일 정의
├── App.jsx              # 루트 컴포넌트
├── index.css            # 전역 스타일 초기화
├── main.jsx             # 앱 진입점 (React DOM 렌더링)
└── index.html           # 메인 HTML 파일
```

---

## ⚙️ 실행 방법

### 1. 설치

```bash
git clone https://github.com/yujin-fe/Rolling-team4.git
cd Rolling-team4
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

---

## 🧑‍🤝‍🧑 협업 규칙

* **브랜치 전략:** `main` / `feature/[기능명]` / `fix/[기능명]`
* **커밋 컨벤션:**

  ```
  feature: 새로운 기능 추가
  fix: 버그 수정
  style: 코드 포맷, 세미콜론 누락 등 비기능 수정
  refactor: 코드 리팩토링
  docs: 문서 수정
  chore: 기타 작업
  ```
* **PR 규칙:** 코드 리뷰 후 병합, 충돌 발생 시 담당자 해결

---

## 🧠 배운 점 & 회고

* 협업을 통한 일정 관리와 커뮤니케이션 개선
* 모듈 단위 개발과 통합 빌드 경험
* UI/UX와 감성적 요소의 밸런스 설계

---

## 🖼️ 미리보기

| 메인 페이지 | 롤링페이퍼 리스트 |
| ------ | -------- |
| <img width="588" height="420" alt="screencapture-rolling-team4-vercel-app-2025-10-15-12_07_42" src="https://github.com/user-attachments/assets/777d1d8d-03b2-4911-8468-4065d501e459" />  |  <img width="588" height="420" alt="screencapture-rolling-team4-vercel-app-list-2025-10-15-12_14_14" src="https://github.com/user-attachments/assets/babfa24f-20b0-48c2-b70b-87e00d98f0bd" />
  |

| 롤링페이퍼 | 메시지 카드 작성 |
| ------ | -------- |
| <img width="588" height="420" alt="screencapture-rolling-team4-vercel-app-post-13966-2025-10-15-12_10_14" src="https://github.com/user-attachments/assets/23cbde82-25f0-4f54-a846-c56378cf6a51" />
 |  <img width="588" height="470" alt="screencapture-rolling-team4-vercel-app-post-14316-message-2025-10-15-12_15_51" src="https://github.com/user-attachments/assets/8043094e-732c-41a1-b2bf-561c3ae9e963" />
  |

---





