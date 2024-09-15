import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { VoiceProvider } from '@humeai/voice-react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { HumeClient, getAudioStream, checkForAudioTracks } from 'hume';


const API_KEY = 'jbn3llIwgMxcOo9qmMIrIoGdYpThAsTIaRgF3OSSUslyWeUv';
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
    <VoiceProvider
      configId='d8db284c-7c04-433c-bc42-801c5a974cdb'
      onMessage={(message) => {
        if (message.type === 'user_message') {

        }
        console.log("MESSAGE: ", message);
        if (message.type === "user_message") {
          console.log("USER MESSAGE: ", message.message.content);
        }
      }}
      auth={{ type: "apiKey", value: API_KEY }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </VoiceProvider>
  );
}
