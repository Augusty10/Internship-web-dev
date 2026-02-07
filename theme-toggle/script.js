const toggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Load saved theme on refresh
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});
