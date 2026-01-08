import '../lang';
import './global.css';

import { Stack } from 'expo-router';
import { HeroUINativeProvider } from 'heroui-native';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function RootLayout() {
	const majorVersionIOS = parseInt(String(Platform.Version), 10);

	const [fontsLoaded] = useFonts({
		Outfit_400Regular,
		Outfit_500Medium,
		Outfit_600SemiBold,
		Outfit_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<HeroUINativeProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen
						name="modal"
						options={{
							headerShown: false,
							presentation: 'formSheet',
							sheetGrabberVisible: true,
							contentStyle: {
								backgroundColor:
									majorVersionIOS > 26 ? 'transparent' : '#1f2937',
							},
							sheetAllowedDetents: [0.7],
						}}
					/>
				</Stack>
			</HeroUINativeProvider>
		</GestureHandlerRootView>
	);
}
