import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AnimatePresence, motion } from "framer-motion";
interface QuestionProps {
  question: string;
  section: string;
}

export default function Question({ question }: QuestionProps) {
  return (
    <AnimatePresence
      mode="wait"
    >

      <motion.div
        key={`${question}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <View style={styles.container}>
          <Text style={styles.questionText}>{question}</Text>
        </View>
      </motion.div>

    </AnimatePresence>
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
    fontFamily: "Arial",
    textAlign: "center",
    marginBottom: 15,
  },
  questionText: {
    fontSize: 40,
    fontFamily: "Arial",
    textAlign: "center",
    width: "80%",
  },
});
