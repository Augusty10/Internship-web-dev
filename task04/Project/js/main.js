
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Loaded Successfully");

  /* NAVBAR / MENU TOGGLE */
  const menuBtn = document.querySelector("#menu-btn");
  const navMenu = document.querySelector(".nav");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  /* ACTIVE LINK HIGHLIGHT*/
  const navLinks = document.querySelectorAll(".nav a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* HOME PAGE */
  if (document.body.classList.contains("home-page")) {
    const heroTitle = document.querySelector("#hero-title");

    if (heroTitle) {
      heroTitle.textContent = "Welcome to My Website";
    }

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hover");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hover");
      });
    });
  }

  /* ABOUT PAGE LOGIC*/
  if (document.body.classList.contains("about-page")) {
    const aboutText = document.querySelector(".about-text");

    if (aboutText) {
      aboutText.style.color = "#2563eb";
    }
  }

  /* CONTACT FORM HANDLING */
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const message = document.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      alert("Form submitted successfully!");
      contactForm.reset();
    });
  }

  /* DARK MODE TOGGLE*/
  const themeBtn = document.querySelector("#theme-btn");

  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* DYNAMIC LIST EXAMPLE */
  const addItemBtn = document.querySelector("#add-item");
  const itemList = document.querySelector("#item-list");

  if (addItemBtn && itemList) {
    addItemBtn.addEventListener("click", () => {
      const li = document.createElement("li");
      li.textContent = `Item ${itemList.children.length + 1}`;
      itemList.appendChild(li);
    });
  }

  /* SCROLL TO TOP BUTTON*/
  const scrollBtn = document.querySelector("#scrollTop");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});
