import { type Language } from './languages.js';
/**
 * The language the canonical text is written in.
 *
 * Counted, not "any Japanese character": English day text routinely carries a
 * hotel's Japanese name or a 【】 bracket, and Japanese text carries flight
 * numbers and hotel names in Latin. A Japanese character carries a word's
 * worth of meaning where a Latin letter carries a fraction of one, so each
 * counts three times — enough that a Japanese paragraph with a few English
 * names stays Japanese, and an English one with a bracket stays English.
 *
 * Returns null when there is no text to judge.
 */
export declare function detectContentLanguage(texts: Array<string | null | undefined>): Language | null;
/**
 * clients.preferred_language is free text (the WhatsApp parser writes
 * "English", the CRM form writes a code, people type 日本語). Only the
 * languages this app can produce content in are recognised; anything else is
 * "unknown", not a guess.
 */
export declare function normalizeClientLanguage(value: string | null | undefined): Language | null;
/** The languages content can be translated into, given the source. */
export declare function targetLanguages(source: Language): Language[];
export interface DayText {
    title: string | null;
    description: string | null;
    city: string | null;
    overnight_city: string | null;
}
/**
 * A version row laid over the canonical day, field by field — the same merge
 * the days API applies, so the text hashed here is the text the page shows.
 */
export declare function mergeDayText(canonical: DayText, version?: Partial<DayText> | null): DayText;
/**
 * Fingerprint of a day's source text, stamped on a translation when it is
 * made. When the source is edited afterwards the fingerprint no longer
 * matches and the translation is outdated. FNV-1a: tiny, identical in the
 * browser and on the server, and collisions only cost a missed "outdated".
 * Whitespace at the ends is not an edit.
 */
export declare function dayTextHash(day: DayText): string;
/**
 * - missing:    no text in this language
 * - machine:    AI-translated, nobody has read it
 * - reviewed:   saved by a person
 * - outdated:   the source changed after this was translated
 * - translated: made before translations were tracked; provenance unknown
 */
export type DayTranslationStatus = 'missing' | 'machine' | 'reviewed' | 'outdated' | 'translated';
export interface DayVersionRow extends Partial<DayText> {
    status?: string | null;
    source_hash?: string | null;
}
export declare function dayTranslationStatus(source: DayText, target: DayVersionRow | null | undefined): DayTranslationStatus;
export type LanguageStatus = 'source' | 'missing' | 'outdated' | 'machine' | 'reviewed' | 'partial';
export interface LanguageSummary {
    language: Language;
    status: LanguageStatus;
    counts: Record<DayTranslationStatus, number>;
    total: number;
}
/**
 * One language's state across the trip, worst first: a single outdated day
 * makes the language outdated, because that is the day a client would read
 * wrong. "partial" is some days present, some missing.
 */
export declare function summarizeLanguage(language: Language, statuses: DayTranslationStatus[]): LanguageSummary;
export interface Placeholder {
    match: string;
    kind: 'time' | 'xx' | 'tbd' | 'bracket';
}
/** Template residue that must not reach a client document. */
export declare function findPlaceholders(text: string | null | undefined): Placeholder[];
/**
 * Tips included in one list and excluded in the other.
 *
 * Driver and porter tips "included" beside guide gratuities "excluded" can be
 * deliberate — but it is the line a client disputes at the end of a trip, so
 * it is shown to the person writing the lists rather than left to the client.
 */
export declare function tipsConflict(inclusions: string[] | null | undefined, exclusions: string[] | null | undefined): {
    included: string[];
    excluded: string[];
} | null;
/**
 * "NMS803-CR-ABS — 8 days: Nile Cruise…" → the code and the title apart.
 *
 * Programme codes are pasted into trip names because that is how the office
 * finds them, but the trip name is client copy and is translated. Shown apart,
 * the title reads as a title and the code as the internal reference it is.
 * Only a leading run of capitals and digits with at least one hyphen followed
 * by a dash or colon counts — "Cairo — 3 days" is a title.
 */
export declare function splitTourCode(tripName: string | null | undefined): {
    code: string | null;
    title: string;
};
