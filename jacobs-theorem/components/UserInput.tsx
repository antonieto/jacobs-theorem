import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Icons

interface UserInputProps {
  isTalking: boolean;
}

export default function UserInput({ isTalking }: UserInputProps) {
  const micAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTalking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(micAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(micAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
      ).start();
    } else {
      micAnim.stopAnimation();
    }
  }, [isTalking]);

  const micScale = micAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.micContainer,
          {
            transform: [{ scale: micScale }],
          },
        ]}
      >
        <Ionicons name="mic" size={24} color="#7C809E" />
      </Animated.View>

      <View style={styles.swapIconContainer}>
        <Ionicons name="swap-horizontal" size={24} color="#7C809E" />
      </View>

      <View style={styles.keyboardIconContainer}>
        <View style={styles.circle}>
          <MaterialIcons name="keyboard" size={24} color="#7C809E" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  micContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  swapIconContainer: {
    marginLeft: 10,
  },
  keyboardIconContainer: {
    marginLeft: 10,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
