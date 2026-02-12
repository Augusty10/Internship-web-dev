import { router } from "./router.js";
import { store } from "./store.js";

function navigate(url) {
  history.pushState(null, null, url);
  router(url);
}

document.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.href.replace(location.origin, ""));
  }

  if (e.target.dataset.delete) {
    store.remove(Number(e.target.dataset.delete));
    router(location.pathname);
  }
});

document.addEventListener("submit", e => {
  if (e.target.id === "expenseForm") {
    e.preventDefault();
    const formData = new FormData(e.target);

    store.add({
      id: Date.now(),
      amount: formData.get("amount"),
      category: formData.get("category"),
      date: formData.get("date"),
      note: formData.get("note")
    });

    navigate("/");
  }
});

window.addEventListener("popstate", () => {
  router(location.pathname);
});

router(location.pathname);
