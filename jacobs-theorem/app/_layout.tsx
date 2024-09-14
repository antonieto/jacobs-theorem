import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { VoiceProvider } from '@humeai/voice-react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HumeClient } from 'hume';

const API_KEY = '';
const SECRET_KEY = '';

const client = new HumeClient({
  apiKey: API_KEY,
  secretKey: SECRET_KEY
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <VoiceProvider auth={{ type: "apiKey", value: "BYP1cIvD2pvmsnW5xasw1xuNhHmYGXpqtknHg2xUsp8rAZeB" }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>

    </VoiceProvider>
  );
}
