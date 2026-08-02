(() => {
  const root = document.querySelector("[data-catalog]");
  if (!root || !window.ANDA) return;

  const params = new URLSearchParams(location.search);
  const catId = params.get("cat") || root.dataset.category || "all";
  const query = (params.get("q") || "").trim();

  const titleEl = document.querySelector("[data-catalog-title]");
  const leadEl = document.querySelector("[data-catalog-lead]");
  const countEl = document.querySelector("[data-catalog-count]");
  const crumbEl = document.querySelector("[data-catalog-crumb]");
  const gridEl = document.querySelector("[data-catalog-grid]");
  const emptyEl = document.querySelector("[data-catalog-empty]");
  const sortEl = document.querySelector("[data-catalog-sort]");
  const filterNav = document.querySelector("[data-catalog-filters]");

  const category = ANDA.getCategory(catId);
  let items = ANDA.getProductsByCategory(catId);

  if (query) {
    const q = query.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const pageTitle = query
    ? `「${query}」の検索結果`
    : category
      ? category.name
      : "すべての商品";

  if (titleEl) titleEl.textContent = pageTitle;
  document.title = `${pageTitle}｜ANDA`;

  if (leadEl) {
    leadEl.textContent = query
      ? "キーワードに一致する商品を表示しています。"
      : category
        ? category.description
        : "カテゴリーや並び替えで商品を探せます。";
  }

  if (crumbEl) {
    const home = ANDA.routes ? ANDA.routes.home() : "index.html";
    const cats = ANDA.routes ? ANDA.routes.categories() : "categories.html";
    crumbEl.innerHTML = `
      <a href="${home}">トップ</a><span>/</span>
      <a href="${cats}">カテゴリー</a><span>/</span>
      <span>${query ? "検索結果" : pageTitle}</span>`;
  }

  if (filterNav) {
    const links = [
      { id: "all", label: "すべて", href: ANDA.routes ? ANDA.routes.catalog("all") : "catalog.html?cat=all" },
      ...ANDA.categories.map((c) => ({
        id: c.id,
        label: c.name,
        href: ANDA.routes ? ANDA.routes.catalog(c.id) : `catalog.html?cat=${c.id}`,
      })),
    ];
    filterNav.innerHTML = links
      .map(
        (l) =>
          `<a href="${l.href}" class="${l.id === catId && !query ? "is-active" : ""}">${l.label}</a>`
      )
      .join("");
  }

  const sortProducts = (list, sort) => {
    const next = [...list];
    switch (sort) {
      case "new":
        return next.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      case "price-asc":
        return next.sort((a, b) => a.price - b.price);
      case "price-desc":
        return next.sort((a, b) => b.price - a.price);
      case "name":
        return next.sort((a, b) => a.name.localeCompare(b.name, "ja"));
      case "popular":
      default:
        return next.sort((a, b) => b.popular - a.popular);
    }
  };

  const render = () => {
    const sort = sortEl?.value || "popular";
    const sorted = sortProducts(items, sort);
    if (countEl) countEl.textContent = `${sorted.length}件`;
    if (!gridEl) return;

    if (!sorted.length) {
      gridEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    gridEl.innerHTML = sorted
      .map(
        (p) => `
      <div class="index_product_season_item">
        <div class="index_product_season_item_img">
          <a href="${ANDA.routes ? ANDA.routes.product(p.id) : `product.html?id=${p.id}`}">
            <img src="${p.image}" alt="${p.name}" width="800" height="800" loading="lazy">
            <span class="product-card-peek">詳細を見る</span>
          </a>
        </div>
        <div class="index_product_season_item_textArea">
          <p class="anda-product-card_cat">${ANDA.getCategory(p.category)?.name || ""}</p>
          <a href="${ANDA.routes ? ANDA.routes.product(p.id) : `product.html?id=${p.id}`}" class="index_product_season_item_title">${p.name}</a>
          <p class="anda-product-card_excerpt">${p.excerpt}</p>
          <div class="index_product_season_item_price">
            <span class="price">${ANDA.formatPrice(p.price)}</span>
            <span class="yen">（税込）</span>
          </div>
          ${ANDA.cartUI ? ANDA.cartUI.actionsHTML(p.id) : ""}
        </div>
      </div>`
      )
      .join("");
  };

  sortEl?.addEventListener("change", render);
  render();
})();

