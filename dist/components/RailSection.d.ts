import type { ReactNode } from 'react';
/** A card in the itinerary page's right rail. */
export declare function RailSection({ title, children, testId }: {
    title: string;
    children: ReactNode;
    testId?: string;
}): import("react").JSX.Element;
/** A sub-heading inside a rail card ("For the client", "Internal"). */
export declare function RailGroup({ title, children }: {
    title: string;
    children: ReactNode;
}): import("react").JSX.Element;
/** One document: its name on the left, what can be done with it on the right. */
export declare function DocRow({ label, hint, children }: {
    label: ReactNode;
    hint?: string;
    children: ReactNode;
}): import("react").JSX.Element;
/** The link style every rail action shares. */
export declare const RAIL_ACTION = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium text-primary-700 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed";
