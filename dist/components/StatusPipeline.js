'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { useUiLabels } from '../labels.js';
import { PIPELINE_STEPS, pipelineSteps } from '../lib/pipeline.js';
/** The trip's progress from quote to paid, one line under the title. */
export function StatusPipeline(props) {
    const l = useUiLabels().pipeline;
    if (props.status === 'cancelled') {
        return (_jsx("span", { className: "inline-flex px-2 py-0.5 rounded border border-red-200 bg-red-50 text-xs font-medium text-red-700", children: l.cancelled }));
    }
    const done = pipelineSteps(props);
    // The first step not done is where the trip is now.
    const current = PIPELINE_STEPS.find(step => !done[step]);
    return (_jsx("ol", { className: "flex flex-wrap items-center gap-1 text-xs", "data-testid": "status-pipeline", children: PIPELINE_STEPS.map((step, i) => (_jsxs("li", { className: "flex items-center gap-1", children: [i > 0 && _jsx("span", { className: `h-px w-3 ${done[step] ? 'bg-green-400' : 'bg-gray-300'}`, "aria-hidden": true }), _jsxs("span", { "data-done": done[step], className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${done[step]
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : step === current
                            ? 'border-primary-300 bg-white text-primary-700 font-medium'
                            : 'border-gray-200 bg-white text-gray-400'}`, children: [done[step] && _jsx(Check, { className: "w-3 h-3", "aria-hidden": true }), l[step]] })] }, step))) }));
}
