import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface NumericalInputProps {
  label: string;
  value: number;
  onChangeText: (number: number) => void;
}

const NumericalInput: React.FC<NumericalInputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    onChangeText(parseInt(numericValue));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : styles.inputUnfocused,
        ]}
        value={value ? value.toString() : ""}
        onChangeText={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
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

export default NumericalInput;
