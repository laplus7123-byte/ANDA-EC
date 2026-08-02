<?php
/**
 * Template Name: お問い合わせ
 * Template Post Type: page
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>お問い合わせ</span></nav>
    <h1 class="pageShell_title">お問い合わせ</h1>
    <p class="pageShell_lead">平日 9:00–17:00（デモフォーム）</p>
    
        <div class="content-prose">
          <p>本フォームはデモです。WordPress の Contact Form 7 等へ差し替え予定です。</p>
          <p><a href="mailto:info@example.com">info@example.com</a></p>
        </div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
