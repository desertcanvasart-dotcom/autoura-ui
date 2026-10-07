import { type CoverageAssignment, type CoverageDay, type CoverageType } from '../lib/coverage.js';
interface CoverageGridProps {
    days: CoverageDay[];
    /** The trip's assignments; null while they load. */
    assignments: CoverageAssignment[] | null;
    /** The assignments could not be loaded. */
    failed?: boolean;
    /** Open the app's assignment panel on a type (a missing cell's "Assign"). */
    onAssign?: (type: CoverageType) => void;
}
/**
 * Days across, resource types down: what each day's services ask for and
 * whether it is assigned (lib/coverage.ts). The app loads the assignments
 * and owns the panel that makes them.
 */
export declare function CoverageGrid({ days, assignments, failed, onAssign }: CoverageGridProps): import("react").JSX.Element;
export {};
