export function renderRevenue(root) {
  root.innerHTML = `
    <section class="page">
      <h1>이익</h1>
      <p class="muted">스마트스토어 주문별 매출 상세 (커머스 API 자동 동기화)</p>
      <div class="empty">
        <p>엑셀 백필 대기 중</p>
        <p class="muted">네이버 커머스 API 신청 완료 후 자동 동기화됩니다.</p>
      </div>
    </section>
  `;
}
