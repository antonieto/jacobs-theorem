import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AISymbol from "./AISymbol";
import { VoiceProvider } from "@humeai/voice-react";
import Controls from "./voice/Controls";
import Messages from "./voice/Messages";
import UserInput from "./UserInput";
import Header from "./Header";
import { useVoice } from "@humeai/voice-react";
import axios from "axios";
import { Hume } from "hume";
import { useOnboardingContext } from "./context/OnboardingContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const API_URL = "https://jacobs-theorem.onrender.com";

// Define the prop types using a type or interface
interface QuestionComponentProps {
  progress: number; // Add progress prop
}

const KYCScreen: React.FC<QuestionComponentProps> = (
  props: QuestionComponentProps,
) => {

  const [conversation, setConversation] = useState<
    { sender: "user" | "assistant"; message: string }[]
  >([]);

  const [prosodySum, setProsodySum] = useState<Hume.empathicVoice.ProsodyInference['scores'] | null>(null);
  const [userMessageCount, setUserMessageCount] = useState<number>(0);
  const { setKycPayload, setStep } = useOnboardingContext();

  return (
    <VoiceProvider
      auth={{
        type: "apiKey",
        value: process.env.EXPO_PUBLIC_HUME_API_KEY!,
      }}
      configId="d8db284c-7c04-433c-bc42-801c5a974cdb"
      onMessage={(message) => {
        if (message.type === "assistant_end") {
          // TODO: add parse KYC conversation API call here
          // Parse conversation to plain text
          const plainText = conversation.reduce(
            (acc, curr) =>
              acc +
              `${curr.sender === "user" ? "User: " : "Assistant: "}${curr.message}\n`,
            "",
          );
          console.log(plainText);
        }
        if (
          message.type === "assistant_message" ||
          message.type === "user_message"
        ) {
          setConversation((prev) => [
            ...prev,
            {
              sender:
                message.type === "assistant_message" ? "assistant" : "user",
              message: message.message.content ?? "",
            },
          ]);
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
      }}
      onClose={async (ev) => {
        if (ev.wasClean) {
          const plainText = conversation.reduce(
            (acc, curr) =>
              acc +
              `${curr.sender === "user" ? "User: " : "Assistant: "}${curr.message}\n`,
            "",
          );
          try {
            const response = await axios.post(`${API_URL}/extract-data`, {
              conversation: plainText,
            });
            setKycPayload(response.data);
            setStep('review');
          } catch (error) {
            console.error(error);
          }
        }
      }}
    >
      <KYCScreenContent {...props} />
    </VoiceProvider>
  );
};

const KYCScreenContent: React.FC<QuestionComponentProps> = ({
  progress,
}) => {
  const { connect, disconnect, lastUserMessage } = useVoice();

  const { setStep, setKycPayload } = useOnboardingContext();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  // Calculate based on last user message's timestamp
  const isUserTalking =
    !!lastUserMessage && lastUserMessage.time.begin > Date.now() - 1000 * 10;

  return (
    <View style={styles.container}>
      {/* Header fixed at 20% height */}
      <View style={styles.headerContainer}>
        <Header progress={progress} />
      </View>

      {/* Messages in the middle taking 60% of the space */}
      <View style={styles.middleContainer}>
        <AISymbol isTalking={true} />
        <Controls />
        <Messages />
      </View>

      {/* UserInput fixed at the bottom with 10% height */}
      <View style={styles.userInputContainer}>
        <UserInput isTalking={isUserTalking} />
      </View>

      { /* Button to skip KYC and mock a response */}
      <TouchableOpacity onPress={() => {
        disconnect();
        setKycPayload({
          occupation: "Software Engineer",
          incomeSource: "Salary",
          moneyUsage: "Investing",
          primaryFinancialActivities: "Stocks, Crypto",
          fundingSource: "Salary",
          averageMonthlyBalance: 1000,
          withdrawals: {
            count: 10,
            amount: 100,
          },
          deposits: {
            count: 10,
            amount: 100,
          },
        });
        setStep('review');
      }}>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  // Header takes up 20% of the screen height
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align header content at the bottom of this section
    alignItems: "center",
  },
  // Middle section (Messages, AISymbol, Question, Controls) takes up 60%
  middleContainer: {
    flex: 6,
    top: "10%",
    alignItems: "center", // Center the content horizontally
    padding: 20, // Optional padding
  },
  // User input takes up 10% at the bottom
  userInputContainer: {
    flex: 1.5,
    justifyContent: "flex-start", // Align the user input at the bottom
  },
});

export default KYCScreen;
