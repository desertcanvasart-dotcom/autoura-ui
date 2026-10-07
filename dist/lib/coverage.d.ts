export declare const COVERAGE_TYPES: readonly ["guide", "vehicle", "hotel", "cruise", "restaurant", "airport_staff", "hotel_staff"];
export type CoverageType = typeof COVERAGE_TYPES[number];
export type CoverageState = 'covered' | 'missing' | 'extra' | 'none';
export interface CoverageDay {
    id: string;
    day_number: number;
    date: string;
    services: Array<{
        service_type?: string | null;
    }>;
}
export interface CoverageAssignment {
    resource_type: string;
    resource_name: string;
    start_date: string;
    end_date?: string | null;
    itinerary_day_id?: string | null;
    status?: string | null;
}
export interface CoverageCell {
    dayId: string;
    needed: boolean;
    assigned: string[];
    state: CoverageState;
}
export interface CoverageRow {
    type: CoverageType;
    cells: CoverageCell[];
    needed: number;
    covered: number;
}
export interface Coverage {
    rows: CoverageRow[];
    needed: number;
    covered: number;
}
/** What one day's lines ask for. Meals on a cruise day are eaten on board. */
export declare function dayNeeds(services: CoverageDay['services']): Set<CoverageType>;
/** Whether an assignment is in force on a day. */
export declare function assignmentCovers(a: CoverageAssignment, day: Pick<CoverageDay, 'id' | 'date'>): boolean;
export declare function coverageGrid(days: CoverageDay[], assignments: CoverageAssignment[]): Coverage;
