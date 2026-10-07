import { type Language } from '../lib/languages.js';
import type { DayTranslationStatus, LanguageSummary } from '../lib/content-language.js';
export type ContentView = Language | 'side';
interface LanguageStatusRowProps {
    sourceLanguage: Language;
    targets: LanguageSummary[];
    clientLanguage: Language | null;
    view: ContentView;
    onSelect: (view: ContentView) => void;
}
/**
 * The trip's content languages: which one is the source and what state every
 * other one is in. Each chip opens that language; "Side by side" opens source
 * and target together.
 *
 * Content language only — the staff UI language is the app's own switch and
 * never follows the itinerary.
 */
export declare function LanguageStatusRow({ sourceLanguage, targets, clientLanguage, view, onSelect }: LanguageStatusRowProps): import("react").JSX.Element;
/** The status of one day in one target language, for the day cards. */
export declare function DayLanguageChip({ language, status }: {
    language: Language;
    status: DayTranslationStatus;
}): import("react").JSX.Element;
export {};
