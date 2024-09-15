import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AcceptButtonProps {
  onPress: () => void;
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Ionicons
          name="checkmark"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.text}>Accept</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5AC69F",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default AcceptButton;
