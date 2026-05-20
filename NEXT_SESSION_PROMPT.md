# 다음 세션 시작 프롬프트

마지막 작업: 2026-05-20 EOD

---

## 복붙용 한 줄

```
스낵킷 장부 — NEXT_SESSION_PROMPT.md 읽고 2026-05-20 EOD 상태부터 이어가주세요.
```

---

## 현재 상태 (2026-05-20 EOD)

- **GitHub**: `https://github.com/snackpong/snackit-ledge` (레포명 r 없음)
- **배포 URL**: `https://snackpong.github.io/snackit-ledge/` (GitHub Pages, 정상 작동)
- **Firebase 프로젝트**: `snackit-ledge` (신규 생성)
  - Authentication: Google 로그인만 활성화 ✅
  - 승인된 도메인: `snackpong.github.io` 추가 ✅
  - Firestore, Storage: 시작됨 (보안 규칙 아직 미적용)
- **로그인**: Google 로그인 정상 작동 확인 ✅
- **핵심 버그 수정**: CSS `[hidden] { display: none !important }` — 로그인 후 화면 전환 안 되던 버그 수정 ✅
- **Stitch 디자인 v2**: 프로젝트 "스낵킷 장부 v2 — Warm Editorial" 생성
  - 디자인 시스템: 테라코타 #D4622A + 포레스트그린 #2D6A4F + 아이보리 배경
  - 폰트: Bricolage Grotesque (헤드라인) + DM Sans (본문)
  - 화면 4개 생성: 지출(데스크탑 에디토리얼), 로그인(스플릿), 지출목록(모바일), 지출추가 바텀시트(모바일)

---

## 다음 세션 첫 액션

### ① Firestore/Storage 보안 규칙 적용
Firebase Console에서 아래 규칙 붙여넣기:

**Firestore** (Console → Firestore → 규칙):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner() {
      return request.auth != null
        && request.auth.token.email_verified == true
        && request.auth.token.email == 'snackpong25@gmail.com';
    }
    match /store/main/{document=**} {
      allow read, write: if isOwner();
    }
  }
}
```

**Storage** (Console → Storage → 규칙):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isOwner() {
      return request.auth != null
        && request.auth.token.email_verified == true
        && request.auth.token.email == 'snackpong25@gmail.com';
    }
    match /{allPaths=**} {
      allow read, write: if isOwner();
    }
  }
}
```

### ② 지출 페이지 구현 시작
Stitch v2 디자인을 참고해서 실제 코드로 구현.
구현 순서: 지출 페이지 → 홈 페이지 → 이익 페이지

지출 페이지 기능:
- 이달 누계 칩 (상단)
- 지출 목록 (날짜 그룹, 카드형)
- + 지출 추가 모달
  - 날짜 / 카테고리(자유입력+자동완성) / 금액 / 거래처 / 결제수단(라디오) / 메모 / 영수증 첨부
- Firestore: `store/main/expenses/{auto-id}` 스키마 (discussion-log.md 참조)

---

## Claude가 기억해야 할 것

1. **레포명**: `snackit-ledge` (r 없음) — GitHub, Firebase 모두 동일
2. **배포**: `git push origin main` → GitHub Pages 자동 배포 (Firebase deploy 아님)
3. **이메일 로그인 없음**: Google 로그인만. 이메일/비밀번호 관련 코드 건드리지 말 것
4. **CSS**: `[hidden] { display: none !important }` — styles.css 두 번째 줄, 절대 삭제 금지
5. **허용 이메일**: `snackpong@naver.com`, `snackpong25@gmail.com` (firebase-init.js ALLOWED_EMAILS)
6. **Stitch 프로젝트 ID**: `1868734977088419865` / 디자인시스템 ID: `assets/6581157065052965287`

---

## 참고

- discussion-log.md: `C:\working\snackit-ledger\discussion-log.md`
- 메모리 인덱스: `C:\Users\c\.claude\projects\C--working-snackit-ledger\MEMORY.md`
- GitHub: `https://github.com/snackpong/snackit-ledge`
- GitHub Pages: `https://snackpong.github.io/snackit-ledge/`
- Firebase Console: `https://console.firebase.google.com/project/snackit-ledge/overview`
