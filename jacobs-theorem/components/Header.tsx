import React from "react";
import { View, Image, StyleSheet } from "react-native";
// Define the prop types for the Header
interface HeaderProps {
  progress: number; // Expect progress as a percentage (0-100)
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo */}
      <Image
        source={require("../assets/images/banortelogogray.png")}
        style={styles.logo}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarForeground, { width: `${progress}%` }]}
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
    width: "100%", // Take 90% of the width of the screen
    height: 8,
    backgroundColor: "#BCBCBC", // Grey background (100% bar)
    overflow: "hidden", // To ensure the foreground is clipped
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "#EC0029", // Green color (progress bar)
  },
});

export default Header;
