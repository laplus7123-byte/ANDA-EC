(() => {
  const chrome = document.querySelector("[data-site-chrome]");
  if (!chrome) return;

  chrome.innerHTML = `
  <div class="announce">
    <a href="guide.html#shipping" class="announce_shipping">税込8,000円以上のご購入で<span class="color-secondary">送料無料</span> <span class="detail">詳細はこちら</span></a>
    <a href="guide.html#payment" class="announce_business">お支払い：クレジット / 銀行振込</a>
  </div>

  <header id="siteHeader" class="siteHeader">
    <div class="siteHeader_container">
      <a href="index.html" class="siteHeader_logo" aria-label="ANDA トップ">
        <p class="siteHeader_logo_text">
          <span class="brand">ANDA</span>
          <span class="sub">北海道の海産物</span>
        </p>
        <div class="siteHeader_logo_icon">
          <img src="assets/images/icons/logo_h.svg" alt="ANDA">
        </div>
      </a>

      <div class="siteHeader_top">
        <div class="siteHeader_top_tel">
          <a href="contact.html" class="siteHeader_top_tel_link">
            <div class="siteHeader_top_tel_link_textArea">
              <div class="num">お問い合わせ</div>
              <div class="time">平日9時〜17時</div>
            </div>
          </a>
        </div>
        <div class="siteHeader_top_search">
          <form action="catalog.html" method="GET">
            <input type="text" name="q" placeholder="キーワードで検索">
            <button type="submit"><img src="assets/images/icons/icon_search.svg" alt="検索"></button>
          </form>
        </div>
        <a href="catalog.html?cat=recommend" class="siteHeader_top_icon">
          <i class="icon"><img src="assets/images/icons/icon_heart.svg" alt=""></i>
          <div class="text">おすすめ</div>
        </a>
        <a href="guide.html#account" class="siteHeader_top_icon">
          <i class="icon"><img src="assets/images/icons/icon_person.svg" alt=""></i>
          <div class="text">ログイン</div>
        </a>
        <a href="cart.html" class="siteHeader_top_icon siteHeader_top_icon-cart">
          <i class="icon"><img src="assets/images/icons/icon_cart.svg" alt=""></i>
          <div class="text">カート</div>
          <em class="cart-count" style="position:absolute;top:4px;right:4px;background:#C45C48;color:#fff;border-radius:50%;min-width:17px;height:17px;font-size:10px;display:flex;align-items:center;justify-content:center;font-style:normal;">0</em>
        </a>
        <button type="button" class="siteHeader_top_icon siteHeader_top_icon-toggle nav-toggle" data-nav-open>
          <i class="toggleBar">
            <span class="bar bar-top"></span>
            <span class="bar bar-mid"></span>
            <span class="bar bar-btm"></span>
          </i>
          <div class="text">メニュー</div>
        </button>
      </div>
    </div>

    <div class="siteHeader_nav">
      <div class="siteHeader_nav_pc">
        <ul class="pcNav">
          <li class="pcNav_item"><a href="catalog.html?cat=recommend" class="pcNav_link">おすすめ</a></li>
          <li class="pcNav_item pcNav_item-parent">
            <a href="categories.html" class="pcNav_link pcNav_link-parent">商品カテゴリ</a>
            <div class="pcNav_item_sub">
              <div class="pcNav_item_sub_overlay"></div>
              <div class="pcNav_item_sub_bg">
                <img src="assets/images/about.jpg" alt="">
              </div>
              <div class="pcNav_item_sub_navArea">
                <p class="pcNav_item_sub_title">商品カテゴリ一覧</p>
                <ul class="pcNav_item_sub_list">
                  <li class="pcNav_item_sub_list_item"><a href="categories.html" class="pcNav_item_sub_list_link">すべてのカテゴリを見る</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="catalog.html?cat=recommend" class="pcNav_item_sub_list_link">おすすめ</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="catalog.html?cat=seafood" class="pcNav_item_sub_list_link">海産物</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="catalog.html?cat=processed" class="pcNav_item_sub_list_link">加工品</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="catalog.html?cat=gift" class="pcNav_item_sub_list_link">ギフト・セット</a></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="pcNav_item"><a href="about.html" class="pcNav_link">こだわり</a></li>
          <li class="pcNav_item"><a href="guide.html" class="pcNav_link">ご利用案内</a></li>
          <li class="pcNav_item"><a href="news.html" class="pcNav_link">お知らせ</a></li>
          <li class="pcNav_item"><a href="contact.html" class="pcNav_link">お問い合わせ</a></li>
        </ul>
      </div>
      <div class="siteHeader_nav_sp">
        <div class="siteHeader_nav_sp_overlay" data-nav-close></div>
        <div class="siteHeader_nav_sp_wrap">
          <div class="siteHeader_nav_sp_header">
            <button class="nav-toggle" type="button" data-nav-close>
              <img src="assets/images/icons/close.svg" alt="閉じる">
            </button>
          </div>
          <nav class="siteHeader_nav_sp_navArea">
            <ul class="spNav_list">
              <li><a class="spNav_list_link" href="catalog.html?cat=recommend">おすすめ</a></li>
              <li><a class="spNav_list_link" href="categories.html">商品カテゴリ</a></li>
              <li><a class="spNav_list_link" href="catalog.html?cat=seafood">海産物</a></li>
              <li><a class="spNav_list_link" href="catalog.html?cat=processed">加工品</a></li>
              <li><a class="spNav_list_link" href="catalog.html?cat=gift">ギフト・セット</a></li>
              <li><a class="spNav_list_link" href="about.html">こだわり</a></li>
              <li><a class="spNav_list_link" href="guide.html">ご利用案内</a></li>
              <li><a class="spNav_list_link" href="contact.html">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="siteHeader_sp">
      <div class="siteHeader_sp_tel">
        <a href="contact.html" class="siteHeader_top_tel_link">
          <div class="siteHeader_top_tel_link_textArea">
            <div class="num">お問い合わせ</div>
            <div class="time">平日9時〜17時</div>
          </div>
        </a>
      </div>
      <div class="siteHeader_sp_search">
        <button type="button" class="siteHeader_sp_search_toggle" data-sp-search-open>
          商品を検索 <i><img src="assets/images/icons/icon_search.svg" alt=""></i>
        </button>
        <div class="siteHeader_sp_search_input">
          <form class="inputArea" action="catalog.html" method="GET">
            <input name="q" type="text" placeholder="キーワードで検索">
            <button type="submit"><img src="assets/images/icons/icon_search.svg" alt="検索"></button>
          </form>
          <button type="button" data-sp-search-close><img src="assets/images/icons/close.svg" alt="閉じる"></button>
        </div>
      </div>
    </div>
  </header>
  `;

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
    <footer class="siteFooter">
      <div class="commonPadding" style="padding-top:40px;padding-bottom:40px">
        <p style="font-family:Barlow,sans-serif;letter-spacing:.22em;font-size:22px;margin:0 0 12px">ANDA</p>
        <p style="font-size:12px;line-height:1.8;opacity:.75;margin:0 0 24px">北海道の海産物お取り寄せ（店舗名は仮称）</p>
        <nav>
          <ul style="display:flex;flex-wrap:wrap;gap:12px 20px;list-style:none;padding:0;margin:0;font-size:12px">
            <li><a href="categories.html">カテゴリー一覧</a></li>
            <li><a href="about.html">こだわり</a></li>
            <li><a href="guide.html">ご利用案内</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">お問い合わせ</a></li>
            <li><a href="tokusho.html">特定商取引法</a></li>
            <li><a href="privacy.html">プライバシーポリシー</a></li>
          </ul>
        </nav>
        <p style="margin:32px 0 0;font-size:11px;opacity:.5;text-align:center">&copy; ANDA. All rights reserved.</p>
      </div>
    </footer>`;
  }
})();
