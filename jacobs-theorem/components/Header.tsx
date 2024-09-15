import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

interface HeaderProps {
  progress: number; // Expect progress as a percentage (0-100)
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
  // Ref para animar el ancho de la barra de progreso
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Cuando el progreso cambie, animamos la barra
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500, // Duración de la animación en milisegundos
      useNativeDriver: false, // Como estamos animando el estilo, no podemos usar native driver
    }).start();
  }, [progress]);

  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={require("../assets/images/banortelogogray.png")}
        style={styles.logo}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarForeground,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200, // Adjust the logo size
    height: 75, // Adjust the logo size
    resizeMode: "contain",
  },
  progressBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#BCBCBC",
    overflow: "hidden",
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "#EC0029", // Color de la barra de progreso
  },
});

export default Header;
