(() => {
  const header = document.getElementById("siteHeader");
  const nav = document.querySelector(".siteHeader_nav");
  const spSearch = document.querySelector(".siteHeader_sp");

  const openNav = () => {
    nav?.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    nav?.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-nav-open], .siteHeader_top_icon-toggle").forEach((btn) => {
    btn.addEventListener("click", openNav);
  });
  document.querySelectorAll("[data-nav-close], .siteHeader_nav_sp_overlay").forEach((btn) => {
    btn.addEventListener("click", closeNav);
  });

  document.querySelector("[data-sp-search-open]")?.addEventListener("click", () => {
    spSearch?.classList.add("search-active");
  });
  document.querySelector("[data-sp-search-close]")?.addEventListener("click", () => {
    spSearch?.classList.remove("search-active");
  });

  let lastY = window.scrollY;
  const onScroll = () => {
    if (!header) return;
    const y = window.scrollY;
    if (y > 120) {
      header.classList.add("is-fix");
      if (y > lastY + 4) {
        header.classList.add("is-hide");
        header.classList.remove("is-show");
      } else {
        header.classList.remove("is-hide");
        header.classList.add("is-show");
      }
    } else {
      header.classList.remove("is-fix", "is-hide", "is-show");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  ANDA.cart?.updateBadge();
})();
