<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme-uri="<?php echo esc_attr(get_template_directory_uri()); ?>">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="pagetop">
  <div class="announce">
    <a href="<?php echo esc_url(anda_url('guide')); ?>#shipping" class="announce_shipping">税込8,000円以上のご購入で<span class="color-secondary">送料無料</span> <span class="detail">詳細はこちら</span></a>
    <a href="<?php echo esc_url(anda_url('guide')); ?>#payment" class="announce_business">お支払い：クレジット / 銀行振込</a>
  </div>

  <header id="siteHeader" class="siteHeader">
    <div class="siteHeader_container">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="siteHeader_logo" aria-label="ANDA トップ">
        <?php if (is_front_page()) : ?>
          <h1 class="siteHeader_logo_text">
            <span class="brand">ANDA</span>
            <span class="sub">北海道の海産物</span>
          </h1>
        <?php else : ?>
          <p class="siteHeader_logo_text">
            <span class="brand">ANDA</span>
            <span class="sub">北海道の海産物</span>
          </p>
        <?php endif; ?>
        <div class="siteHeader_logo_icon">
          <img src="<?php echo esc_url(anda_asset('images/icons/logo_h.svg')); ?>" alt="ANDA">
        </div>
      </a>

      <div class="siteHeader_top">
        <div class="siteHeader_top_tel">
          <a href="<?php echo esc_url(anda_url('contact')); ?>" class="siteHeader_top_tel_link">
            <div class="siteHeader_top_tel_link_textArea">
              <div class="num">お問い合わせ</div>
              <div class="time">平日9時〜17時</div>
            </div>
          </a>
        </div>
        <div class="siteHeader_top_search">
          <form action="<?php echo esc_url(anda_url('catalog')); ?>" method="GET">
            <input type="text" name="q" placeholder="キーワードで検索">
            <button type="submit"><img src="<?php echo esc_url(anda_asset('images/icons/icon_search.svg')); ?>" alt="検索"></button>
          </form>
        </div>
        <a href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>" class="siteHeader_top_icon">
          <i class="icon"><img src="<?php echo esc_url(anda_asset('images/icons/icon_heart.svg')); ?>" alt=""></i>
          <div class="text">おすすめ</div>
        </a>
        <a href="<?php echo esc_url(anda_url('guide')); ?>" class="siteHeader_top_icon">
          <i class="icon"><img src="<?php echo esc_url(anda_asset('images/icons/icon_person.svg')); ?>" alt=""></i>
          <div class="text">ログイン</div>
        </a>
        <a href="<?php echo esc_url(anda_url('cart')); ?>" class="siteHeader_top_icon siteHeader_top_icon-cart">
          <i class="icon"><img src="<?php echo esc_url(anda_asset('images/icons/icon_cart.svg')); ?>" alt=""></i>
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
          <li class="pcNav_item"><a href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>" class="pcNav_link">おすすめ</a></li>
          <li class="pcNav_item pcNav_item-parent">
            <a href="<?php echo esc_url(anda_url('categories')); ?>" class="pcNav_link pcNav_link-parent">商品カテゴリ</a>
            <div class="pcNav_item_sub">
              <div class="pcNav_item_sub_overlay"></div>
              <div class="pcNav_item_sub_bg">
                <img src="<?php echo esc_url(anda_asset('images/about.jpg')); ?>" alt="">
              </div>
              <div class="pcNav_item_sub_navArea">
                <p class="pcNav_item_sub_title">商品カテゴリ一覧</p>
                <ul class="pcNav_item_sub_list">
                  <li class="pcNav_item_sub_list_item"><a href="<?php echo esc_url(anda_url('categories')); ?>" class="pcNav_item_sub_list_link">すべてのカテゴリを見る</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>" class="pcNav_item_sub_list_link">おすすめ</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="<?php echo esc_url(anda_url('catalog', 'cat=seafood')); ?>" class="pcNav_item_sub_list_link">海産物</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="<?php echo esc_url(anda_url('catalog', 'cat=processed')); ?>" class="pcNav_item_sub_list_link">加工品</a></li>
                  <li class="pcNav_item_sub_list_item"><a href="<?php echo esc_url(anda_url('catalog', 'cat=gift')); ?>" class="pcNav_item_sub_list_link">ギフト・セット</a></li>
                </ul>
              </div>
            </div>
          </li>
          <li class="pcNav_item"><a href="<?php echo esc_url(anda_url('about')); ?>" class="pcNav_link">こだわり</a></li>
          <li class="pcNav_item"><a href="<?php echo esc_url(anda_url('guide')); ?>" class="pcNav_link">ご利用案内</a></li>
          <li class="pcNav_item"><a href="<?php echo esc_url(anda_url('news')); ?>" class="pcNav_link">お知らせ</a></li>
          <li class="pcNav_item"><a href="<?php echo esc_url(anda_url('contact')); ?>" class="pcNav_link">お問い合わせ</a></li>
        </ul>
      </div>
      <div class="siteHeader_nav_sp">
        <div class="siteHeader_nav_sp_overlay" data-nav-close></div>
        <div class="siteHeader_nav_sp_wrap">
          <div class="siteHeader_nav_sp_header">
            <button class="nav-toggle" type="button" data-nav-close>
              <img src="<?php echo esc_url(anda_asset('images/icons/close.svg')); ?>" alt="閉じる">
            </button>
          </div>
          <nav class="siteHeader_nav_sp_navArea">
            <ul class="spNav_list">
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>">おすすめ</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('categories')); ?>">商品カテゴリ</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('catalog', 'cat=seafood')); ?>">海産物</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('catalog', 'cat=processed')); ?>">加工品</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('catalog', 'cat=gift')); ?>">ギフト・セット</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('about')); ?>">こだわり</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('guide')); ?>">ご利用案内</a></li>
              <li><a class="spNav_list_link" href="<?php echo esc_url(anda_url('contact')); ?>">お問い合わせ</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div class="siteHeader_sp">
      <div class="siteHeader_sp_tel">
        <a href="<?php echo esc_url(anda_url('contact')); ?>" class="siteHeader_top_tel_link">
          <div class="siteHeader_top_tel_link_textArea">
            <div class="num">お問い合わせ</div>
            <div class="time">平日9時〜17時</div>
          </div>
        </a>
      </div>
      <div class="siteHeader_sp_search">
        <button type="button" class="siteHeader_sp_search_toggle" data-sp-search-open>
          商品を検索 <i><img src="<?php echo esc_url(anda_asset('images/icons/icon_search.svg')); ?>" alt=""></i>
        </button>
        <div class="siteHeader_sp_search_input">
          <form class="inputArea" action="<?php echo esc_url(anda_url('catalog')); ?>" method="GET">
            <input name="q" type="text" placeholder="キーワードで検索">
            <button type="submit"><img src="<?php echo esc_url(anda_asset('images/icons/icon_search.svg')); ?>" alt="検索"></button>
          </form>
          <button type="button" data-sp-search-close><img src="<?php echo esc_url(anda_asset('images/icons/close.svg')); ?>" alt="閉じる"></button>
        </div>
      </div>
    </div>
  </header>
