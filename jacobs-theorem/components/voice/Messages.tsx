// HUME messages component


// ./components/Messages.tsx
import { useVoice } from "@humeai/voice-react";
import { View, StyleSheet, ScrollView } from "react-native";
import Question from "../Question";

export default function Messages() {
    // const messages: ReturnType<typeof useVoice>["messages"] = DUMMY_MESSAGES;
    const { lastVoiceMessage } = useVoice();

    return (
        <ScrollView>
            <View style={styles.messageContainer}>

                <Question section={"kyc"} question={lastVoiceMessage?.message.content ?? ''}></Question>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    assistantMessage: {
        fontSize: 20,
        backgroundColor: "white",
    },
    userMessage: {
        fontSize: 16,
    },
    messageContainer: {
        margin: 10,
    },
    container: {
        padding: 10,
    }
});
