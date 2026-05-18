function renderExpenses(root) {
  root.innerHTML = `
    <section class="page">
      <header class="page-header">
        <h1>지출</h1>
        <span class="chip" id="expense-total">이달 누계 ₩0</span>
        <button class="btn btn-primary" id="expense-add-desktop">+ 지출 추가</button>
      </header>
      <div class="empty">
        <p>지출 입력 기능은 다음 단계에서 구현됩니다.</p>
        <p class="muted">모달 + 테이블/카드 하이브리드 + 영수증 다중 업로드.</p>
      </div>
      <button class="fab" id="expense-add-mobile" aria-label="지출 추가">+</button>
    </section>
  `;
}
