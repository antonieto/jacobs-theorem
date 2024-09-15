import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AISymbol from "./AISymbol";
import Question from "./Question";
import Controls from "./voice/Controls";
import Messages from "./voice/Messages";
import UserInput from "./UserInput";
import Header from "./Header";
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
