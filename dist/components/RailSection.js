'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** A card in the itinerary page's right rail. */
export function RailSection({ title, children, testId }) {
    return (_jsxs("section", { className: "bg-white rounded-lg border border-gray-200 shadow-sm", "data-testid": testId, children: [_jsx("h2", { className: "px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500", children: title }), _jsx("div", { className: "px-4 pb-3", children: children })] }));
}
/** A sub-heading inside a rail card ("For the client", "Internal"). */
export function RailGroup({ title, children }) {
    return (_jsxs("div", { className: "mt-1 first:mt-0", children: [_jsx("p", { className: "text-[11px] font-medium text-gray-400 mb-1", children: title }), _jsx("ul", { className: "divide-y divide-gray-100", children: children })] }));
}
/** One document: its name on the left, what can be done with it on the right. */
export function DocRow({ label, hint, children }) {
    return (_jsxs("li", { className: "flex items-center justify-between gap-2 py-1.5", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm text-gray-800 truncate", children: label }), hint && _jsx("p", { className: "text-[11px] text-gray-400 truncate", children: hint })] }), _jsx("div", { className: "flex items-center gap-1.5 shrink-0 text-xs", children: children })] }));
}
/** The link style every rail action shares. */
export const RAIL_ACTION = 'inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium text-primary-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed';
