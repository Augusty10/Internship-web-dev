// CONFIG
const API_URL = "https://dummyjson.com/products?limit=100";

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 8;

// DOM ELEMENTS
const grid = document.querySelector(".grid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const analyticsSpans = document.querySelectorAll(".card span");

// FETCH DATA FROM REST API
async function fetchProducts() {
  try {
    showLoader();

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.json();

    // Store products
    allProducts = data.products;
    filteredProducts = [...allProducts];

    populateCategories();
    updateAnalytics();
    renderProducts();

  } catch (error) {
    showError("Failed to fetch products. Please try again.");
  } finally {
    hideLoader();
  }
}

// LOADER
function showLoader() {
  grid.innerHTML = "<h2>Loading products...</h2>";
}

function hideLoader() {
  // Do nothing, renderProducts will replace content
}

// ERROR DISPLAY
function showError(message) {
  grid.innerHTML = `<h2 style="color:red">${message}</h2>`;
}

// POPULATE CATEGORY
function populateCategories() {
  const categories = [...new Set(allProducts.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// ANALYTICS
function updateAnalytics() {
  analyticsSpans[0].textContent = filteredProducts.length;

  const avg =
    filteredProducts.reduce((sum, p) => sum + p.price, 0) /
    (filteredProducts.length || 1);

  analyticsSpans[1].textContent = "$" + avg.toFixed(2);

  const topRating =
    Math.max(...filteredProducts.map(p => p.rating));

  analyticsSpans[2].textContent = topRating + " ⭐";

  const lowStock =
    filteredProducts.filter(p => p.stock < 10).length;

  analyticsSpans[3].textContent = lowStock;
}

// RENDER PRODUCTS WITH PAGINATION
function renderProducts() {
  grid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredProducts.slice(start, start + itemsPerPage);

  if (paginatedItems.length === 0) {
    grid.innerHTML = "<h2>No products found</h2>";
    return;
  }

  const fragment = document.createDocumentFragment();

  paginatedItems.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>$${product.price}</p>
      <p>⭐ ${product.rating}</p>
      <p style="color:${product.stock < 10 ? '#E10600' : '#FFC300'}">
        Stock: ${product.stock}
      </p>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  renderPagination();
}

// PAGINATION CONTROLS
function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginationDiv = document.createElement("div");
  paginationDiv.style.textAlign = "center";
  paginationDiv.style.marginTop = "20px";

  paginationDiv.innerHTML = `
    <button onclick="changePage(-1)">Previous</button>
    <span> Page ${currentPage} of ${totalPages} </span>
    <button onclick="changePage(1)">Next</button>
  `;

  grid.appendChild(paginationDiv);
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  currentPage += direction;

  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  renderProducts();
}

// FILTERING
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue)
  );

  if (selectedCategory !== "All Categories") {
    filteredProducts = filteredProducts.filter(
      product => product.category === selectedCategory
    );
  }

  currentPage = 1;
  updateAnalytics();
  renderProducts();
}

// EVENTS
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// INIT
fetchProducts();
