import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import "react-native-reanimated";
import AIChat from "@/components/AIChat";

import axios from "axios";


const API_URL = "https://jacobs-theorem.onrender.com";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [conversation, setConversation] = useState<{ sender: 'user' | 'assistant', message: string }[]>([]);


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
      auth={{
        type: "apiKey",
        value: process.env.EXPO_PUBLIC_HUME_API_KEY!,
      }}
      configId="d8db284c-7c04-433c-bc42-801c5a974cdb"
      onMessage={(message) => {
        if (message.type === 'assistant_end') {
          // TODO: add parse KYC conversation API call here
          // Parse conversation to plain text
          const plainText = conversation.reduce((acc, curr) => acc + `${curr.sender === 'user' ? 'User: ' : 'Assistant: '}${curr.message}\n`, '');
          console.log(plainText);
        }
        if (message.type === 'assistant_message' || message.type === 'user_message') {
          setConversation(prev => [...prev, { sender: message.type === 'assistant_message' ? 'assistant' : 'user', message: message.message.content ?? '' }]);
        }
      }}
      onClose={(ev) => {
        console.log(ev);
        // TODO: add parse KYC conversation API call here
        if (ev.wasClean) {
          const plainText = conversation.reduce((acc, curr) => acc + `${curr.sender === 'user' ? 'User: ' : 'Assistant: '}${curr.message}\n`, '');
          console.log(plainText);
        }
      }}
    >
      <AIChat />
    </VoiceProvider>
  );
}
