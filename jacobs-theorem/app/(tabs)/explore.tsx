import { StyleSheet, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Controls from '@/components/voice/Controls';
import Messages from '@/components/voice/Messages';

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>

      </ThemedView>
      <ThemedView style={styles.buttonsContainer}>
        <Controls />
      </ThemedView>
      <Messages />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 4,
  }
});
