import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuestionComponent = (question: string) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
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
