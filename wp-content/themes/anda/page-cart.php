<?php
/**
 * Template Name: カート
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>カート</span></nav>
    <h1 class="pageShell_title">ショッピングカート</h1>
    <p class="pageShell_lead">お支払い方法：クレジットカード / 銀行振込</p>
    <div data-cart-page></div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
