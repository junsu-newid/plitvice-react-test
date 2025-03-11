import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ko from './ko.json';

i18n.use(initReactI18next).init({
    debug: true,
    resources: {
        en: { translation: en },
        ko: { translation: ko },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
        prefix: '{',
        suffix: '}',
    },
});
export default i18n;
