import { type ReactNode } from 'react';
import type { CoverageType } from './lib/coverage.js';
import type { AttentionItem } from './lib/attention.js';
import type { PipelineStep } from './lib/pipeline.js';
import type { DayTranslationStatus } from './lib/content-language.js';
type N = number;
export interface UiLabels {
    /** BCP 47 tag for dates in the components. */
    dateLocale: string;
    pipeline: Record<PipelineStep, string> & {
        cancelled: string;
    };
    attention: {
        title: (count: N) => string;
        open: string;
        /** `language` is the language's display name, already resolved. */
        message: (item: AttentionItem, language: string) => string;
    };
    languages: {
        source: string;
        missing: string;
        partial: (done: N, total: N) => string;
        outdated: (count: N) => string;
        machine: (count: N) => string;
        reviewed: string;
        clientLanguage: string;
        clientReadsThis: string;
        sideBySide: string;
        day: Record<DayTranslationStatus, string>;
        titlePlaceholder: string;
        descriptionPlaceholder: string;
        translateThisDay: string;
        translateFailed: string;
        saveFailed: string;
        saveReviewed: string;
        markReviewed: string;
        placeholdersInText: (samples: string) => string;
    };
    coverage: {
        title: string;
        subtitle: string;
        summary: (covered: N, needed: N) => string;
        day: (number: N) => string;
        assign: string;
        extraHint: string;
        nothingNeeded: string;
        loadFailed: string;
        types: Record<CoverageType, string>;
    };
}
export declare const enLabels: UiLabels;
export declare const jaLabels: UiLabels;
export declare const LABEL_SETS: {
    readonly en: UiLabels;
    readonly ja: UiLabels;
};
/** Wrap a page to give the components its wording. */
export declare function UiLabelsProvider({ labels, children }: {
    labels: UiLabels;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useUiLabels(): UiLabels;
export {};
