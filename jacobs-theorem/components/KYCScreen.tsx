import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
      <Text style={styles.questionText}>
        {question} - {section}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default QuestionComponent;
