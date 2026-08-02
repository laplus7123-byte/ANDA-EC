/* 仮商品データ。運用後はWordPress/WooCommerceのカテゴリー追加で拡張想定 */
window.ANDA = window.ANDA || {};

ANDA.categories = [
  {
    id: "recommend",
    name: "おすすめ",
    description: "いま特におすすめの商品を集めました。",
    image: "assets/images/category/01.jpg",
  },
  {
    id: "seafood",
    name: "海産物",
    description: "北海道の浜から届く、生鮮・冷凍の海の幸。",
    image: "assets/images/category/02.jpg",
  },
  {
    id: "processed",
    name: "加工品",
    description: "干物や珍味など、日持ちする北の味。",
    image: "assets/images/category/03.jpg",
  },
  {
    id: "gift",
    name: "ギフト・セット",
    description: "ご贈答や詰め合わせにぴったりのセット商品。",
    image: "assets/images/category/04.jpg",
  },
];

ANDA.products = [
  {
    id: "p01",
    name: "北海道産 いくら醤油漬け 500g",
    price: 8800,
    category: "seafood",
    recommend: true,
    popular: 98,
    createdAt: "2026-07-20",
    image: "assets/images/products/p01.jpg",
    excerpt: "粒が大きく、解凍後もハリのある醤油漬けいくらの定番商品です。",
    description:
      "北海道産のいくらを丁寧に醤油漬けにしました。丼や手巻き寿司、ちらし寿司に。冷凍のままお届けし、ご自宅で解凍してお召し上がりください。",
  },
  {
    id: "p02",
    name: "オホーツク 生冷凍ホタテ貝柱 1kg",
    price: 6480,
    category: "seafood",
    recommend: true,
    popular: 95,
    createdAt: "2026-07-18",
    image: "assets/images/products/p02.jpg",
    excerpt: "甘みが強いオホーツク産の貝柱。バター焼きや刺身にも。",
    description:
      "鮮度のよいホタテ貝柱を急速冷凍。解凍後は刺身はもちろん、フライやグラタンにもおすすめです。",
  },
  {
    id: "p03",
    name: "秋鮭 切り身セット 10切",
    price: 3980,
    category: "seafood",
    recommend: true,
    popular: 88,
    createdAt: "2026-06-28",
    image: "assets/images/products/p03.jpg",
    excerpt: "朝食やお弁当に使いやすい切り身セット。",
    description:
      "北海道の秋鮭を食べやすい切り身に。焼くだけで定番の一品になります。",
  },
  {
    id: "p04",
    name: "ボイル毛ガニ 約500g × 2尾",
    price: 9900,
    category: "seafood",
    recommend: false,
    popular: 82,
    createdAt: "2026-07-10",
    image: "assets/images/products/p04.jpg",
    excerpt: "身入りのよい毛ガニをボイルしてお届け。",
    description:
      "解凍して食べるだけで本格的な蟹料理に。ギフトにも人気です。",
  },
  {
    id: "p05",
    name: "開きホッケ 3枚セット",
    price: 2480,
    category: "processed",
    recommend: true,
    popular: 76,
    createdAt: "2026-06-15",
    image: "assets/images/products/p05.jpg",
    excerpt: "脂の乗ったホッケの開き。焼くだけで香ばしい一品。",
    description:
      "北海道らしい干物の定番。フライパンやグリルで香ばしく焼けます。",
  },
  {
    id: "p06",
    name: "鮭とば 食べ比べセット 150g",
    price: 1980,
    category: "processed",
    recommend: false,
    popular: 70,
    createdAt: "2026-05-30",
    image: "assets/images/products/p06.jpg",
    excerpt: "おつまみやおやつに。食べ応えのある鮭とば。",
    description:
      "ソフトタイプとハードタイプを詰め合わせた食べ比べセットです。",
  },
  {
    id: "p07",
    name: "昆布締め詰め合わせ",
    price: 3200,
    category: "processed",
    recommend: false,
    popular: 64,
    createdAt: "2026-07-01",
    image: "assets/images/products/p07.jpg",
    excerpt: "昆布の香りが移った上品な加工品セット。",
    description:
      "日本酒や白ご飯に合う昆布締めを詰め合わせました。",
  },
  {
    id: "p08",
    name: "海鮮丼セット（3〜4人前）",
    price: 7200,
    category: "gift",
    recommend: true,
    popular: 90,
    createdAt: "2026-07-22",
    image: "assets/images/products/p08.jpg",
    excerpt: "ご自宅で北海道の海鮮丼を楽しめるセット。",
    description:
      "いくら・ホタテなどを組み合わせた丼セット。ご贈答やホームパーティーに。",
  },
  {
    id: "p09",
    name: "北の幸 ギフトボックス",
    price: 12800,
    category: "gift",
    recommend: true,
    popular: 85,
    createdAt: "2026-07-05",
    image: "assets/images/products/p09.jpg",
    excerpt: "人気商品を詰め合わせた贈答用ボックス。",
    description:
      "のし対応可能なギフトボックス。お中元・お歳暮・内祝いにもご利用ください。",
  },
  {
    id: "p10",
    name: "ほたてバター焼き用セット",
    price: 4500,
    category: "gift",
    recommend: false,
    popular: 60,
    createdAt: "2026-06-20",
    image: "assets/images/products/p10.jpg",
    excerpt: "ホタテとバターソースの簡単調理セット。",
    description:
      "焼くだけで完成するセット商品。ファミリー向けです。",
  },
  {
    id: "p11",
    name: "生サーモン柵 400g",
    price: 5280,
    category: "seafood",
    recommend: false,
    popular: 72,
    createdAt: "2026-07-25",
    image: "assets/images/products/p11.jpg",
    excerpt: "刺身・丼・カルパッチョに使いやすいサーモン柵。",
    description:
      "鮮度を保ったまま急速冷凍。解凍後すぐにお刺身としてお楽しみいただけます。",
  },
  {
    id: "p12",
    name: "数の子 醤油漬け 300g",
    price: 3680,
    category: "processed",
    recommend: false,
    popular: 58,
    createdAt: "2026-07-12",
    image: "assets/images/products/p12.jpg",
    excerpt: "ポリポリ食感が楽しい醤油漬け数の子。",
    description:
      "おせちやおつまみに。冷凍のままお届けします。",
  },
];

ANDA.getCategory = (id) => ANDA.categories.find((c) => c.id === id) || null;

ANDA.getProduct = (id) => ANDA.products.find((p) => p.id === id) || null;

ANDA.getProductsByCategory = (categoryId) => {
  if (!categoryId || categoryId === "all") return [...ANDA.products];
  if (categoryId === "recommend") return ANDA.products.filter((p) => p.recommend);
  return ANDA.products.filter((p) => p.category === categoryId);
};

ANDA.formatPrice = (price) =>
  `¥${price.toLocaleString("ja-JP")}`;
