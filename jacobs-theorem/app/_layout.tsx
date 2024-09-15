import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AIChat from "@/components/AIChat";

import axios from "axios";
import { Hume } from "hume";
import { VoiceProvider } from "@humeai/voice-react";

const API_URL = "https://jacobs-theorem.onrender.com";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [conversation, setConversation] = useState<{ sender: 'user' | 'assistant', message: string }[]>([]);
  const [prosodySum, setProsodySum] = useState<Hume.empathicVoice.ProsodyInference['scores'] | null>(null);
  const [userMessageCount, setUserMessageCount] = useState<number>(0);


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
        if (message.type === 'user_message') {
          if (message.models.prosody) {
            setUserMessageCount(prev => prev + 1);
            const newProsodySum = prosodySum ? { ...prosodySum } : message.models.prosody.scores;
            // Sum the prosody scores
            Object.entries(message.models.prosody.scores).forEach(([key, value]) => {
              newProsodySum[key as keyof Hume.empathicVoice.EmotionScores] = (newProsodySum[key as keyof Hume.empathicVoice.EmotionScores] || 0) + value;
            });
            setProsodySum(newProsodySum);
          }
        }
        console.log(prosodySum, userMessageCount);
      }}
      onClose={async (ev) => {
        // TODO: add parse KYC conversation API call here
        if (ev.wasClean) {
          const plainText = conversation.reduce((acc, curr) => acc + `${curr.sender === 'user' ? 'User: ' : 'Assistant: '}${curr.message}\n`, '');
          try {
            const response = await axios.post(`${API_URL}/extract-data`, { conversation: plainText });
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }}
    >
      <AIChat />
    </VoiceProvider>
  );
}
