# Knot — 社内ワークスペース

Notion の進化版イメージで、**タスク管理 / スケジュール管理 / プロンプト補完** をひとつに結ぶ社内システムです。

## 機能

- **タスク**: カンバン / リスト、優先度・期限・担当・タグ、ステータス移動
- **スケジュール**: 月次カレンダー、予定の追加・編集、タスク連携
- **プロンプト補完**: テンプレ庫、`{{変数}}` 埋め込み、スラッシュ補完（`/summary` など）、完成文のコピー

データはブラウザの `localStorage` に保存されます（デモ用）。

## 起動

```bash
cd company-os
npm install
npm run dev
```

ビルド:

```bash
npm run build
npm run preview
```

## 技術

- Vite + React + TypeScript
- date-fns / lucide-react
