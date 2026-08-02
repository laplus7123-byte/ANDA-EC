<?php
/**
 * Fallback index.
 */
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <h1 class="pageShell_title"><?php the_title(); ?></h1>
      <div class="content-prose"><?php the_content(); ?></div>
    <?php endwhile; else : ?>
      <p class="page-empty">コンテンツがありません。</p>
    <?php endif; ?>
  </main>
  <?php get_template_part('template-parts/site-footer'); ?>
</div>
<?php
get_footer();
