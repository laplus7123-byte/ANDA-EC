# ANDA EC（北海道海産物）

WordPress クラシックテーマ + 静的デザイン（`design/`）のリポジトリです。  
仮公開先: https://anda-the.sea.athtobi.com/ （ドメインは後日変更）

## 更新の流れ（本線）

```text
ローカルでテーマ編集 → git commit → git push origin main
  → GitHub Actions が FTP で wp-content/themes/anda を反映
  → 仮ドメインで確認
```

### 初回セットアップ

1. テーマを有効化（どちらか）
   - **A. 管理画面**: 下記で zip を作り、`外観 → テーマ → テーマのアップロード` で有効化
     ```bash
     cd wp-content/themes && zip -r ../../anda-theme.zip anda
     ```
   - **B. FTP**: `wp-content/themes/anda/` をサーバーへ配置して有効化
2. テーマ有効化時に固定ページ（catalog / about 等）が自動作成されます
3. `設定 → 表示設定` でフロントページを「最新の投稿」のままでも `front-page.php` が使われます（静的ページ指定でも可）
4. GitHub リポジトリに Secrets を登録（自動デプロイ用）

| Secret | 内容 |
|--------|------|
| `FTP_SERVER` | FTPホスト |
| `FTP_USERNAME` | FTPユーザー |
| `FTP_PASSWORD` | FTPパスワード |
| `FTP_SERVER_DIR` | リモートのテーマパス（例: `/wp-content/themes/anda/`） |

Secrets 登録後、`main` への push で [Deploy ANDA theme via FTP](.github/workflows/deploy-theme.yml) が走ります。  
手動実行: Actions → Deploy ANDA theme via FTP → Run workflow

## ローカル確認（静的デザイン）

```bash
cd design
python3 -m http.server 8899
```

http://localhost:8899

## フォルダ構成

| パス | 内容 |
|------|------|
| `wp-content/themes/anda/` | **公開の正** WordPressテーマ |
| `design/` | 静的HTMLの参照・試作 |
| `image/` | 素材 |
| `.github/workflows/` | FTP自動デプロイ |

## 次フェーズ

- WooCommerce インストールと商品移行
- 決済（クレジット + 銀行振込）
- 本番ドメイン切替
