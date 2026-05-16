# 다음 세션 시작 프롬프트

> 이 파일은 다음 Claude Code 세션 시작 시 **그대로 복사해서 붙여넣기** 위한 프롬프트입니다.
> 사장님 사전 작업 체크리스트는 맨 아래에 있습니다.

---

## 📋 복붙용 프롬프트 (firebaseConfig만 채우세요)

```
스낵킷 장부 사이트 — 다음 단계 진입.

1) discussion-log.md 읽고 이어가주세요.

2) 지난 세션 마지막에 결정한 사항:
   - Firebase 프로젝트 새로 생성: snackit-ledger
   - 폴더명 변경: snackpong-daily-sales → snackit-ledger
   - 와이어프레임(지출 페이지) + Firestore 스키마: 묵시적 OK 처리됨
     (5회 짚어도 명시적 답이 없어서, 이번 세션에서 X 명시 없으면 그대로 진행하기로 합의)

3) firebaseConfig (Firebase 콘솔 → 프로젝트 설정 → 내 앱 → 웹앱 → 등록 후 표시되는 코드 박스):

const firebaseConfig = {
  apiKey: "여기 채우기",
  authDomain: "여기 채우기",
  projectId: "snackit-ledger",
  storageBucket: "여기 채우기",
  messagingSenderId: "여기 채우기",
  appId: "여기 채우기"
};

4) 이번 세션 목표: 정적 사이트 골격(HTML/CSS/JS 라우팅 + Google 로그인 + 빈 페이지 3개) + 지출 페이지 1차 구현 (입력 모달 + 테이블 + 상단 요약 + 카테고리별 미니 차트).

지출 페이지 와이어프레임에 X(수정 의견) 있으시면 코드 작업 시작 전에 알려주세요.
```

---

## ✅ 사장님 사전 작업 체크리스트

다음 세션 시작 전에 모두 완료되어야 합니다.

### Firebase 콘솔 (https://console.firebase.google.com)

- [x] 프로젝트 생성: `snackit-ledger`
- [x] Firestore 프로덕션 모드
- [x] Storage 프로덕션 모드
- [ ] **Authentication → Google 로그인 활성화**
  - Authentication → 시작하기 → "Sign-in method" 탭 → Google 활성화 → 지원 이메일에 `snackpong25@gmail.com` 선택
- [ ] **Functions 활성화** (Blaze 요금제 확인)
  - Functions → 시작하기
- [ ] **Hosting 활성화** (활성화만, GitHub Pages 쓸 거니까 설정은 안 함)
  - Hosting → 시작하기
- [ ] **웹 앱 등록 + firebaseConfig 복사**
  - 프로젝트 설정(⚙️) → 「내 앱」 → 🌐 웹 아이콘 클릭
  - 앱 별명: `snackit-ledger-web` (아무거나)
  - **Firebase Hosting 체크박스 X** (체크하지 마세요)
  - 등록 후 화면에 표시되는 `const firebaseConfig = {...}` 통째로 복사

### 윈도우 탐색기 — 폴더 이름 변경 2개

⚠️ **반드시 Claude Code, VS Code, 터미널 다 닫고 변경하세요.** 잠금 상태면 변경 안 됨.

```
C:\working\snackpong-daily-sales
  → C:\working\snackit-ledger

C:\Users\c\.claude\projects\C--working-snackpong-daily-sales
  → C:\Users\c\.claude\projects\C--working-snackit-ledger
```

두 번째 폴더는 Claude Code의 메모리 폴더입니다. 이걸 안 바꾸면 다음 세션에서 사장님 메모리(7개)를 못 찾습니다.

### 새 폴더에서 Claude Code 열기

```
C:\working\snackit-ledger
```

이 폴더를 working directory로 해서 Claude Code 실행 → 위의 복붙용 프롬프트 붙여넣기 → 시작

---

## 🔍 참고

- 이 파일 위치: `C:\working\snackit-ledger\NEXT_SESSION_PROMPT.md` (폴더 이름 바꾸기 전엔 `snackpong-daily-sales` 안에 있음)
- 디스커션 로그: `discussion-log.md` (같은 폴더)
- 메모리 인덱스: `C:\Users\c\.claude\projects\C--working-snackit-ledger\MEMORY.md` (폴더 이름 바꾼 후 기준)

---

작성: 2026-05-16
