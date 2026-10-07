'use client'

import { Columns2, User } from 'lucide-react'
import { useUiLabels } from '../labels.js'
import { LANGUAGE_NAMES, type Language } from '../lib/languages.js'
import type { DayTranslationStatus, LanguageSummary } from '../lib/content-language.js'

export type ContentView = Language | 'side'

interface LanguageStatusRowProps {
  sourceLanguage: Language
  targets: LanguageSummary[]
  clientLanguage: Language | null
  view: ContentView
  onSelect: (view: ContentView) => void
}

const STATUS_STYLE: Record<LanguageSummary['status'], string> = {
  source: 'bg-gray-50 text-gray-700 border-gray-300',
  reviewed: 'bg-green-50 text-green-700 border-green-200',
  machine: 'bg-blue-50 text-blue-700 border-blue-200',
  partial: 'bg-amber-50 text-amber-800 border-amber-200',
  outdated: 'bg-amber-50 text-amber-800 border-amber-300',
  missing: 'bg-red-50 text-red-700 border-red-200',
}

/**
 * The trip's content languages: which one is the source and what state every
 * other one is in. Each chip opens that language; "Side by side" opens source
 * and target together.
 *
 * Content language only — the staff UI language is the app's own switch and
 * never follows the itinerary.
 */
export function LanguageStatusRow({ sourceLanguage, targets, clientLanguage, view, onSelect }: LanguageStatusRowProps) {
  const l = useUiLabels().languages

  const chip = (lang: Language, status: LanguageSummary['status'], detail: string) => {
    const isClient = clientLanguage === lang
    const active = view === lang
    return (
      <button
        key={lang}
        type="button"
        onClick={() => onSelect(lang)}
        data-testid={`language-chip-${lang}`}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium transition-shadow ${STATUS_STYLE[status]} ${active ? 'ring-2 ring-primary-500 ring-offset-1' : 'hover:shadow-sm'}`}
        title={isClient ? l.clientReadsThis : undefined}
      >
        <span className="font-semibold">{LANGUAGE_NAMES[lang]}</span>
        <span className="opacity-60">·</span>
        <span>{detail}</span>
        {isClient && (
          <>
            <span className="opacity-60">·</span>
            <User className="w-3 h-3" aria-hidden />
            <span>{l.clientLanguage}</span>
          </>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5" data-testid="language-status-row">
      {chip(sourceLanguage, 'source', l.source)}
      {targets.map(summary => {
        const done = summary.total - summary.counts.missing
        const detail =
          summary.status === 'missing' ? l.missing
          : summary.status === 'partial' ? l.partial(done, summary.total)
          : summary.status === 'outdated' ? l.outdated(summary.counts.outdated)
          : summary.status === 'machine' ? l.machine(summary.counts.machine)
          : l.reviewed
        return chip(summary.language, summary.status, detail)
      })}
      {targets.length > 0 && (
        <button
          type="button"
          onClick={() => onSelect('side')}
          data-testid="language-chip-side"
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-gray-200 bg-white text-xs text-gray-600 hover:bg-gray-50 ${view === 'side' ? 'ring-2 ring-primary-500 ring-offset-1' : ''}`}
        >
          <Columns2 className="w-3 h-3" aria-hidden />
          {l.sideBySide}
        </button>
      )}
    </div>
  )
}

const DAY_STYLE: Record<DayTranslationStatus, string> = {
  missing: 'bg-red-50 text-red-700 border-red-200',
  machine: 'bg-blue-50 text-blue-700 border-blue-200',
  reviewed: 'bg-green-50 text-green-700 border-green-200',
  outdated: 'bg-amber-50 text-amber-800 border-amber-300',
  translated: 'bg-gray-50 text-gray-600 border-gray-200',
}

/** The status of one day in one target language, for the day cards. */
export function DayLanguageChip({ language, status }: { language: Language; status: DayTranslationStatus }) {
  const l = useUiLabels().languages
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${DAY_STYLE[status] ?? DAY_STYLE.translated}`}
      data-testid={`day-language-${language}`}
    >
      {LANGUAGE_NAMES[language]} · {l.day[status] ?? status}
    </span>
  )
}
