import { defaultAiSettings, defaultFixedPrompts } from './aiDefaults'
import type { AppState } from '../types'

const today = new Date()
const iso = (offsetDays: number, hour = 10, minute = 0) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offsetDays)
  d.setHours(hour, minute, 0, 0)
  return d
}

const ymd = (d: Date) => d.toISOString().slice(0, 10)

export const seedState: AppState = {
  tasks: [
    {
      id: 'task-1',
      title: '週次進捗レポートの下書き',
      description: '各チームのKPIとブロッカーをまとめる',
      status: 'doing',
      priority: 'high',
      dueDate: ymd(iso(1)),
      tags: ['レポート', '経営'],
      assignee: '佐藤',
      createdAt: iso(-3).toISOString(),
      updatedAt: iso(0).toISOString(),
    },
    {
      id: 'task-2',
      title: 'オンボーディング資料の更新',
      description: '新入社員向けのNotion代替フローを追記',
      status: 'todo',
      priority: 'medium',
      dueDate: ymd(iso(3)),
      tags: ['ドキュメント'],
      assignee: '田中',
      createdAt: iso(-5).toISOString(),
      updatedAt: iso(-1).toISOString(),
    },
    {
      id: 'task-3',
      title: '顧客ヒアリング議事録整理',
      description: 'プロンプトテンプレで要約→共有',
      status: 'done',
      priority: 'medium',
      dueDate: ymd(iso(-1)),
      tags: ['顧客', 'AI'],
      assignee: '鈴木',
      createdAt: iso(-7).toISOString(),
      updatedAt: iso(-1).toISOString(),
    },
    {
      id: 'task-4',
      title: 'Q4ロードマップ草案',
      description: 'スケジュールと依存関係を可視化',
      status: 'todo',
      priority: 'high',
      dueDate: ymd(iso(5)),
      tags: ['企画'],
      assignee: '山田',
      createdAt: iso(-2).toISOString(),
      updatedAt: iso(0).toISOString(),
    },
    {
      id: 'task-5',
      title: '社内FAQのプロンプト整備',
      description: 'よくある質問用の補完テンプレを追加',
      status: 'doing',
      priority: 'low',
      dueDate: ymd(iso(4)),
      tags: ['AI', 'サポート'],
      assignee: '佐藤',
      createdAt: iso(-4).toISOString(),
      updatedAt: iso(0).toISOString(),
    },
  ],
  events: [
    {
      id: 'evt-1',
      title: '月曜スタンドアップ',
      description: '15分でブロッカー共有',
      date: ymd(iso(0)),
      startTime: '09:30',
      endTime: '09:45',
      color: '#2F6F5E',
      taskId: null,
    },
    {
      id: 'evt-2',
      title: '進捗レビュー',
      description: '週次レポート確認',
      date: ymd(iso(1)),
      startTime: '14:00',
      endTime: '15:00',
      color: '#C46B3A',
      taskId: 'task-1',
    },
    {
      id: 'evt-3',
      title: 'プロンプトワークショップ',
      description: 'チーム向け補完テンプレ作成会',
      date: ymd(iso(3)),
      startTime: '11:00',
      endTime: '12:00',
      color: '#3A5F8A',
      taskId: 'task-5',
    },
    {
      id: 'evt-4',
      title: 'ロードマップ定例',
      description: 'Q4優先度の合意形成',
      date: ymd(iso(5)),
      startTime: '16:00',
      endTime: '17:00',
      color: '#6B4F8A',
      taskId: 'task-4',
    },
  ],
  prompts: [
    {
      id: 'prompt-1',
      title: '議事録サマリー',
      category: 'ドキュメント',
      body: `以下の議事録を、意思決定・アクション・未決事項の3セクションで要約してください。

対象会議: {{会議名}}
参加者: {{参加者}}
原文:
{{原文}}

トーン: 簡潔でビジネス向け。箇条書き優先。`,
      variables: ['会議名', '参加者', '原文'],
      favorite: true,
      updatedAt: iso(-1).toISOString(),
    },
    {
      id: 'prompt-2',
      title: 'タスク分解',
      category: '企画',
      body: `次の目標を、実行可能なタスクに分解してください。

目標: {{目標}}
期限: {{期限}}
制約: {{制約}}

各タスクに「成果物」「目安工数」「依存」を付けてください。`,
      variables: ['目標', '期限', '制約'],
      favorite: true,
      updatedAt: iso(-2).toISOString(),
    },
    {
      id: 'prompt-3',
      title: '週次レポート下書き',
      category: 'レポート',
      body: `週次レポートの下書きを作成してください。

期間: {{期間}}
達成事項:
{{達成事項}}
課題:
{{課題}}
来週のフォーカス:
{{来週}}

形式: 見出し + 箇条書き。経営向けに1画面で読める長さ。`,
      variables: ['期間', '達成事項', '課題', '来週'],
      favorite: false,
      updatedAt: iso(0).toISOString(),
    },
    {
      id: 'prompt-4',
      title: '丁寧なメール返信',
      category: 'コミュニケーション',
      body: `次の内容に対する丁寧なビジネスメール返信を書いてください。

相手: {{相手}}
要件: {{要件}}
こちらの方針: {{方針}}

日本語。簡潔で温かみのあるトーン。`,
      variables: ['相手', '要件', '方針'],
      favorite: false,
      updatedAt: iso(-3).toISOString(),
    },
    {
      id: 'prompt-5',
      title: '仕様レビュー観点',
      category: 'エンジニアリング',
      body: `以下の仕様をレビューし、抜け漏れ・曖昧さ・リスクを指摘してください。

機能名: {{機能名}}
仕様:
{{仕様}}

出力: Critical / Major / Minor の3段階。`,
      variables: ['機能名', '仕様'],
      favorite: true,
      updatedAt: iso(-4).toISOString(),
    },
  ],
  fixedPrompts: structuredClone(defaultFixedPrompts),
  aiSettings: structuredClone(defaultAiSettings),
  aiHistory: [],
}
