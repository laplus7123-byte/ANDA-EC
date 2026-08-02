(() => {
  const root = document.querySelector("[data-categories-grid]");
  if (!root || !window.ANDA) return;
  root.innerHTML = ANDA.categories
    .map(
      (c) => `
    <a href="${ANDA.routes ? ANDA.routes.catalog(c.id) : `catalog.html?cat=${c.id}`}" class="index_top_category_card" style="display:block">
      <div class="index_top_category_card_img">
        <img src="${c.image}" alt="${c.name}" width="237" height="316" loading="lazy">
      </div>
      <p class="index_top_category_card_title">${c.name}</p>
      <p class="anda-product-card_excerpt">${c.description || ""}</p>
    </a>`
    )
    .join("");
})();
