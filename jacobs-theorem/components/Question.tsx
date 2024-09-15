import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface QuestionProps {
  question: string;
  section: string;
}

export default function Question({ question, section }: QuestionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>{section}</Text>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  sectionText: {
    fontSize: 18,
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 15,
  },
  questionText: {
    fontSize: 40,
    fontFamily: "Roboto",
    textAlign: "center",
    width: "80%",
  },
});
