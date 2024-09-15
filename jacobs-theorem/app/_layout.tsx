import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import "react-native-reanimated";
import AIChat from "@/components/AIChat";

import { useColorScheme } from "@/hooks/useColorScheme";
import { HumeClient, getAudioStream, checkForAudioTracks } from "hume";

const API_KEY = "";
const SECRET_KEY = "";

const client = new HumeClient({
  apiKey: API_KEY,
  secretKey: SECRET_KEY,
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const cb = useCallback(async () => {
    try {
      console.log("NAVIGATOR: ", navigator);
      const stream = await getAudioStream();
      const tracks = await checkForAudioTracks(stream);
      console.log(tracks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    cb();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <VoiceProvider auth={{ type: "apiKey", value: API_KEY }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack> */}
        <AIChat />
      </ThemeProvider>
    </VoiceProvider>
  );
}
