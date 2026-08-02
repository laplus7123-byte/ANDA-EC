<?php
/**
 * Template Name: 商品一覧
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell" data-catalog>
    <nav class="breadcrumb" data-catalog-crumb></nav>
    <h1 class="pageShell_title" data-catalog-title>商品一覧</h1>
    <p class="pageShell_lead" data-catalog-lead>カテゴリーや並び替えで商品を探せます。</p>
    <div class="catalog-toolbar">
      <div class="catalog-filters" data-catalog-filters></div>
      <div class="catalog-sort">
        <span data-catalog-count>0件</span>
        <label>並び替え
          <select data-catalog-sort>
            <option value="popular">人気順</option>
            <option value="new">新着順</option>
            <option value="price-asc">価格が安い順</option>
            <option value="price-desc">価格が高い順</option>
            <option value="name">名前順</option>
          </select>
        </label>
      </div>
    </div>
    <div class="index_product_season" data-catalog-grid></div>
    <p class="page-empty" data-catalog-empty hidden>該当する商品がありません。</p>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
