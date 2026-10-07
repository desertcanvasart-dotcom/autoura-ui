import type { Language } from './languages.js';
import { type DayText, type LanguageSummary } from './content-language.js';
export type AttentionSeverity = 'high' | 'medium' | 'low';
export interface AttentionItem {
    /** Stable per kind (+ language), for React keys and tests. */
    key: string;
    code: 'clientLanguageMissing' | 'languageOutdated' | 'clientLanguageUnreviewed' | 'placeholders' | 'tipsConflict' | 'invoicedWithoutBooking' | 'overnightWithoutStay';
    severity: AttentionSeverity;
    params: Record<string, string | number>;
    /** The language the item is about, when it is about one. */
    language?: Language;
    /** Day numbers the item points at, for the "Day 1, 3" list and jump links. */
    days?: number[];
}
export interface AttentionDay {
    day_number: number;
    /** Source text (canonical, as shown in the source language). */
    source: DayText;
    /** Target text per language, when it exists. */
    targets?: Partial<Record<Language, DayText | null>>;
    services: Array<{
        service_type?: string | null;
    }>;
    /** itinerary_days flags: false means the night is not spent in a bed we
     *  book (a flight, a home day trip). */
    hotel_included?: boolean | null;
    overnight?: boolean | null;
}
export interface AttentionInput {
    status: string;
    sourceLanguage: Language;
    clientLanguage: Language | null;
    languages: LanguageSummary[];
    days: AttentionDay[];
    inclusions: Partial<Record<Language, {
        inclusions: string[];
        exclusions: string[];
    }>>;
    hasInvoice: boolean;
    hasBooking: boolean;
}
export declare function itineraryAttention(input: AttentionInput): AttentionItem[];
