// Client components and their wording. No 'use client' here: Next.js refuses
// `export *` in a client boundary, and each component file declares its own.
// The logic they run on is also here
// for convenience; server code imports it from '@autoura/ui/lib' instead.
export * from './lib/index.js'
export * from './labels.js'
export { StatusPipeline } from './components/StatusPipeline.js'
export { AttentionStrip } from './components/AttentionStrip.js'
export { RailSection, RailGroup, DocRow, RAIL_ACTION } from './components/RailSection.js'
export { CoverageGrid } from './components/CoverageGrid.js'
export { LanguageStatusRow, DayLanguageChip, type ContentView } from './components/LanguageStatusRow.js'
export { BilingualDayEditor, HighlightPlaceholders } from './components/BilingualDayEditor.js'
