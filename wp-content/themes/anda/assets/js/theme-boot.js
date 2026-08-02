(() => {
  const cfg = window.ANDA_CFG || {};
  const base = (cfg.themeUri || document.documentElement.dataset.themeUri || "").replace(/\/$/, "");
  const pages = cfg.pages || {};

  const fixPath = (path) => {
    if (!path) return path;
    if (/^(https?:|data:|\/\/)/i.test(path)) return path;
    if (path.startsWith("/")) return path;
    return `${base}/${path.replace(/^\.\//, "")}`;
  };

  if (window.ANDA?.products) {
    ANDA.products.forEach((p) => {
      p.image = fixPath(p.image);
    });
  }
  if (window.ANDA?.categories) {
    ANDA.categories.forEach((c) => {
      c.image = fixPath(c.image);
    });
  }

  ANDA.routes = {
    home: () => cfg.home || "/",
    catalog: (cat) => {
      const u = pages.catalog || "catalog.html";
      return cat ? `${u}${u.includes("?") ? "&" : "?"}cat=${encodeURIComponent(cat)}` : u;
    },
    product: (id) => {
      const u = pages.product || "product.html";
      return `${u}${u.includes("?") ? "&" : "?"}id=${encodeURIComponent(id)}`;
    },
    cart: () => pages.cart || "cart.html",
    categories: () => pages.categories || "categories.html",
    about: () => pages.about || "about.html",
    guide: () => pages.guide || "guide.html",
    news: () => pages.news || "news.html",
    tokusho: () => pages.tokusho || "tokusho.html",
    page: (slug) => pages[slug] || `${slug}.html`,
  };
})();
