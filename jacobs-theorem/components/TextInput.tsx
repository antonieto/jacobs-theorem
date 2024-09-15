import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  multiline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && { height: 120 },
          isFocused ? styles.inputFocused : styles.inputUnfocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        underlineColorAndroid={"transparent"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 24,
    fontFamily: "Roboto",
    textAlign: "center",
    width: "80%",
  },
  input: {
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
    width: "80%",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  inputUnfocused: {
    borderBottomColor: "#ccc",
  },
  inputFocused: {
    borderBottomColor: "#007BFF",
  },
});

export default CustomTextInput;