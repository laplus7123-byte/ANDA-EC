<?php
get_header();
?>
<div class="siteBody siteBody--inner">
  <main class="pageShell">
    <?php while (have_posts()) : the_post(); ?>
      <nav class="breadcrumb"><a href="<?php echo esc_url(home_url("/")); ?>">トップ</a><span>/</span><span><?php the_title(); ?></span></nav>
      <h1 class="pageShell_title"><?php the_title(); ?></h1>
      <div class="content-prose"><?php the_content(); ?></div>
    <?php endwhile; ?>
  </main>
  <?php get_template_part("template-parts/site-footer"); ?>
</div>
<?php
get_footer();
