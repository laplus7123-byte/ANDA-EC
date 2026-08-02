<?php
/**
 * Template Name: よくあるご質問
 * Template Post Type: page
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>よくあるご質問</span></nav>
    <h1 class="pageShell_title">よくあるご質問</h1>
    <p class="pageShell_lead">お客様からよくいただくご質問です。</p>
    
        <div class="content-prose">
          <h2>送料はいくらですか？</h2>
          <p>税込8,000円以上のご購入で送料無料です。</p>
          <h2>支払い方法は？</h2>
          <p>クレジットカードと銀行振込に対応予定です。</p>
        </div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
