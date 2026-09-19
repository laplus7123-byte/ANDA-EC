import type { AiSettings, FixedPrompt } from '../types'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function buildSystemContent(settings: AiSettings, fixed: FixedPrompt[]) {
  const parts = [settings.systemPrompt.trim()]
  for (const f of fixed.filter((p) => p.enabled && p.body.trim())) {
    parts.push(`【固定: ${f.title}】\n${f.body.trim()}`)
  }
  return parts.filter(Boolean).join('\n\n')
}

/** Lightweight offline responder so the UI works without an API key */
export function demoComplete(userPrompt: string): string {
  const lines = userPrompt
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const head = lines[0] ?? 'リクエスト'
  const bullets = lines.slice(1, 6).map((l) => `・${l.slice(0, 80)}`)

  return [
    '【Knot デモAI応答】APIキー未設定のためローカルデモです。',
    '',
    '## 要約',
    head.slice(0, 120),
    '',
    '## 提案',
    ...(bullets.length
      ? bullets
      : ['・入力プロンプトに沿って、要点を3点に整理してください', '・次アクションを1つ決めてください']),
    '',
    '## 次の一歩',
    '・設定画面で OpenAI 互換の API キーを入れると、実AI応答に切り替わります。',
  ].join('\n')
}

export async function completeChat(options: {
  settings: AiSettings
  fixedPrompts: FixedPrompt[]
  userContent: string
  history?: ChatMessage[]
}): Promise<{ text: string; mode: 'api' | 'demo' }> {
  const { settings, fixedPrompts, userContent, history = [] } = options
  const system = buildSystemContent(settings, fixedPrompts)

  if (!settings.apiKey.trim()) {
    if (!settings.useDemoWhenNoKey) {
      throw new Error('APIキーが未設定です。設定画面でキーを入力してください。')
    }
    await new Promise((r) => setTimeout(r, 450))
    return { text: demoComplete(userContent), mode: 'demo' }
  }

  const base = settings.baseUrl.replace(/\/$/, '')
  const messages: ChatMessage[] = [
    { role: 'system', content: system },
    ...history.filter((m) => m.role !== 'system'),
    { role: 'user', content: userContent },
  ]

  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: settings.model || 'gpt-4o-mini',
      messages,
      temperature: 0.4,
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`APIエラー (${res.status}): ${errText.slice(0, 240) || res.statusText}`)
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[]
  }
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('AI応答が空でした')
  return { text, mode: 'api' }
}
