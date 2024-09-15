import { StyleSheet, SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Controls from "@/components/voice/Controls";
import Messages from "@/components/voice/Messages";
import KYCScreen from "./KYCScreen";

export default function AIChat() {
  const question = "Hello";
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <KYCScreen question={question} section={"Questions about yourself"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
