window.ANDA = window.ANDA || {};

const CART_KEY = "anda_cart_v1";

ANDA.cart = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  },

  write(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    ANDA.cart.updateBadge();
    window.dispatchEvent(new CustomEvent("anda:cart-updated"));
  },

  count() {
    return ANDA.cart.read().reduce((sum, item) => sum + item.qty, 0);
  },

  add(productId, qty = 1) {
    const items = ANDA.cart.read();
    const found = items.find((i) => i.id === productId);
    if (found) found.qty += qty;
    else items.push({ id: productId, qty });
    ANDA.cart.write(items);
  },

  setQty(productId, qty) {
    let items = ANDA.cart.read();
    if (qty <= 0) items = items.filter((i) => i.id !== productId);
    else {
      const found = items.find((i) => i.id === productId);
      if (found) found.qty = qty;
    }
    ANDA.cart.write(items);
  },

  remove(productId) {
    ANDA.cart.write(ANDA.cart.read().filter((i) => i.id !== productId));
  },

  clear() {
    ANDA.cart.write([]);
  },

  updateBadge() {
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = String(ANDA.cart.count());
    });
  },
};
