# @autoura/ui

The itinerary page's shared pieces, used by **travel-ops-pro** and **autoura-saas**:

| Import | What |
|---|---|
| `StatusPipeline` | quote → sent → confirmed → booked → invoiced → paid, each step read off its own record |
| `AttentionStrip` | the trip's "Needs attention" list, from `itineraryAttention()` |
| `RailSection`, `RailGroup`, `DocRow`, `RAIL_ACTION` | the right rail and its documents list |
| `CoverageGrid` | days × resource types: what each day's services need and what is assigned |
| `LanguageStatusRow`, `DayLanguageChip`, `BilingualDayEditor`, `HighlightPlaceholders` | the language layer (multilingual app) |

The logic is in `@autoura/ui/lib`, with no React, so API routes can import it:
`detectContentLanguage`, `dayTextHash`, `dayTranslationStatus`, `summarizeLanguage`,
`findPlaceholders`, `tipsConflict`, `splitTourCode`, `itineraryAttention`, `coverageGrid`,
`pipelineSteps`.

## Install

A git dependency pinned to a release. The repo is public, so no token is needed, and
npm fetches it over HTTPS. Pin a tag (`#v0.1.0`) or, for one that can never move, the
release commit:

```json
"@autoura/ui": "github:desertcanvasart-dotcom/autoura-ui#66fffef0aa408fe8e6e4cc28038ae0ff5b6d5e59"
```

| Version | Commit |
|---|---|
| 0.1.0 | `66fffef0aa408fe8e6e4cc28038ae0ff5b6d5e59` |

`dist/` is committed, so installing runs no build. Then:

- **Tailwind** must see the classes: add `./node_modules/@autoura/ui/dist/**/*.js` to `content`.
- **Peer dependencies**: `react` and `lucide-react`. The apps already have both.
- **Primary colour**: components use `primary-*`, which both apps define.

## Wording

The components don't depend on an i18n library. They read their labels from context.
English is the default; wrap a page to change it:

```tsx
import { UiLabelsProvider, LABEL_SETS } from '@autoura/ui'

<UiLabelsProvider labels={LABEL_SETS[locale]}>…</UiLabelsProvider>
```

Override single entries by spreading a set:
`{ ...enLabels, coverage: { ...enLabels.coverage, title: 'Staffing' } }`.

## Data

Components don't fetch. The app loads data and passes it in, and wires callbacks
(`CoverageGrid.onAssign`, `BilingualDayEditor.onTranslate` / `onSave`) to its own API.

## Releasing

1. Change `src/`, run `npm run typecheck && npm test && npm run build`, and commit `dist/` with it.
   CI fails if `dist/` doesn't match `src/`.
2. Bump `version`, tag `vX.Y.Z`, push the tag, and add the commit to the table above.
3. In each app, point `package.json` at the new tag or commit and run `npm install`.
