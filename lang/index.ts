import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en-US/translation.json';
import fr from './locales/fr-FR/translation.json';

const resources = {
	en: { translation: en },
	fr: { translation: fr },
};

// Détecte la langue du device (ex: "en", "fr")
const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
	resources,
	lng: deviceLanguage,
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
