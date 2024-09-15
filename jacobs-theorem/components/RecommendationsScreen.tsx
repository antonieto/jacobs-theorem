import React, { useEffect, useState } from "react";
import BankCarousel from "./BankCarousel";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Header from "./Header";
import UserInput from "./UserInput";
import axios from "axios";

interface Props {
  user_data: string;
}

const API_URL = "https://jacobs-theorem.onrender.com";
const endPoint = "recommend-products";

export default function RecommendationsScreen({ user_data }: Props) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/${endPoint}`, {
          user_data,
        });
        setRecommendations(response.data);
      } catch (err) {
        setError("Failed to load recommendations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user_data]);

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
        <View style={styles.middleContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <BankCarousel recommendations={recommendations} />
          )}
        </View>
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
