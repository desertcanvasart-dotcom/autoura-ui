export interface PipelineInput {
    status: string;
    hasBooking: boolean;
    hasInvoice: boolean;
    invoicePaid: boolean;
}
export type PipelineStep = 'quote' | 'sent' | 'confirmed' | 'booked' | 'invoiced' | 'paid';
export declare const PIPELINE_STEPS: PipelineStep[];
/**
 * Which steps of the trip's life are done. Each is read off its own record,
 * not inferred from the ones before it — so a trip invoiced before it was
 * booked shows exactly that, a gap in the line, instead of a tidy lie.
 */
export declare function pipelineSteps(input: PipelineInput): Record<PipelineStep, boolean>;
