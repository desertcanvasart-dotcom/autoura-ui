'use client'

import { AlertTriangle, Info } from 'lucide-react'
import { useUiLabels } from '../labels.js'
import { LANGUAGE_NAMES } from '../lib/languages.js'
import type { AttentionItem } from '../lib/attention.js'

interface AttentionStripProps {
  items: AttentionItem[]
  /** Open what the item is about (its language, its days). */
  onOpen?: (item: AttentionItem) => void
}

const SEVERITY_STYLE: Record<AttentionItem['severity'], string> = {
  high: 'border-red-200 bg-red-50 text-red-900',
  medium: 'border-amber-200 bg-amber-50 text-amber-900',
  low: 'border-blue-200 bg-blue-50 text-blue-900',
}

/**
 * What is wrong with this trip, one line each, worst first
 * (lib/attention.ts). Nothing here blocks anything; it is the list of things
 * to look at before sending.
 */
export function AttentionStrip({ items, onOpen }: AttentionStripProps) {
  const l = useUiLabels().attention
  if (items.length === 0) return null

  return (
    <section className="rounded-lg border border-gray-200 bg-white shadow-sm p-3" data-testid="needs-attention">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{l.title(items.length)}</h2>
      <ul className="space-y-1.5">
        {items.map(item => {
          const Icon = item.severity === 'low' ? Info : AlertTriangle
          const actionable = onOpen && (item.language || item.days)
          return (
            <li
              key={item.key}
              data-testid={`attention-${item.code}`}
              className={`flex items-start gap-2 rounded border px-2.5 py-1.5 text-sm ${SEVERITY_STYLE[item.severity]}`}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
              <span className="flex-1">{l.message(item, item.language ? LANGUAGE_NAMES[item.language] : '')}</span>
              {actionable && (
                <button
                  type="button"
                  onClick={() => onOpen!(item)}
                  className="shrink-0 text-xs font-medium underline underline-offset-2 hover:no-underline"
                >
                  {l.open}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
