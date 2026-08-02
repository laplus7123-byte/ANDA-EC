(() => {
  if (typeof Swiper !== "undefined") {
    const thumb = new Swiper(".firstView .swiper-thumb", {
      slidesPerView: "auto",
      spaceBetween: 0,
      watchSlidesProgress: true,
    });

    const main = new Swiper(".firstView .swiper-main", {
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: { delay: 5200, disableOnInteraction: false },
      thumbs: { swiper: thumb },
    });

    const pcThumbs = document.querySelectorAll(".firstView_thumbContents-pc .firstView_thumb");
    pcThumbs.forEach((el, i) => {
      el.addEventListener("click", () => {
        pcThumbs.forEach((t) => t.classList.remove("thumb-media-active"));
        el.classList.add("thumb-media-active");
        main.slideToLoop(i);
      });
    });

    main.on("slideChange", () => {
      const i = main.realIndex;
      pcThumbs.forEach((t, idx) => t.classList.toggle("thumb-media-active", idx === i));
    });

    new Swiper(".index_top_category .swiper-overflow", {
      slidesPerView: "auto",
      spaceBetween: 0,
      navigation: {
        nextEl: ".index_top_category .swiper-button-next",
        prevEl: ".index_top_category .swiper-button-prev",
      },
      scrollbar: {
        el: ".index_top_category .swiper-scrollbar",
        draggable: true,
      },
    });
  }

  if (!window.ANDA) return;

  const recommendRoot = document.getElementById("topRecommend");
  if (recommendRoot) {
    const items = ANDA.getProductsByCategory("recommend").slice(0, 6);
    recommendRoot.innerHTML = items
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
          <a href="${ANDA.routes ? ANDA.routes.product(p.id) : `product.html?id=${p.id}`}" class="index_product_season_item_title">${p.name}</a>
          <div class="index_product_season_item_price">
            <span class="price">${ANDA.formatPrice(p.price)}</span>
            <span class="yen">（税込）</span>
          </div>
          ${ANDA.cartUI ? ANDA.cartUI.actionsHTML(p.id) : ""}
        </div>
      </div>`
      )
      .join("");
  }

  const rankingRoot = document.getElementById("topRanking");
  if (rankingRoot) {
    const items = [...ANDA.products].sort((a, b) => b.popular - a.popular).slice(0, 10);
    rankingRoot.innerHTML = items
      .map(
        (p) => `
      <div class="swiper-slide">
        <a href="${ANDA.routes ? ANDA.routes.product(p.id) : `product.html?id=${p.id}`}" class="ranking_card">
          <div class="ranking_card_img">
            <img src="${p.image}" alt="${p.name}" width="133" height="133" loading="lazy">
          </div>
          <p class="ranking_card_name">${p.name}</p>
        </a>
      </div>`
      )
      .join("");

    if (typeof Swiper !== "undefined") {
      new Swiper(".swiper-overflow-ranking", {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
          nextEl: ".swiper-overflow-ranking .swiper-button-next",
          prevEl: ".swiper-overflow-ranking .swiper-button-prev",
        },
      });
    }
  }
})();

