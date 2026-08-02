(() => {
  const root = document.querySelector("[data-product-page]");
  if (!root || !window.ANDA) return;

  const id = new URLSearchParams(location.search).get("id");
  const product = ANDA.getProduct(id);

  if (!product) {
    root.innerHTML = `
      <div class="pageShell">
        <p class="page-empty">商品が見つかりませんでした。</p>
        <p style="text-align:center"><a class="anda-btn" style="width:auto;display:inline-flex" href="categories.html">カテゴリー一覧へ</a></p>
      </div>`;
    return;
  }

  const category = ANDA.getCategory(product.category);
  document.title = `${product.name}｜ANDA`;

  root.innerHTML = `
      <nav class="breadcrumb" aria-label="パンくず">
        <a href="index.html">トップ</a><span>/</span>
        <a href="categories.html">カテゴリー</a><span>/</span>
        <a href="catalog.html?cat=${product.category}">${category?.name || ""}</a><span>/</span>
        <span>${product.name}</span>
      </nav>
      <div class="product-detail">
        <div class="product-detail_media">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
          <p class="anda-product-card_cat"><a href="catalog.html?cat=${product.category}">${category?.name || ""}</a></p>
          <h1 class="product-detail_name">${product.name}</h1>
          <p class="product-detail_price">${ANDA.formatPrice(product.price)} <small style="font-size:12px">（税込）</small></p>
          <p class="product-detail_excerpt">${product.excerpt}</p>
          ${ANDA.cartUI ? ANDA.cartUI.buyBoxHTML(product.id) : ""}
          <p style="margin-top:14px;font-size:12px;opacity:.7">お支払い：クレジットカード / 銀行振込</p>
          <div class="content-prose" style="margin-top:28px">
            <h2>商品説明</h2>
            <p>${product.description}</p>
          </div>
        </div>
      </div>`;
})();
