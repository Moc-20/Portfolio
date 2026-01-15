const isInPortfolio = location.pathname.includes("/Portfolio/");
const base = isInPortfolio ? "../" : "";

function loadPartial(id, file, callback) {
  fetch(base + file)
    .then(res => {
      if (!res.ok) throw new Error(`${file} not found (${res.status})`);
      return res.text();
    })
    .then(html => {
      const target = document.getElementById(id);
      if (!target) throw new Error(`#${id} not found in page`);
      target.innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error("Navbar load failed:", err));
}

function rewriteDockLinks() {
  document.querySelectorAll(".dock [data-page]").forEach(el => {
    const page = el.getAttribute("data-page");

    if (page === "index.html") {
      el.setAttribute("href", base + "index.html");
    } else {
      el.setAttribute("href", isInPortfolio ? page : `Portfolio/${page}`);
    }
  });
}

function setActiveDock() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".dock-btn[data-page]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-page") === current);
  });
}

// IMPORTANT: folder is "Partials" (capital P)
loadPartial("navbar", "Partials/navbar.html", () => {
  rewriteDockLinks();
  setActiveDock();
});
