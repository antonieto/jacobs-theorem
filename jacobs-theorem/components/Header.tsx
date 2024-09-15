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
        source={require("../assets/images/banorteblanco.png")}
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
    paddingVertical: 10, // Adds some space around the logo
  },
  logo: {
    width: 100, // Adjust the logo size
    height: 100, // Adjust the logo size
    resizeMode: "contain",
  },
  progressBarBackground: {
    width: "90%", // Take 90% of the width of the screen
    height: 10,
    backgroundColor: "#e0e0e0", // Grey background (100% bar)
    borderRadius: 5, // Slightly rounded corners
    marginTop: 10, // Space between logo and progress bar
    overflow: "hidden", // To ensure the foreground is clipped
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "#4caf50", // Green color (progress bar)
    borderRadius: 5,
  },
});

export default Header;
