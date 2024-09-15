import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import { ThemedView } from "@/components/ThemedView";

const API_URL = "https://jacobs-theorem.onrender.com";

export default function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      setMessage(response.data.Hello);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const createItem = async () => {
    try {
      const response = await axios.post(`${API_URL}/items`, {
        name,
        description,
      });
      alert(`Item created: ${response.data.item_name}`);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Text>Message from server: {message}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Item name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Item description"
      />
      <Button title="Create Item" onPress={createItem} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
