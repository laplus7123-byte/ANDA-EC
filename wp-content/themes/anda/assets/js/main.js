(() => {
  const header = document.getElementById("siteHeader");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const spNav = document.querySelector("[data-sp-nav]");
  const searchToggle = document.querySelector("[data-search-toggle]");
  const searchPanel = document.querySelector("[data-search-panel]");
  const pagetop = document.querySelector("[data-pagetop]");

  const setScrolled = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeSpNav = () => {
    if (!spNav || !navToggle) return;
    spNav.hidden = true;
    navToggle.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  navToggle?.addEventListener("click", () => {
    const open = spNav.hidden;
    spNav.hidden = !open;
    navToggle.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open && searchPanel) searchPanel.hidden = true;
  });

  spNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeSpNav);
  });

  searchToggle?.addEventListener("click", () => {
    if (!searchPanel) return;
    searchPanel.hidden = !searchPanel.hidden;
    if (!searchPanel.hidden) {
      closeSpNav();
      searchPanel.querySelector("input")?.focus();
    }
  });

  pagetop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const onScroll = () => {
    setScrolled();
    if (pagetop) pagetop.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  setScrolled();
  ANDA.cart?.updateBadge();

  const targets = document.querySelectorAll(
    ".section, .about, .guide, .category-card, .product-card, .review-card, .page-card"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add("is-in"));
  }

  // Top page demo cart buttons (static cards)
  document.querySelectorAll(".btn--cart[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      ANDA.cart.add(btn.dataset.addCart, 1);
      btn.textContent = "追加しました";
      setTimeout(() => {
        btn.textContent = "カートに入れる";
      }, 1200);
    });
  });
})();
