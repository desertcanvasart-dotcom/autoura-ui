'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Check, Languages, Loader2 } from 'lucide-react';
import { useUiLabels } from '../labels.js';
import { LANGUAGE_NAMES } from '../lib/languages.js';
import { findPlaceholders } from '../lib/content-language.js';
import { DayLanguageChip } from './LanguageStatusRow.js';
/** Text with template residue marked, so it is seen where it sits. */
export function HighlightPlaceholders({ text }) {
    if (!text)
        return null;
    const matches = [...new Set(findPlaceholders(text).map(p => p.match))];
    if (matches.length === 0)
        return _jsx(_Fragment, { children: text });
    const escaped = matches.map(m => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'g'));
    return (_jsx(_Fragment, { children: parts.map((part, i) => matches.includes(part)
            ? _jsx("mark", { className: "bg-red-100 text-red-800 rounded px-0.5", "data-testid": "placeholder-mark", children: part }, i)
            : _jsx("span", { children: part }, i)) }));
}
/**
 * One day, source and one target side by side.
 *
 * The source column is read-only — it is the itinerary, edited in the
 * itinerary editor. The target column is the translation: translate it, or
 * write it, and save. Saving is the review.
 */
export function BilingualDayEditor({ sourceLanguage, targetLanguage, source, target, status, onTranslate, onSave, }) {
    const l = useUiLabels().languages;
    const [title, setTitle] = useState(target?.title ?? '');
    const [description, setDescription] = useState(target?.description ?? '');
    const [busy, setBusy] = useState(null);
    const [error, setError] = useState(null);
    // A reload after translating replaces the text under the fields.
    useEffect(() => {
        setTitle(target?.title ?? '');
        setDescription(target?.description ?? '');
    }, [target?.title, target?.description]);
    const dirty = title !== (target?.title ?? '') || description !== (target?.description ?? '');
    const run = async (kind, fallback, action) => {
        setBusy(kind);
        setError(null);
        try {
            await action();
        }
        catch (e) {
            setError(e instanceof Error && e.message ? e.message : fallback);
        }
        finally {
            setBusy(null);
        }
    };
    const targetPlaceholders = findPlaceholders(`${title}\n${description}`);
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", "data-testid": "bilingual-day", children: [_jsxs("div", { className: "rounded-md border border-gray-200 bg-gray-50 p-3", children: [_jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5", children: [LANGUAGE_NAMES[sourceLanguage], " \u00B7 ", l.source] }), _jsx("p", { className: "text-sm font-semibold text-gray-900 mb-1", children: _jsx(HighlightPlaceholders, { text: source.title }) }), _jsx("p", { className: "text-sm text-gray-700 whitespace-pre-line", children: _jsx(HighlightPlaceholders, { text: source.description }) })] }), _jsxs("div", { className: "rounded-md border border-gray-200 bg-white p-3", children: [_jsxs("div", { className: "flex items-center justify-between gap-2 mb-1.5", children: [_jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-gray-500", children: LANGUAGE_NAMES[targetLanguage] }), _jsx(DayLanguageChip, { language: targetLanguage, status: status })] }), _jsx("input", { type: "text", value: title, onChange: e => setTitle(e.target.value), placeholder: l.titlePlaceholder, className: "w-full mb-2 px-2 py-1 text-sm font-semibold border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" }), _jsx("textarea", { value: description, onChange: e => setDescription(e.target.value), placeholder: l.descriptionPlaceholder, rows: 4, className: "w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-primary-500" }), targetPlaceholders.length > 0 && (_jsx("p", { className: "mt-1 text-xs text-red-700", children: l.placeholdersInText([...new Set(targetPlaceholders.map(p => p.match))].join('  ')) })), error && _jsx("p", { className: "mt-1 text-xs text-red-700", children: error }), _jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [_jsxs("button", { type: "button", onClick: () => run('translate', l.translateFailed, onTranslate), disabled: busy !== null, className: "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50", children: [busy === 'translate' ? _jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }) : _jsx(Languages, { className: "w-3.5 h-3.5" }), l.translateThisDay] }), (dirty || status === 'machine' || status === 'outdated' || status === 'translated') && (title || description) && (_jsxs("button", { type: "button", onClick: () => run('save', l.saveFailed, () => onSave({ title, description })), disabled: busy !== null, className: "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50", children: [busy === 'save' ? _jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }) : _jsx(Check, { className: "w-3.5 h-3.5" }), dirty ? l.saveReviewed : l.markReviewed] }))] })] })] }));
}
