import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface BankOptionProps {
  title: string;
  characteristics: string[];
  image: any;
}

const BankOption: React.FC<BankOptionProps> = ({
  title,
  characteristics,
  image,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.characteristicsContainer}>
        {characteristics.map((item, index) => (
          <View key={index} style={styles.characteristicItem}>
            <Text style={styles.dot}>{"\u2022"}</Text>
            <Text style={styles.characteristicText}>{item}</Text>
          </View>
        ))}
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 378,
    width: 264,
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  characteristicsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  characteristicItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  dot: {
    marginRight: 5,
  },
  characteristicText: {
    fontSize: 15,
    textAlign: "left",
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default BankOption;
