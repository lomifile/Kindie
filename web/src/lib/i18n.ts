import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
};

export const init_i18n = () => {
  i18n
    // import & load translations from -> /public/locales
    .use(Backend)
    // https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // see opts @ https://www.i18next.com/overview/configuration-options
    .init({
      detection: DETECTION_OPTIONS,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false, // fixes 'no fallback UI was specified' in react i18next when using hooks
      },
    });
};
