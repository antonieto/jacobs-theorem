import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface UserInputProps {
  isTalking: boolean;
}

export default function UserInput({ isTalking }: UserInputProps) {
  const outerCircleAnim = useRef(new Animated.Value(0)).current;
  const innerCircleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTalking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(outerCircleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(outerCircleAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(innerCircleAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(innerCircleAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      outerCircleAnim.stopAnimation();
      innerCircleAnim.stopAnimation();
    }
  }, [isTalking]);

  const outerCircleScale = outerCircleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const innerCircleScale = innerCircleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerCircle,
          {
            transform: [{ scale: outerCircleScale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.innerCircle,
            {
              transform: [{ scale: innerCircleScale }],
            },
          ]}
        >
          <Ionicons name="mic" size={20} color="#7C809E" />
        </Animated.View>
      </Animated.View>

      <View style={styles.swapIconContainer}>
        <Ionicons name="swap-horizontal" size={24} color="#7C809E" />
      </View>

      <View style={styles.keyboardIconContainer}>
        <View style={styles.circle}>
          <MaterialIcons name="keyboard" size={20} color="#7C809E" />
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
  outerCircle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  innerCircle: {
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
