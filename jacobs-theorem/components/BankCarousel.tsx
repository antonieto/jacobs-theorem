import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import BankOption from "./BankOption"; // Assuming your BankOption component is in the same folder

const { width: screenWidth } = Dimensions.get("window");

interface BankCarouselProps {
  recommendations: {
    title: string;
    characteristics: string[];
  }[];
}

const BankCarousel: React.FC<BankCarouselProps> = ({ recommendations }) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.carouselItem}>
      <BankOption title={item.title} characteristics={item.characteristics} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={recommendations}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onMomentumScrollEnd={handleScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default BankCarousel;
