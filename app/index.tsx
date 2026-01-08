import { Link } from 'expo-router';
import { Button, PressableFeedback } from 'heroui-native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function Index() {
	const { t, i18n } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language === 'en' ? 'fr' : 'en';
		i18n.changeLanguage(newLang);
	};

	return (
		<View className="flex-1 items-center justify-center h-full gap-4">
			<Text className="font-bold text-2xl ">
				{t('home.welcome')}
			</Text>
			<Text className="font-normal text-gray-600">{t('home.itemCount', { count: 5 })}</Text>
			<Text className="text-lg mt-4">{t('profile.title')}</Text>

			<Button onPress={toggleLanguage} className="">
				<Text className="text-white font-semibold">
					{i18n.language === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
				</Text>
			</Button>

			<Text className="font-normal text-sm text-gray-400 mt-2">
				Langue actuelle: {i18n.language.toUpperCase()}
			</Text>

			<Link href="/modal" asChild>
				<PressableFeedback className="mt-6 px-4 py-2 bg-blue-600 rounded-lg">
					<Text className="text-white font-semibold">Open Modal</Text>
				</PressableFeedback>
			</Link>
		</View>
	);
}
