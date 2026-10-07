'use client';
import { jsx as _jsx } from "react/jsx-runtime";
// ============================================
// The words the components say
// ============================================
// The two apps translate differently — travel-ops-pro through next-intl, the
// multi-tenant app not at all — so the package carries its own wording, in
// English and Japanese, and takes it through context. Without a provider the
// components speak English. An app can pass a whole set, or override a few
// entries with its own (`labels={{ ...enLabels, coverage: { ...enLabels.coverage, title: 'Staffing' } }}`).
import { createContext, useContext } from 'react';
const p = (item, key) => item.params[key];
export const enLabels = {
    dateLocale: 'en-US',
    pipeline: {
        quote: 'Quote', sent: 'Sent', confirmed: 'Confirmed', booked: 'Booked', invoiced: 'Invoiced', paid: 'Paid',
        cancelled: 'Cancelled',
    },
    attention: {
        title: count => `Needs attention (${count})`,
        open: 'Open',
        message: (item, language) => {
            switch (item.code) {
                case 'clientLanguageMissing':
                    return `The client reads ${language}, and ${p(item, 'missing')} of ${p(item, 'total')} days have no ${language} text.`;
                case 'clientLanguageUnreviewed':
                    return `${p(item, 'count')} ${language} days were machine-translated and nobody has reviewed them.`;
                case 'languageOutdated':
                    return `${p(item, 'count')} ${language} days are outdated: the source text changed after they were translated.`;
                case 'placeholders':
                    return `Unfilled placeholders in client text on day ${p(item, 'days')}: ${p(item, 'samples')}`;
                case 'tipsConflict':
                    return `Tips are both included (“${p(item, 'included')}”) and excluded (“${p(item, 'excluded')}”). Make sure that is intended.`;
                case 'invoicedWithoutBooking':
                    return 'This trip is invoiced but has no booking yet.';
                case 'overnightWithoutStay':
                    return `No hotel or cruise line on day ${p(item, 'days')}, although the night is spent there. The price is likely incomplete.`;
            }
        },
    },
    languages: {
        source: 'source',
        missing: 'missing',
        partial: (done, total) => `${done}/${total} days`,
        outdated: count => `${count} outdated`,
        machine: count => `machine · ${count} unreviewed`,
        reviewed: 'reviewed',
        clientLanguage: 'client language',
        clientReadsThis: 'The client reads this language',
        sideBySide: 'Side by side',
        day: { missing: 'missing', machine: 'machine', reviewed: 'reviewed', outdated: 'outdated', translated: 'translated' },
        titlePlaceholder: 'Day title',
        descriptionPlaceholder: 'What happens on this day',
        translateThisDay: 'Translate this day',
        translateFailed: 'Translation failed',
        saveFailed: 'Could not save the day',
        saveReviewed: 'Save as reviewed',
        markReviewed: 'Mark reviewed',
        placeholdersInText: samples => `Unfilled placeholders: ${samples}`,
    },
    coverage: {
        title: 'Coverage',
        subtitle: "What each day's services need, and what is assigned",
        summary: (covered, needed) => `${covered} of ${needed} covered`,
        day: number => `Day ${number}`,
        assign: 'Assign',
        extraHint: 'Assigned, though no service on this day asks for it',
        nothingNeeded: 'No service on this trip needs a guide, vehicle, hotel or other resource yet.',
        loadFailed: 'Could not load the assignments.',
        types: {
            guide: 'Guides', vehicle: 'Vehicles', hotel: 'Hotels', cruise: 'Nile Cruises', restaurant: 'Restaurants',
            airport_staff: 'Airport Assistants', hotel_staff: 'Hotel Assistants',
        },
    },
};
export const jaLabels = {
    dateLocale: 'ja-JP',
    pipeline: {
        quote: '見積', sent: '送付済', confirmed: '確定', booked: '予約済', invoiced: '請求済', paid: '入金済',
        cancelled: 'キャンセル',
    },
    attention: {
        title: count => `要対応（${count}）`,
        open: '開く',
        message: (item, language) => {
            switch (item.code) {
                case 'clientLanguageMissing':
                    return `お客様は${language}を読みますが、${p(item, 'total')}日中${p(item, 'missing')}日に${language}のテキストがありません。`;
                case 'clientLanguageUnreviewed':
                    return `${language}の${p(item, 'count')}日は機械翻訳のままで、まだ確認されていません。`;
                case 'languageOutdated':
                    return `${language}の${p(item, 'count')}日が古くなっています（翻訳後に原文が変更されました）。`;
                case 'placeholders':
                    return `お客様向けテキストに未記入のプレースホルダーがあります（${p(item, 'days')}日目）: ${p(item, 'samples')}`;
                case 'tipsConflict':
                    return `チップが含まれる項目（「${p(item, 'included')}」）と含まれない項目（「${p(item, 'excluded')}」）の両方にあります。意図通りか確認してください。`;
                case 'invoicedWithoutBooking':
                    return '請求書は発行済みですが、予約がまだありません。';
                case 'overnightWithoutStay':
                    return `${p(item, 'days')}日目は宿泊がありますが、ホテルまたはクルーズの行がありません。料金が不完全な可能性があります。`;
            }
        },
    },
    languages: {
        source: '原文',
        missing: '未作成',
        partial: (done, total) => `${done}/${total}日`,
        outdated: count => `${count}日が古い`,
        machine: count => `機械翻訳・未確認${count}日`,
        reviewed: '確認済み',
        clientLanguage: 'お客様の言語',
        clientReadsThis: 'お客様はこの言語を読みます',
        sideBySide: '並べて表示',
        day: { missing: '未作成', machine: '機械翻訳', reviewed: '確認済み', outdated: '要更新', translated: '翻訳済み' },
        titlePlaceholder: '日のタイトル',
        descriptionPlaceholder: 'この日の内容',
        translateThisDay: 'この日を翻訳',
        translateFailed: '翻訳に失敗しました',
        saveFailed: '保存できませんでした',
        saveReviewed: '確認済みとして保存',
        markReviewed: '確認済みにする',
        placeholdersInText: samples => `未記入のプレースホルダー: ${samples}`,
    },
    coverage: {
        title: '手配状況',
        subtitle: '各日のサービスに必要な手配と、割り当て状況',
        summary: (covered, needed) => `${needed}件中${covered}件手配済み`,
        day: number => `${number}日目`,
        assign: '割り当て',
        extraHint: '割り当て済みですが、この日のサービスには含まれていません',
        nothingNeeded: 'この旅程にはまだガイド・車両・ホテルなどが必要なサービスがありません。',
        loadFailed: '割り当てを読み込めませんでした。',
        types: {
            guide: 'ガイド', vehicle: '車両', hotel: 'ホテル', cruise: 'ナイルクルーズ', restaurant: 'レストラン',
            airport_staff: '空港アシスタント', hotel_staff: 'ホテルアシスタント',
        },
    },
};
export const LABEL_SETS = { en: enLabels, ja: jaLabels };
const LabelsContext = createContext(enLabels);
/** Wrap a page to give the components its wording. */
export function UiLabelsProvider({ labels, children }) {
    return _jsx(LabelsContext.Provider, { value: labels, children: children });
}
export function useUiLabels() {
    return useContext(LabelsContext);
}
