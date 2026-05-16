import { renderHome } from "./pages/home.js";
import { renderRevenue } from "./pages/revenue.js";
import { renderExpenses } from "./pages/expenses.js";

const routes = {
  "#/home": { label: "홈", render: renderHome },
  "#/revenue": { label: "이익", render: renderRevenue },
  "#/expenses": { label: "지출", render: renderExpenses }
};

const DEFAULT = "#/home";

export function startRouter(mountEl, navEl) {
  renderNav(navEl);

  const go = () => {
    const hash = routes[location.hash] ? location.hash : DEFAULT;
    if (location.hash !== hash) {
      location.hash = hash;
      return;
    }
    updateNavActive(navEl, hash);
    const route = routes[hash];
    mountEl.innerHTML = "";
    route.render(mountEl);
  };

  window.addEventListener("hashchange", go);
  go();
}

function renderNav(navEl) {
  navEl.innerHTML = Object.entries(routes)
    .map(([hash, { label }]) => `<a href="${hash}" data-route="${hash}">${label}</a>`)
    .join("");
}

function updateNavActive(navEl, hash) {
  navEl.querySelectorAll("a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === hash);
  });
}
