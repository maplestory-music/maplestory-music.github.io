import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDectector from 'i18next-browser-languagedetector';

export const supportedLanguages = ['en', 'ko', 'ja', 'zh'] as const;
export type Language = typeof supportedLanguages[number];
export const supportedLocales = ['zh-CN', 'zh-TW'] as const;
export type LanguageLocale = Language | typeof supportedLocales[number];
const fallbackLanguage = {
  zh: ['zh-TW', 'zh-CN', 'en'],
  default: ['en'],
};

i18n.use(LanguageDectector).use(initReactI18next).init({
  fallbackLng: fallbackLanguage,
  nonExplicitSupportedLngs: true,
  supportedLngs: supportedLanguages,
});
