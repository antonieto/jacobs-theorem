import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AISymbol from "./AISymbol";
import Question from "./Question";
import Controls from "./voice/Controls";
import Messages from "./voice/Messages";
import UserInput from "./UserInput";
import { useVoice } from "@humeai/voice-react";

// Define the prop types using a type or interface
interface QuestionComponentProps {
  question: string | null;
  section: string | null;
  progress: number; // Add progress prop
}

const KYCScreen: React.FC<QuestionComponentProps> = ({
  question,
  section,
  progress,
}) => {
  const { connect, disconnect, lastVoiceMessage, lastUserMessage } = useVoice();
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  // Calculate based on last user message's timestamp
  const isUserTalking = !!lastUserMessage && lastUserMessage.time.begin > Date.now() - 1000 * 10;

  return (
    <View style={styles.container}>
      <AISymbol isTalking={false} />
      <Controls />
      <Messages />
      <UserInput isTalking={isUserTalking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Fills the remaining space
    top: "10%",
    alignItems: "center", // Center horizontally
    padding: 20, // Optional padding for breathing room
    backgroundColor: "white",
  },
});

export default KYCScreen;
