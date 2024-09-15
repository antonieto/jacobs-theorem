import React from "react";
import { View, StyleSheet } from "react-native";
import AISymbol from "./AISymbol";
import Question from "./Question";
import Controls from "./voice/Controls";
import Messages from "./voice/Messages";
import Header from "./Header"; // Import the new Header component

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
  return (
    <View style={styles.container}>
      {/* Header at the top */}
      <Header progress={progress} />

      {/* Content below the header */}
      <View style={styles.content}>
        <AISymbol isTalking={true} />
        <Question
          question={question ?? "Failed to get question"}
          section={section ?? "Failed to get section"}
        />
        <Controls />
        <Messages />
      </View>
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
  },
});

export default KYCScreen;
