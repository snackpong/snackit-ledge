# 다음 세션 시작 프롬프트

마지막 작업: 2026-05-16 EOD

---

## 📋 복붙용 한 줄

```
스낵킷 장부 — discussion-log.md 읽고 2026-05-16 EOD 상태부터 이어가주세요.
```

위 한 줄이면 충분합니다. 메모리와 discussion-log.md가 자동으로 로드됩니다.

---

## 🎯 현재 상태 (2026-05-16 EOD)

- **사이트 배포 완료**: https://snackpong.github.io/snackit-ledger/
- **마지막 커밋**: `2a6f7da` — signInWithRedirect 전환 (COOP 차단 우회)
- **검증 미완료**: 로그인 흐름이 실제로 동작하는지 사장님이 확인 못 함 (세션 종료로 중단)
- **확인 필요**: Firebase 인증 도메인에 `snackpong.github.io` 등록 여부 (Claude가 안내했으나 사장님 답 없음)

---

## ✅ 내일 첫 액션 (사장님 순서대로)

### ① Firebase 인증 도메인 확인 (안 했으면 추가)

1. Firebase 콘솔 → **Authentication** → **Settings** 탭
2. **「승인된 도메인」** 섹션에 **`snackpong.github.io`** 있는지 확인
3. 없으면 「도메인 추가」 → `snackpong.github.io` → 「추가」

### ② 사이트 로그인 검증

1. 접속: https://snackpong.github.io/snackit-ledger/
2. **`Ctrl + Shift + R`** 로 강제 새로고침 (캐시된 옛 JS 무시)
3. 「Google로 로그인」 클릭 → 페이지가 Google 로그인 화면으로 전환됨 (팝업 X, redirect 방식)
4. `snackpong25@gmail.com` 선택
5. 사이트로 자동 복귀 → 앱 화면(상단 [홈][이익][지출] 네비)이 떠야 정상

### ③ 막히면

- F12 → Console 탭 → 빨간 에러 메시지 전체 복사해서 채팅에 붙여넣기
- 어떤 화면에서 멈췄는지도 함께 (로그인 화면 / 접근 거부 / 빈 화면)

---

## 🚀 검증 성공 후 진입할 작업

**지출 페이지 1차 구현**:
- 입력 모달 (날짜/카테고리/거래처/금액/결제수단/메모/영수증)
- Firestore 실시간 구독 + 테이블/카드 하이브리드
- 카테고리·거래처·결제수단 자동완성 + 자동 누적
- 영수증 다중 파일 업로드 + 인앱 라이트박스 미리보기
- 이달 누계 칩
- 수정/삭제 (모달 재활용 + confirm)

**선결조건**: Firestore/Storage 보안 규칙 게시 (Claude가 텍스트 제공 → 사장님이 콘솔에 붙여넣기). 코드 작성 직전에 진행.

---

## 📂 참고

- 디스커션 로그: `discussion-log.md` (이번 세션 결정 다 반영됨)
- 메모리 인덱스: `C:\Users\c\.claude\projects\C--working-snackit-ledger\MEMORY.md`
- 리포: https://github.com/snackpong/snackit-ledger
