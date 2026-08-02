<?php
/**
 * Template Name: カテゴリー一覧
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>カテゴリー一覧</span></nav>
    <h1 class="pageShell_title">カテゴリー一覧</h1>
    <p class="pageShell_lead">大枠のカテゴリーから商品を探せます。</p>
    <div class="anda-product-grid" data-categories-grid style="grid-template-columns:repeat(2,1fr);gap:20px"></div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
