# 프로젝트 
- 롤링 : 커뮤니티 서비스 구축 경험 만들어보기
---

## 프로젝트 구조

- `src/` : 소스 코드
- `public/` : 정적 파일
- 기타 필요에 따라 추가

---

## 브랜치 전략

- 각자 기능별 브랜치 생성 (`feature/기능명`)
- 작업 후 브랜치에 푸시
- 메인(`main`) 브랜치에는 PR(Pull Request)을 통해서만 병합

---
## 이슈 관리

- 매일 작업 시작 전 오늘 할 일/작업 단위를 이슈로 생성
- 작업이 끝나면 해당 이슈에 완료 사항 코멘트 추가
- PR 작성 시 관련 이슈 번호 명시 (예: `#12`)
- 팀원 간 진행 상황 공유 및 충돌 방지 목적

---
## 린트 설정

- ESLint + Prettier 적용
- VSCode 확장 설치 권장 (ESLint, Prettier)

---

## 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```
---
## 레포지토리 사용방법
0. 클론 후 작업 폴더에서 npm install
    ```bash
    git clone https://github.com/yujin-fe/part2-team4-project.git
    cd part2-team4-project
    npm install
    ```
1. 메인에서 git pull
    ```bash
    git checkout main
    git pull origin main
    ```
2. 각자 작업할 브랜치 생성
    ```bash
    git checkout -b feature/작업명
    ```
- 참고: 원격에서는 메인에 머지 후 브랜치 자동 삭제됨, 로컬에서는 직접 삭제해야함
  - 로컬 삭제 방법: 
    ```bash
      git checkout -d feature/작업명
    ```
3. 작업 후 커밋
    ```bash
    git add .
    git commit -m "작업 내용 간략하게 작성 (#이슈번호)"
    ```
4. 원격 브랜치에 푸쉬
    ```bash
    git push origin feature/작업명
    ```
5. 메인 브랜치에 PR 생성

    깃허브에서 해당 브랜치 선택 후 “Pull Request” 클릭

    PR 제목과 설명에 관련 이슈 번호 (#번호) 기재, 템플릿 작성

    리뷰 후 승인되면 메인 브랜치에 병합
6. 1번~5번 반복 진행