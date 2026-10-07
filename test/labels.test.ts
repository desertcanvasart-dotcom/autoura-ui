// Every attention item has wording in every shipped language, and the two
// sets have the same shape — a key added to one and forgotten in the other
// fails here, not on a Japanese operator's screen.
import { describe, it, expect } from 'vitest'
import { enLabels, jaLabels, type AttentionItem } from '../src/index.js'

const CODES: AttentionItem['code'][] = [
  'clientLanguageMissing', 'clientLanguageUnreviewed', 'languageOutdated', 'placeholders',
  'tipsConflict', 'invoicedWithoutBooking', 'overnightWithoutStay',
]

const shape = (o: unknown): unknown =>
  o && typeof o === 'object'
    ? Object.fromEntries(Object.entries(o).sort().map(([k, v]) => [k, shape(v)]))
    : typeof o

describe('label sets', () => {
  it.each([['en', enLabels], ['ja', jaLabels]] as const)('%s words every attention item', (_, labels) => {
    for (const code of CODES) {
      const item: AttentionItem = { key: code, code, severity: 'high', params: { missing: 2, total: 8, count: 3, days: '1, 4', samples: 'XX', included: 'a', excluded: 'b' } }
      const text = labels.attention.message(item, 'X')
      expect(text, code).toBeTruthy()
      expect(text, code).not.toContain('undefined')
    }
  })

  it('English and Japanese have the same keys', () => {
    expect(shape(jaLabels)).toEqual(shape(enLabels))
  })
})
