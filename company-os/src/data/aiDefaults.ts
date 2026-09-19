import type { AiSettings, FixedPrompt } from '../types'

export const defaultAiSettings: AiSettings = {
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
  systemPrompt:
    'あなたは社内アシスタント「Knot AI」です。日本語で簡潔・実務的に回答してください。箇条書きを優先し、推測は推測と明示してください。',
  useDemoWhenNoKey: true,
}

export const defaultFixedPrompts: FixedPrompt[] = [
  {
    id: 'fixed-tone',
    title: 'ビジネス丁寧トーン',
    body: '回答はビジネス向けの丁寧語で。絵文字は使わない。結論を先に述べる。',
    enabled: true,
  },
  {
    id: 'fixed-format',
    title: '見出し＋箇条書き',
    body: '可能な限り「見出し + 箇条書き」で整理する。長文の連続段落は避ける。',
    enabled: true,
  },
  {
    id: 'fixed-secure',
    title: '機密配慮',
    body: '個人情報・機密らしき値はマスク例（***）で扱い、外部共有前提の表現にする。',
    enabled: false,
  },
]
