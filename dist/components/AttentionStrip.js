'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, Info } from 'lucide-react';
import { useUiLabels } from '../labels.js';
import { LANGUAGE_NAMES } from '../lib/languages.js';
const SEVERITY_STYLE = {
    high: 'border-red-200 bg-red-50 text-red-900',
    medium: 'border-amber-200 bg-amber-50 text-amber-900',
    low: 'border-blue-200 bg-blue-50 text-blue-900',
};
/**
 * What is wrong with this trip, one line each, worst first
 * (lib/attention.ts). Nothing here blocks anything; it is the list of things
 * to look at before sending.
 */
export function AttentionStrip({ items, onOpen }) {
    const l = useUiLabels().attention;
    if (items.length === 0)
        return null;
    return (_jsxs("section", { className: "rounded-lg border border-gray-200 bg-white shadow-sm p-3", "data-testid": "needs-attention", children: [_jsx("h2", { className: "text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2", children: l.title(items.length) }), _jsx("ul", { className: "space-y-1.5", children: items.map(item => {
                    const Icon = item.severity === 'low' ? Info : AlertTriangle;
                    const actionable = onOpen && (item.language || item.days);
                    return (_jsxs("li", { "data-testid": `attention-${item.code}`, className: `flex items-start gap-2 rounded border px-2.5 py-1.5 text-sm ${SEVERITY_STYLE[item.severity]}`, children: [_jsx(Icon, { className: "w-4 h-4 mt-0.5 shrink-0", "aria-hidden": true }), _jsx("span", { className: "flex-1", children: l.message(item, item.language ? LANGUAGE_NAMES[item.language] : '') }), actionable && (_jsx("button", { type: "button", onClick: () => onOpen(item), className: "shrink-0 text-xs font-medium underline underline-offset-2 hover:no-underline", children: l.open }))] }, item.key));
                }) })] }));
}
