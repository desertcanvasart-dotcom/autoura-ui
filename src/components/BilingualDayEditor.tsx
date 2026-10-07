'use client'

import { useEffect, useState } from 'react'
import { Check, Languages, Loader2 } from 'lucide-react'
import { useUiLabels } from '../labels.js'
import { LANGUAGE_NAMES, type Language } from '../lib/languages.js'
import { findPlaceholders, type DayText, type DayTranslationStatus } from '../lib/content-language.js'
import { DayLanguageChip } from './LanguageStatusRow.js'

interface BilingualDayEditorProps {
  sourceLanguage: Language
  targetLanguage: Language
  source: DayText
  target: DayText | null
  status: DayTranslationStatus
  /** Machine-translate this day; resolve once the new text is loaded. */
  onTranslate: () => Promise<void>
  /** Save a person's text as reviewed; resolve once it is loaded. */
  onSave: (text: { title: string; description: string }) => Promise<void>
}

/** Text with template residue marked, so it is seen where it sits. */
export function HighlightPlaceholders({ text }: { text: string | null | undefined }) {
  if (!text) return null
  const matches = [...new Set(findPlaceholders(text).map(p => p.match))]
  if (matches.length === 0) return <>{text}</>
  const escaped = matches.map(m => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'))
  return (
    <>
      {parts.map((part, i) =>
        matches.includes(part)
          ? <mark key={i} className="bg-red-100 text-red-800 rounded px-0.5" data-testid="placeholder-mark">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

/**
 * One day, source and one target side by side.
 *
 * The source column is read-only — it is the itinerary, edited in the
 * itinerary editor. The target column is the translation: translate it, or
 * write it, and save. Saving is the review.
 */
export function BilingualDayEditor({
  sourceLanguage,
  targetLanguage,
  source,
  target,
  status,
  onTranslate,
  onSave,
}: BilingualDayEditorProps) {
  const l = useUiLabels().languages
  const [title, setTitle] = useState(target?.title ?? '')
  const [description, setDescription] = useState(target?.description ?? '')
  const [busy, setBusy] = useState<'translate' | 'save' | null>(null)
  const [error, setError] = useState<string | null>(null)

  // A reload after translating replaces the text under the fields.
  useEffect(() => {
    setTitle(target?.title ?? '')
    setDescription(target?.description ?? '')
  }, [target?.title, target?.description])

  const dirty = title !== (target?.title ?? '') || description !== (target?.description ?? '')

  const run = async (kind: 'translate' | 'save', fallback: string, action: () => Promise<void>) => {
    setBusy(kind)
    setError(null)
    try {
      await action()
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : fallback)
    } finally {
      setBusy(null)
    }
  }

  const targetPlaceholders = findPlaceholders(`${title}\n${description}`)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" data-testid="bilingual-day">
      {/* Source — read only */}
      <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          {LANGUAGE_NAMES[sourceLanguage]} · {l.source}
        </p>
        <p className="text-sm font-semibold text-gray-900 mb-1"><HighlightPlaceholders text={source.title} /></p>
        <p className="text-sm text-gray-700 whitespace-pre-line"><HighlightPlaceholders text={source.description} /></p>
      </div>

      {/* Target — editable */}
      <div className="rounded-md border border-gray-200 bg-white p-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{LANGUAGE_NAMES[targetLanguage]}</p>
          <DayLanguageChip language={targetLanguage} status={status} />
        </div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder={l.titlePlaceholder}
          className="w-full mb-2 px-2 py-1 text-sm font-semibold border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder={l.descriptionPlaceholder}
          rows={4}
          className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {targetPlaceholders.length > 0 && (
          <p className="mt-1 text-xs text-red-700">
            {l.placeholdersInText([...new Set(targetPlaceholders.map(p => p.match))].join('  '))}
          </p>
        )}
        {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => run('translate', l.translateFailed, onTranslate)}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {busy === 'translate' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
            {l.translateThisDay}
          </button>
          {(dirty || status === 'machine' || status === 'outdated' || status === 'translated') && (title || description) && (
            <button
              type="button"
              onClick={() => run('save', l.saveFailed, () => onSave({ title, description }))}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {busy === 'save' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              {dirty ? l.saveReviewed : l.markReviewed}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
