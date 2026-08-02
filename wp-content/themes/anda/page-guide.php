<?php
/**
 * Template Name: ご利用案内
 * Template Post Type: page
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>ご利用案内</span></nav>
    <h1 class="pageShell_title">ご利用案内</h1>
    <p class="pageShell_lead">ご注文からお届けまでの流れをご案内します。</p>
    
        <div class="content-prose">
          <h2 id="shipping">配送について</h2>
          <p>税込8,000円以上で送料無料。クール便でのお届けが基本です。</p>
          <h2 id="payment">お支払い方法</h2>
          <p>クレジットカード / 銀行振込。</p>
          <h2 id="return">返品・交換</h2>
          <p>商品不良などの場合、到着後7日以内にご連絡ください。</p>
          <h2 id="account">会員・ログイン</h2>
          <p>WordPress / WooCommerce 構築時に会員機能を接続予定です。</p>
        </div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
