'use client'

import { useMemo } from 'react'
import { Check, Plus } from 'lucide-react'
import { useUiLabels } from '../labels.js'
import {
  coverageGrid,
  type CoverageAssignment,
  type CoverageDay,
  type CoverageType,
} from '../lib/coverage.js'

interface CoverageGridProps {
  days: CoverageDay[]
  /** The trip's assignments; null while they load. */
  assignments: CoverageAssignment[] | null
  /** The assignments could not be loaded. */
  failed?: boolean
  /** Open the app's assignment panel on a type (a missing cell's "Assign"). */
  onAssign?: (type: CoverageType) => void
}

/**
 * Days across, resource types down: what each day's services ask for and
 * whether it is assigned (lib/coverage.ts). The app loads the assignments
 * and owns the panel that makes them.
 */
export function CoverageGrid({ days, assignments, failed = false, onAssign }: CoverageGridProps) {
  const l = useUiLabels().coverage
  const dateLocale = useUiLabels().dateLocale
  const grid = useMemo(() => coverageGrid(days, assignments ?? []), [days, assignments])

  const label = l.types

  const missing = grid.needed - grid.covered

  return (
    <section className="bg-white rounded-lg border border-gray-200 shadow-sm" data-testid="coverage-grid">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3 pb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{l.title}</h3>
          <p className="text-xs text-gray-600">{l.subtitle}</p>
        </div>
        {assignments !== null && grid.needed > 0 && (
          <span
            className={`px-2 py-0.5 rounded border text-xs font-medium ${missing === 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}
            data-testid="coverage-summary"
          >
            {l.summary(grid.covered, grid.needed)}
          </span>
        )}
      </div>

      {failed ? (
        <p className="px-4 pb-4 text-sm text-red-700">{l.loadFailed}</p>
      ) : assignments === null ? (
        <div className="px-4 pb-4"><div className="h-24 bg-gray-100 rounded animate-pulse" /></div>
      ) : grid.rows.length === 0 ? (
        <p className="px-4 pb-4 text-sm text-gray-500">{l.nothingNeeded}</p>
      ) : (
        <div className="overflow-x-auto px-4 pb-3">
          <table className="w-full border-separate border-spacing-0.5 text-xs">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white text-left font-medium text-gray-500 pr-2 py-1 min-w-[9rem]" />
                {days.map(d => (
                  <th key={d.id} className="font-medium text-gray-500 px-1 py-1 min-w-[5.5rem]">
                    <div>{l.day(d.day_number)}</div>
                    <div className="font-normal text-gray-400">
                      {new Date(d.date).toLocaleDateString(dateLocale, { month: 'short', day: 'numeric' })}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.rows.map(row => (
                <tr key={row.type} data-testid={`coverage-row-${row.type}`}>
                  <th scope="row" className="sticky left-0 bg-white text-left font-medium text-gray-800 pr-2 py-1 whitespace-nowrap">
                    {label[row.type]}
                    {row.needed > 0 && <span className="ml-1 font-normal text-gray-400">{row.covered}/{row.needed}</span>}
                  </th>
                  {row.cells.map(cell => (
                    <td key={cell.dayId} className="p-0 align-top" data-state={cell.state}>
                      {cell.state === 'covered' || cell.state === 'extra' ? (
                        <div
                          className={`h-full rounded px-1.5 py-1 ${cell.state === 'covered' ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'}`}
                          title={cell.state === 'extra' ? l.extraHint : cell.assigned.join(', ')}
                        >
                          <span className="flex items-center gap-1">
                            {cell.state === 'covered' && <Check className="w-3 h-3 shrink-0" aria-hidden />}
                            <span className="truncate max-w-[6.5rem]">{cell.assigned[0]}</span>
                          </span>
                          {cell.assigned.length > 1 && <span className="text-[10px] opacity-70">+{cell.assigned.length - 1}</span>}
                        </div>
                      ) : cell.state === 'missing' ? (
                        <button
                          type="button"
                          onClick={() => onAssign?.(row.type)}
                          className="w-full rounded border border-dashed border-red-300 bg-red-50 px-1.5 py-1 text-left text-red-700 hover:bg-red-100"
                        >
                          <span className="flex items-center gap-1"><Plus className="w-3 h-3" aria-hidden />{l.assign}</span>
                        </button>
                      ) : (
                        <div className="rounded px-1.5 py-1 text-gray-300">—</div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
