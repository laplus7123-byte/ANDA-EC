(() => {
  if (!window.ANDA?.cart) return;

  const ensureToast = () => {
    let el = document.querySelector("[data-cart-toast]");
    if (el) return el;
    el = document.createElement("div");
    el.className = "cart-toast";
    el.setAttribute("data-cart-toast", "");
    el.hidden = true;
    el.innerHTML = `
      <div class="cart-toast__inner">
        <p class="cart-toast__msg" data-cart-toast-msg>カートに追加しました</p>
        <div class="cart-toast__actions">
          <button type="button" class="cart-toast__btn cart-toast__btn--ghost" data-cart-toast-close>買い物を続ける</button>
          <a href="${ANDA.routes ? ANDA.routes.cart() : "cart.html"}" class="cart-toast__btn cart-toast__btn--primary">カートを見る</a>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelector("[data-cart-toast-close]")?.addEventListener("click", () => {
      el.hidden = true;
    });
    return el;
  };

  let toastTimer = null;

  ANDA.cartUI = {
    showToast(message) {
      const toast = ensureToast();
      const msg = toast.querySelector("[data-cart-toast-msg]");
      if (msg) msg.textContent = message;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.hidden = true;
      }, 4200);
    },

    qtyInCart(productId) {
      return ANDA.cart.read().find((i) => i.id === productId)?.qty || 0;
    },

    actionsHTML(productId) {
      const qty = ANDA.cartUI.qtyInCart(productId);
      if (qty > 0) {
        return `
          <div class="product-actions is-in-cart" data-product-actions="${productId}">
            <div class="qty-stepper" data-qty-stepper="${productId}">
              <button type="button" class="qty-stepper__btn" data-qty-minus aria-label="減らす">−</button>
              <span class="qty-stepper__value" data-qty-value>${qty}</span>
              <button type="button" class="qty-stepper__btn" data-qty-plus aria-label="増やす">＋</button>
            </div>
            <a href="${ANDA.routes ? ANDA.routes.product(productId) : `product.html?id=${productId}`}" class="product-actions__detail">詳細を見る</a>
          </div>`;
      }
      return `
        <div class="product-actions" data-product-actions="${productId}">
          <button type="button" class="anda-btn anda-btn--season" data-add-cart="${productId}">カートに入れる</button>
          <a href="${ANDA.routes ? ANDA.routes.product(productId) : `product.html?id=${productId}`}" class="product-actions__detail">詳細を見る</a>
        </div>`;
    },


    buyBoxHTML(productId) {
      const qty = ANDA.cartUI.qtyInCart(productId);
      if (qty > 0) {
        return `
          <div class="product-detail_buy is-in-cart" data-product-buy="${productId}">
            <div class="qty-stepper qty-stepper--lg" data-qty-stepper="${productId}">
              <button type="button" class="qty-stepper__btn" data-qty-minus aria-label="減らす">−</button>
              <span class="qty-stepper__value" data-qty-value>${qty}</span>
              <button type="button" class="qty-stepper__btn" data-qty-plus aria-label="増やす">＋</button>
            </div>
            <p class="product-actions__note">カートに入っています。数量を変更できます。</p>
            <a href="${ANDA.routes ? ANDA.routes.cart() : "cart.html"}" class="anda-btn anda-btn-primary" style="width:auto;min-width:160px">カートを見る</a>
          </div>`;
      }
      return `
        <div class="product-detail_buy" data-product-buy="${productId}">
          <label class="product-detail_qty-label">
            <span>数量</span>
            <input type="number" min="1" value="1" data-qty>
          </label>
          <button type="button" class="anda-btn anda-btn-primary" style="width:auto;min-width:180px" data-add-cart="${productId}" data-add-from-detail>カートに入れる</button>
        </div>`;
    },

    refreshAll() {
      document.querySelectorAll("[data-product-actions]").forEach((wrap) => {
        const id = wrap.dataset.productActions;
        const html = ANDA.cartUI.actionsHTML(id);
        const tmp = document.createElement("div");
        tmp.innerHTML = html.trim();
        wrap.replaceWith(tmp.firstElementChild);
      });
      document.querySelectorAll("[data-product-buy]").forEach((wrap) => {
        const id = wrap.dataset.productBuy;
        const html = ANDA.cartUI.buyBoxHTML(id);
        const tmp = document.createElement("div");
        tmp.innerHTML = html.trim();
        wrap.replaceWith(tmp.firstElementChild);
      });
    },
  };

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = addBtn.dataset.addCart;
      let qty = 1;
      if (addBtn.hasAttribute("data-add-from-detail")) {
        const box = addBtn.closest("[data-product-buy]");
        const input = box?.querySelector("[data-qty]");
        qty = Math.max(1, Number(input?.value || 1));
      }
      ANDA.cart.add(id, qty);
      ANDA.cartUI.showToast(
        qty > 1
          ? `${qty}点をカートに追加しました。数量はカード上でも変更できます。`
          : "カートに追加しました。数量はこちらで変更できます。"
      );
      return;
    }

    const stepper = e.target.closest("[data-qty-stepper]");
    if (!stepper) return;
    if (!e.target.closest("[data-qty-minus], [data-qty-plus]")) return;
    e.preventDefault();
    e.stopPropagation();
    const id = stepper.dataset.qtyStepper;
    const current = ANDA.cartUI.qtyInCart(id);
    if (e.target.closest("[data-qty-plus]")) ANDA.cart.setQty(id, current + 1);
    else ANDA.cart.setQty(id, current - 1);
  });

  window.addEventListener("anda:cart-updated", () => {
    ANDA.cartUI.refreshAll();
  });
})();
