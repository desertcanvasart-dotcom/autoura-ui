// A trip's life from quote to paid, for the itinerary page header.
export const PIPELINE_STEPS = ['quote', 'sent', 'confirmed', 'booked', 'invoiced', 'paid'];
/**
 * Which steps of the trip's life are done. Each is read off its own record,
 * not inferred from the ones before it — so a trip invoiced before it was
 * booked shows exactly that, a gap in the line, instead of a tidy lie.
 */
export function pipelineSteps(input) {
    const s = input.status;
    const confirmed = s === 'confirmed' || s === 'completed';
    return {
        quote: true,
        sent: confirmed || s === 'sent',
        confirmed,
        booked: input.hasBooking,
        invoiced: input.hasInvoice,
        paid: input.invoicePaid,
    };
}
