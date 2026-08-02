<?php
/**
 * Template Name: こだわり
 * Template Post Type: page
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span>こだわり</span></nav>
    <h1 class="pageShell_title">こだわり</h1>
    <p class="pageShell_lead">海のそばで選び、そのまま届ける。</p>
    
        <div class="content-prose">
          <h2>産地との距離を近づける</h2>
          <p>北海道の浜で水揚げされた海産物を、鮮度を落とさないままご自宅へお届けします。</p>
          <h2>鮮度を守る配送</h2>
          <p>冷凍・冷蔵が必要な商品はクール便で発送します。</p>
          <h2>これから増やしていく品揃え</h2>
          <p>カテゴリーはまず大枠（おすすめ／海産物／加工品／ギフト・セット）でスタートし、運用開始後に追加できる構成です。</p>
          <p><a href="<?php echo esc_url(anda_url("catalog", "cat=recommend")); ?>" class="btnRound">おすすめ商品を見る</a></p>
        </div>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
