import type { AttentionItem } from '../lib/attention.js';
interface AttentionStripProps {
    items: AttentionItem[];
    /** Open what the item is about (its language, its days). */
    onOpen?: (item: AttentionItem) => void;
}
/**
 * What is wrong with this trip, one line each, worst first
 * (lib/attention.ts). Nothing here blocks anything; it is the list of things
 * to look at before sending.
 */
export declare function AttentionStrip({ items, onOpen }: AttentionStripProps): import("react").JSX.Element | null;
export {};
