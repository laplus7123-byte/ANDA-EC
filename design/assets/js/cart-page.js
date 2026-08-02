(() => {
  const root = document.querySelector("[data-cart-page]");
  if (!root || !window.ANDA) return;

  const render = () => {
    const items = ANDA.cart
      .read()
      .map((item) => {
        const product = ANDA.getProduct(item.id);
        return product ? { ...item, product } : null;
      })
      .filter(Boolean);

    if (!items.length) {
      root.innerHTML = `
        <div class="page-empty">
          <p>カートに商品が入っていません。</p>
          <p style="margin-top:16px"><a href="categories.html" class="anda-btn" style="width:auto;display:inline-flex">商品を見る</a></p>
        </div>`;
      return;
    }

    const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

    root.innerHTML = `
      <div style="overflow-x:auto">
        <table class="cart-table">
          <thead>
            <tr><th>商品</th><th>単価</th><th>数量</th><th>小計</th><th></th></tr>
          </thead>
          <tbody>
            ${items
              .map(
                (i) => `
              <tr>
                <td class="cart-product">
                  <a href="product.html?id=${i.product.id}">
                    <img src="${i.product.image}" alt="">
                    <span>${i.product.name}</span>
                  </a>
                </td>
                <td>${ANDA.formatPrice(i.product.price)}</td>
                <td><input type="number" min="1" value="${i.qty}" data-qty="${i.product.id}" style="width:64px;height:36px;border:1px solid rgba(26,51,72,.2);padding:0 8px"></td>
                <td>${ANDA.formatPrice(i.product.price * i.qty)}</td>
                <td><button type="button" data-remove="${i.product.id}" style="color:#C45C48;background:none;border:0;cursor:pointer">削除</button></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="cart-summary">
        <p style="margin:0;font-size:14px">合計 <strong style="font-family:Barlow,sans-serif;font-size:24px">${ANDA.formatPrice(total)}</strong> <small>（税込）</small></p>
        <p style="margin:10px 0 0;font-size:12px;opacity:.7">お支払い：クレジットカード / 銀行振込<br>税込8,000円以上で送料無料</p>
        <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:10px">
          <a href="catalog.html?cat=all" class="anda-btn" style="width:auto;background:#fff;color:#1A3348!important;border:1px solid rgba(26,51,72,.2)">買い物を続ける</a>
          <button type="button" class="anda-btn anda-btn-primary" style="width:auto" data-checkout>購入手続きへ（デモ）</button>
        </div>
      </div>`;
  };

  root.addEventListener("change", (e) => {
    const input = e.target.closest("[data-qty]");
    if (!input) return;
    ANDA.cart.setQty(input.dataset.qty, Number(input.value));
    render();
  });

  root.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-remove]");
    if (removeBtn) {
      ANDA.cart.remove(removeBtn.dataset.remove);
      render();
      return;
    }
    if (e.target.closest("[data-checkout]")) {
      alert("決済連携はWordPress / WooCommerce構築時に実装します。\n（クレジットカード・銀行振込）");
    }
  });

  window.addEventListener("anda:cart-updated", render);
  render();
})();
