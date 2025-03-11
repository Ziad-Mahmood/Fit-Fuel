import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const savedLang = localStorage.getItem("lang") || "en";

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: "en",
  messages: { en, ar },
});

export default i18n;
