function renderHome(root) {
  root.innerHTML = `
    <section class="page">
      <h1>홈</h1>
      <p class="muted">이달의 돈 흐름 — 이익/지출/순이익 합계 + 캘린더 + 그래프</p>
      <div class="empty">
        <p>아직 데이터가 없어요.</p>
        <p class="muted">지출 페이지에서 항목을 추가하면 이곳에 집계됩니다.</p>
      </div>
    </section>
  `;
}
