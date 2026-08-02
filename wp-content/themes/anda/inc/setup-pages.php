<?php
/**
 * Create demo pages on theme activation.
 */

if (!defined('ABSPATH')) {
  exit;
}

add_action('after_switch_theme', 'anda_create_demo_pages');

function anda_create_demo_pages(): void {
  $pages = [
    'catalog'    => ['商品一覧', 'page-catalog.php'],
    'categories' => ['カテゴリー一覧', 'page-categories.php'],
    'product'    => ['商品詳細', 'page-product.php'],
    'cart'       => ['ショッピングカート', 'page-cart.php'],
    'about'      => ['こだわり', 'page-about.php'],
    'guide'      => ['ご利用案内', 'page-guide.php'],
    'faq'        => ['よくあるご質問', 'page-faq.php'],
    'contact'    => ['お問い合わせ', 'page-contact.php'],
    'news'       => ['お知らせ', 'page-news.php'],
    'tokusho'    => ['特定商取引法に基づく表記', 'page-tokusho.php'],
    'privacy'    => ['プライバシーポリシー', 'page-privacy.php'],
  ];

  foreach ($pages as $slug => [$title, $template]) {
    $existing = get_page_by_path($slug);
    if ($existing) {
      update_post_meta($existing->ID, '_wp_page_template', $template);
      continue;
    }
    $id = wp_insert_post([
      'post_title'   => $title,
      'post_name'    => $slug,
      'post_status'  => 'publish',
      'post_type'    => 'page',
      'post_content' => '',
    ]);
    if (!is_wp_error($id) && $id) {
      update_post_meta($id, '_wp_page_template', $template);
    }
  }

  $home = get_page_by_path('home');
  if (!$home) {
    // Front page uses front-page.php; ensure reading settings point to a static front if desired later.
  }

  flush_rewrite_rules();
}
