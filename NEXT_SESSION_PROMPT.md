# 다음 세션 시작 프롬프트

마지막 작업: 2026-05-17 EOD

---

## 📋 복붙용 한 줄

```
스낵킷 장부 — discussion-log.md 읽고 2026-05-17 EOD 상태부터 이어가주세요.
```

위 한 줄이면 충분합니다. 메모리와 discussion-log.md가 자동으로 로드됩니다.

---

## 🎯 현재 상태 (2026-05-17 EOD)

- **Firebase Hosting 이전 완료**: `https://snackit-ledger.web.app` 및 `https://snackit-ledger.firebaseapp.com` 둘 다 활성
- **마지막 커밋**: `4700690` — hosting config 추가
- **여전히 로그인 안 됨**: `.web.app`에서 시도 시 같은 증상 (third-party 쿠키 차단). 원인: `.web.app`과 `.firebaseapp.com`은 PSL 기준 별도 origin → authDomain과 사이트가 여전히 다른 origin
- **스티치 디자인 완료** (사장님 도장): 라벤더 노트 디자인 시스템 + 지출/홈 페이지 2개

---

## ✅ 다음 세션 첫 액션 (사장님 순서대로)

### ① 사이트 로그인 검증 — **authDomain과 같은 origin에서 시도**

1. 새 탭에서 접속: **https://snackit-ledger.firebaseapp.com** (`.web.app` 아님!)
2. **`Ctrl + Shift + R`** 강제 새로고침
3. 「Google로 로그인」 클릭 → 계정 선택 화면 → `snackpong25@gmail.com` 선택
4. 사이트 복귀 → 상단 [홈][이익][지출] 네비 표시되면 **성공**

### ② 막히면

- F12 → Console 빨간 에러 통째로 캡처
- Network 탭 → `__/auth/...` 경로 요청 상태 (빨간색 있나)
- 어느 단계에서 멈췄는지 (로그인 화면 / 흰 화면 / 다른 화면)

### ③ `.firebaseapp.com`에서도 실패할 경우 대안

- **A안**: `js/firebase-init.js`의 `authDomain`을 `snackit-ledger.web.app`으로 변경 → `.web.app` URL과 same-origin
- **B안**: Google Cloud Console에서 OAuth 2.0 client에 `.web.app` redirect URI 등록 확인
- **C안**: 콘솔 에러 보고 다른 진단 (인증 도메인 미등록, OAuth scope 등)

---

## 🛠 검증 성공 후 우선 처리할 보안 이슈

**67 files 배포 문제**: 배포 시 `found 67 files in .` 출력 — 실제 사이트 파일 10개뿐인데 약 65개가 의도치 않게 업로드됨. `.git/` 또는 `.claude/` 통째 노출 위험.

**작업**:
1. `firebase.json` ignore 패턴 보강:
   ```json
   "ignore": [
     "firebase.json", ".firebaserc",
     ".git/**", ".github/**", ".claude/**", ".firebase/**",
     "**/.*", "**/node_modules/**",
     "discussion-log.md", "NEXT_SESSION_PROMPT.md", "README.md"
   ]
   ```
2. 재배포: `& "$env:USERPROFILE\firebase.exe" deploy --only hosting`
3. 출력에 `found N files`가 10 안팎인지 확인

---

## 🚀 그 후 진입할 작업

**지출 페이지 1차 구현** (실제 HTML/CSS/JS):

- 스티치 디자인(라벤더 노트, 지출 페이지)을 실제 코드로 옮김
- 입력 모달 (날짜/카테고리/거래처/금액/결제수단/메모/영수증)
- Firestore 실시간 구독 + 테이블/카드 하이브리드
- 카테고리·거래처·결제수단 자동완성 + 자동 누적
- 영수증 다중 파일 업로드 + 인앱 라이트박스 미리보기
- 이달 누계 칩
- 수정/삭제 (모달 재활용 + confirm)

**선결조건**: Firestore/Storage 보안 규칙 게시 (Claude가 텍스트 제공 → 사장님이 콘솔에 붙여넣기). 코드 작성 직전 진행.

---

## 📂 참고

- 디스커션 로그: `discussion-log.md` (이번 세션 결정 다 반영)
- 메모리 인덱스: `C:\Users\c\.claude\projects\C--working-snackit-ledger\MEMORY.md`
- 리포: https://github.com/snackpong/snackit-ledger
- Firebase 콘솔: https://console.firebase.google.com/project/snackit-ledger/overview
- 스티치 프로젝트: https://stitch.withgoogle.com/?pid=338452163588874419 (디자인 시스템 `13456382476104129091`)

---

## 💡 Claude가 기억해야 할 트랩

1. **`.web.app`과 `.firebaseapp.com`은 별도 origin** — 사장님이 어느 URL에서 시도 중인지 항상 확인
2. **PowerShell 5.1의 Invoke-WebRequest는 큰 파일에 매우 느림** — 큰 파일은 `curl.exe -L` 사용 (Windows 10/11 기본 내장)
3. **PowerShell 5.1에서 `&&` 안 됨** — 명령 체이닝은 `;` 사용. 단 폭이 좁아 줄바꿈 끼면 명령 깨짐 → 긴 명령은 3줄로 분리 권장
4. **`.firebaserc`는 commit 대상** — 기본 .gitignore 템플릿에 포함되는 경우 있음, 제거 필요
