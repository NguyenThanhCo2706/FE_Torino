import i18n from 'i18next';

import translationEN from './en.json';
import translationVI from './vi.json';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localStorage.getItem("language") || 'vi',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;

