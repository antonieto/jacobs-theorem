import React from "react";
import { View, StyleSheet } from "react-native";
import AISymbol from "./AISymbol";
import Question from "./Question";
import Controls from "./voice/Controls";
import Messages from "./voice/Messages";

// Define the prop types using a type or interface
interface QuestionComponentProps {
  question: string | null;
  section: string | null;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  section,
}) => {
  return (
    <View style={styles.container}>
      <AISymbol isTalking={true} />
      <Question
        question={question ?? "Failed to get question"}
        section={section ?? "Failed to get section"}
      />
      <Controls />
      <Messages />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    padding: 20, // Optional padding for breathing room
  },
});

export default QuestionComponent;
