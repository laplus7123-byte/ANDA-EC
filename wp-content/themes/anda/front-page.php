<?php
/**
 * Front page — ported from design/index.html
 */
get_header();
$asset = static function (string $path): string {
  return esc_url(anda_asset($path));
};
?>
<div class="siteBody top">
  <div id="firstView">
    <div class="firstView">
      <div class="firstView_mainContents">
        <div class="swiper swiper-main">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <a href="<?php echo esc_url(anda_url('catalog', 'cat=seafood')); ?>" class="firstView_slide">
                <picture>
                  <source media="(min-width: 920px)" srcset="<?php echo $asset('images/hero/01-pc.jpg'); ?>" width="2100" height="1180">
                  <img src="<?php echo $asset('images/hero/01.jpg'); ?>" alt="北の海の恵み" width="1125" height="1122" fetchpriority="high">
                </picture>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>" class="firstView_slide">
                <picture>
                  <source media="(min-width: 920px)" srcset="<?php echo $asset('images/hero/02-pc.jpg'); ?>" width="2100" height="1180">
                  <img src="<?php echo $asset('images/hero/02.jpg'); ?>" alt="おすすめの海産物" width="1125" height="1122">
                </picture>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="<?php echo esc_url(anda_url('catalog', 'cat=gift')); ?>" class="firstView_slide">
                <picture>
                  <source media="(min-width: 920px)" srcset="<?php echo $asset('images/hero/03-pc.jpg'); ?>" width="2100" height="1180">
                  <img src="<?php echo $asset('images/hero/03.jpg'); ?>" alt="ギフト・セット" width="1125" height="1122">
                </picture>
              </a>
            </div>
            <div class="swiper-slide">
              <a href="<?php echo esc_url(anda_url('about')); ?>" class="firstView_slide">
                <picture>
                  <source media="(min-width: 920px)" srcset="<?php echo $asset('images/hero/04-pc.jpg'); ?>" width="2100" height="1180">
                  <img src="<?php echo $asset('images/hero/04.jpg'); ?>" alt="ANDAのこだわり" width="1125" height="1122">
                </picture>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="firstView_thumbContents">
        <div class="firstView_thumbContents-pc firstView_thumbContents_list">
          <?php
          $thumbs = [
            ['01', '北の海の恵み', true],
            ['02', 'おすすめの海産物', false],
            ['03', 'ギフト・セット', false],
            ['04', 'ANDAのこだわり', false],
          ];
          foreach ($thumbs as [$n, $cap, $active]) :
            ?>
            <div class="firstView_thumbContents_list_item">
              <figure class="firstView_thumb<?php echo $active ? ' thumb-media-active' : ''; ?>">
                <img src="<?php echo $asset("images/hero/{$n}.jpg"); ?>" alt="">
                <figcaption><?php echo esc_html($cap); ?></figcaption>
              </figure>
            </div>
          <?php endforeach; ?>
        </div>
        <div class="firstView_thumbContents-sp swiper swiper-thumb">
          <div class="swiper-wrapper">
            <?php foreach ($thumbs as [$n, $cap]) : ?>
              <div class="swiper-slide">
                <figure class="firstView_thumb">
                  <img src="<?php echo $asset("images/hero/{$n}.jpg"); ?>" alt="">
                  <figcaption><?php echo esc_html($cap); ?></figcaption>
                </figure>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="index_top_section">
    <div class="commonPadding">
      <h2 class="index_top_section_title">重要なお知らせ</h2>
      <ul class="important_news">
        <li><a href="<?php echo esc_url(anda_url('news')); ?>"><time datetime="2026-08-01">2026.08.01</time> 夏季配送について：クール便でのお届けとなります</a></li>
        <li><a href="<?php echo esc_url(anda_url('news')); ?>"><time datetime="2026-07-20">2026.07.20</time> 新商品を入荷しました</a></li>
      </ul>
    </div>
  </section>

  <section class="index_top_section">
    <div class="commonPadding">
      <h2 class="index_top_section_title">人気のカテゴリー</h2>
      <div class="index_top_category">
        <div class="swiper swiper-overflow">
          <div class="swiper-wrapper">
            <?php
            $cats = [
              ['recommend', '01', 'おすすめ'],
              ['seafood', '02', '海産物'],
              ['processed', '03', '加工品'],
              ['gift', '04', 'ギフト・セット'],
            ];
            foreach ($cats as [$id, $img, $label]) :
              ?>
              <div class="swiper-slide">
                <a href="<?php echo esc_url(anda_url('catalog', 'cat=' . $id)); ?>" class="index_top_category_card">
                  <div class="index_top_category_card_img">
                    <img src="<?php echo $asset("images/category/{$img}.jpg"); ?>" width="237" height="316" loading="lazy" alt="<?php echo esc_attr($label); ?>">
                  </div>
                  <p class="index_top_category_card_title"><?php echo esc_html($label); ?></p>
                </a>
              </div>
            <?php endforeach; ?>
            <div class="swiper-slide">
              <a href="<?php echo esc_url(anda_url('categories')); ?>" class="index_top_category_card index_top_category_card-all">
                <div class="index_top_category_card_img"></div>
                <p class="index_top_category_card_title index_top_category_card-all_title">すべてのカテゴリを見る</p>
                <i></i>
              </a>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="index_about index_top_section">
    <div class="index_about_bg">
      <picture>
        <source media="(min-width: 920px)" srcset="<?php echo $asset('images/about-pc.jpg'); ?>" width="1600" height="900">
        <img src="<?php echo $asset('images/about.jpg'); ?>" width="750" height="1200" loading="lazy" alt="ANDAについて">
      </picture>
    </div>
    <div class="index_about_titleArea">
      <h2 class="index_about_title">ANDAは<br>北の海と<br>食卓を繋ぐ<br>海産物の<br>お取り寄せ店です</h2>
      <p class="index_about_title_en">about<br>anda</p>
    </div>
    <div class="index_about_textArea">
      <p>北海道の浜で水揚げされた海産物を、鮮度を落とさないままお届けします。まずは大枠のカテゴリーからスタートし、運用にあわせて品揃えを広げていきます。</p>
      <a href="<?php echo esc_url(anda_url('about')); ?>" class="btnRound btnRound-white">ANDAについて</a>
    </div>
  </section>

  <div id="index_product" class="index_product list_column">
    <section>
      <h2 class="index_readContent_title top_season_title">おすすめ商品</h2>
      <div class="commonPadding">
        <div class="index_product_season" id="topRecommend"></div>
        <p style="margin-top:40rem;text-align:center">
          <a href="<?php echo esc_url(anda_url('catalog', 'cat=recommend')); ?>" class="btnRound">おすすめ一覧を見る</a>
        </p>
      </div>
    </section>
    <section class="index_product_ranking" style="margin-top:60rem">
      <h2 class="index_readContent_title top_ranking_title">人気ランキング</h2>
      <div class="commonPadding">
        <div class="swiper swiper-overflow-ranking">
          <div class="swiper-wrapper" id="topRanking"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </section>
  </div>

  <section class="index_top_section">
    <div class="commonPadding">
      <h2 class="index_readContent_title">お客様の声</h2>
      <div class="anda-review-row">
        <blockquote class="anda-review-card"><p>いくらの粒が大きく、解凍してもプリプリでした。</p><cite>東京都・K様</cite></blockquote>
        <blockquote class="anda-review-card"><p>ホタテが甘くて驚きました。家族みんなが大絶賛です。</p><cite>大阪府・M様</cite></blockquote>
        <blockquote class="anda-review-card"><p>ギフトで送りました。梱包もしっかりしていて安心でした。</p><cite>神奈川県・S様</cite></blockquote>
      </div>
    </div>
  </section>

  <section class="index_top_section">
    <div class="commonPadding">
      <h2 class="index_readContent_title">お知らせ</h2>
      <ul class="important_news">
        <li><a href="<?php echo esc_url(anda_url('news')); ?>"><time datetime="2026-08-01">2026.08.01</time> 夏季の配送スケジュールについて</a></li>
        <li><a href="<?php echo esc_url(anda_url('news')); ?>"><time datetime="2026-07-15">2026.07.15</time> 新商品入荷のお知らせ</a></li>
        <li><a href="<?php echo esc_url(anda_url('tokusho')); ?>"><time datetime="2026-06-28">2026.06.28</time> 特定商取引法に基づく表記を更新しました</a></li>
      </ul>
    </div>
  </section>

  <div class="foot_guide">
    <div class="foot_guide_column">
      <section class="foot_guide_section">
        <h2 class="foot_guide_section_title">送料・配送について</h2>
        <dl class="foot_guide_list">
          <dt>8,000円以上で送料無料</dt>
          <dd>1回のご注文金額が8,000円（税込）以上の場合、送料無料となります。クール便でのお届けが基本です。</dd>
          <dt>お届けにかかる日数</dt>
          <dd>ご注文確認後、準備が整い次第発送いたします。詳細はご利用案内をご確認ください。</dd>
        </dl>
      </section>
      <section class="foot_guide_section">
        <h2 class="foot_guide_section_title">お支払い方法</h2>
        <dl class="foot_guide_list">
          <dt>クレジットカード</dt>
          <dd>各種クレジットカードをご利用いただけます（WordPress構築時に連携）。</dd>
          <dt>銀行振込</dt>
          <dd>ご注文後に振込先をご案内します。</dd>
        </dl>
      </section>
      <section class="foot_guide_section">
        <h2 class="foot_guide_section_title">返品・交換について</h2>
        <dl class="foot_guide_list">
          <dt>返品・交換</dt>
          <dd>商品不良などの場合、商品到着後7日以内にご連絡ください。詳しくは<a href="<?php echo esc_url(anda_url('guide')); ?>#return" class="link-inner">ご利用案内</a>へ。</dd>
        </dl>
      </section>
    </div>
  </div>

  <?php get_template_part('template-parts/site-footer'); ?>
</div>
<?php
get_footer();
