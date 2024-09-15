import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AiSymbolProps {
  isTalking: boolean;
}

export default function AISymbol({ isTalking }: AiSymbolProps) {
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
        ]),
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
        ]),
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
          <Ionicons name="chatbubble" size={14} color="#7C809E" />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
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
