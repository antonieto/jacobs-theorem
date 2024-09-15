import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import "react-native-reanimated";
import AIChat from "@/components/AIChat";

import { useColorScheme } from "@/hooks/useColorScheme";
import { HumeClient, getAudioStream, checkForAudioTracks } from "hume";
import AISymbol from "@/components/AISymbol";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <VoiceProvider
      auth={{
        type: "apiKey",
        value: process.env.EXPO_PUBLIC_HUME_API_KEY!,
      }}
      configId="d8db284c-7c04-433c-bc42-801c5a974cdb"
    >
      <AIChat />
    </VoiceProvider>
  );
}
