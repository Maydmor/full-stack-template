import { createI18n } from "vue-i18n";
import de from '../locales/de.json';
import en from '../locales/en.json';

export const useI18n = () => {
    const i18n = createI18n({
        legacy: false,
        locale: "de",
        fallbackLocale: "en",
        messages: { de, en },
    });
    return i18n;
}