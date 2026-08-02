<?php
/**
 * ANDA theme functions.
 */

if (!defined('ABSPATH')) {
  exit;
}

define('ANDA_THEME_VERSION', '0.1.0');

require_once get_template_directory() . '/inc/setup-pages.php';

add_action('after_setup_theme', function () {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
  add_theme_support('woocommerce');
  register_nav_menus([
    'primary' => __('Primary Menu', 'anda'),
    'footer'  => __('Footer Menu', 'anda'),
  ]);
});

add_action('wp_enqueue_scripts', function () {
  $uri = get_template_directory_uri();
  $ver = ANDA_THEME_VERSION;

  wp_enqueue_style('anda-reference', $uri . '/assets/css/reference-base.css', [], $ver);
  wp_enqueue_style('anda-theme', $uri . '/assets/css/anda-theme.css', ['anda-reference'], $ver);

  $pages = anda_page_urls();

  wp_register_script('anda-config', false, [], $ver, true);
  wp_enqueue_script('anda-config');
  wp_add_inline_script(
    'anda-config',
    'window.ANDA_CFG=' . wp_json_encode([
      'themeUri' => $uri,
      'home'     => home_url('/'),
      'pages'    => $pages,
    ]) . ';',
    'before'
  );

  wp_enqueue_script('anda-products', $uri . '/assets/js/products.js', ['anda-config'], $ver, true);
  wp_enqueue_script('anda-theme-boot', $uri . '/assets/js/theme-boot.js', ['anda-products'], $ver, true);
  wp_enqueue_script('anda-cart', $uri . '/assets/js/cart.js', ['anda-theme-boot'], $ver, true);
  wp_enqueue_script('anda-cart-ui', $uri . '/assets/js/cart-ui.js', ['anda-cart'], $ver, true);
  wp_enqueue_script('anda-site-ui', $uri . '/assets/js/site-ui.js', [], $ver, true);

  if (is_front_page()) {
    wp_enqueue_style('swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', [], '11');
    wp_enqueue_script('swiper', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], '11', true);
    wp_enqueue_script('anda-top', $uri . '/assets/js/top.js', ['swiper', 'anda-cart-ui'], $ver, true);
  }

  if (is_page('catalog') || is_page_template('page-catalog.php')) {
    wp_enqueue_script('anda-catalog', $uri . '/assets/js/catalog.js', ['anda-cart-ui'], $ver, true);
  }

  if (is_page('product') || is_page_template('page-product.php')) {
    wp_enqueue_script('anda-product', $uri . '/assets/js/product.js', ['anda-cart-ui'], $ver, true);
  }

  if (is_page('cart') || is_page_template('page-cart.php')) {
    wp_enqueue_script('anda-cart-page', $uri . '/assets/js/cart-page.js', ['anda-cart'], $ver, true);
  }

  if (is_page('categories') || is_page_template('page-categories.php')) {
    wp_enqueue_script('anda-categories', $uri . '/assets/js/categories-page.js', ['anda-theme-boot'], $ver, true);
  }
});

/**
 * Resolved page URLs for front-end JS.
 */
function anda_page_urls(): array {
  $slugs = [
    'catalog',
    'categories',
    'product',
    'cart',
    'about',
    'guide',
    'faq',
    'contact',
    'news',
    'tokusho',
    'privacy',
  ];
  $out = [];
  foreach ($slugs as $slug) {
    $page = get_page_by_path($slug);
    $out[$slug] = $page ? get_permalink($page) : home_url('/' . $slug . '/');
  }
  return $out;
}

function anda_url(string $slug, string $query = ''): string {
  $urls = anda_page_urls();
  $url = $urls[$slug] ?? home_url('/' . $slug . '/');
  if ($query !== '') {
    $url .= (str_contains($url, '?') ? '&' : '?') . ltrim($query, '?');
  }
  return $url;
}

function anda_asset(string $path): string {
  return get_template_directory_uri() . '/assets/' . ltrim($path, '/');
}

add_filter('body_class', function ($classes) {
  $classes[] = 'is-show';
  return $classes;
});
