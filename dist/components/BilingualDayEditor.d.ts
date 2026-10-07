import { type Language } from '../lib/languages.js';
import { type DayText, type DayTranslationStatus } from '../lib/content-language.js';
interface BilingualDayEditorProps {
    sourceLanguage: Language;
    targetLanguage: Language;
    source: DayText;
    target: DayText | null;
    status: DayTranslationStatus;
    /** Machine-translate this day; resolve once the new text is loaded. */
    onTranslate: () => Promise<void>;
    /** Save a person's text as reviewed; resolve once it is loaded. */
    onSave: (text: {
        title: string;
        description: string;
    }) => Promise<void>;
}
/** Text with template residue marked, so it is seen where it sits. */
export declare function HighlightPlaceholders({ text }: {
    text: string | null | undefined;
}): import("react").JSX.Element | null;
/**
 * One day, source and one target side by side.
 *
 * The source column is read-only — it is the itinerary, edited in the
 * itinerary editor. The target column is the translation: translate it, or
 * write it, and save. Saving is the review.
 */
export declare function BilingualDayEditor({ sourceLanguage, targetLanguage, source, target, status, onTranslate, onSave, }: BilingualDayEditorProps): import("react").JSX.Element;
export {};
