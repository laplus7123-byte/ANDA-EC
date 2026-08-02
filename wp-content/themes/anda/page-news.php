<?php
/**
 * Template Name: お知らせ
 * Template Post Type: page
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>お知らせ</span></nav>
    <h1 class="pageShell_title">お知らせ</h1>
    <p class="pageShell_lead">店舗からのお知らせ一覧です。</p>
    
        <ul class="important_news">
          <li><time datetime="2026-08-01">2026.08.01</time> 夏季の配送スケジュールについて</li>
          <li><time datetime="2026-07-15">2026.07.15</time> 新商品入荷のお知らせ</li>
        </ul>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
