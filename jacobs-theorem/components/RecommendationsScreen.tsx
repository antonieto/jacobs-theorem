import React from "react";
import BankCarousel from "./BankCarousel";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from "./Header";
import UserInput from "./UserInput";
import axios from "axios";

export default function RecommendationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header progress={100} />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 20,
          }}
        >
          ¡Las tarjetas que se adaptan mejor a ti!
        </Text>
      </View>

      <View style={styles.middleContainer}>
        <BankCarousel
          recommendations={[
            {
              title: "Bank 1",
              characteristics: ["Feature 1", "Feature 2", "Feature 3"],
            },
            {
              title: "Bank 2",
              characteristics: ["Feature 1", "Feature 2", "Feature 3"],
            },
            {
              title: "Bank 3",
              characteristics: ["Feature 1", "Feature 2", "Feature 3"],
            },
          ]}
        />
      </View>

      <View style={styles.userInputContainer}>
        <TouchableOpacity style={[styles.button]} onPress={() => {}}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align header content at the bottom of this section
    alignItems: "center",
  },
  middleContainer: {
    flex: 6,
    top: "10%",
    alignItems: "center", // Center the content horizontally
    padding: 20, // Optional padding
  },
  userInputContainer: {
    flex: 1.5,
    justifyContent: "flex-start", // Align the user input at the bottom
  },
  button: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
