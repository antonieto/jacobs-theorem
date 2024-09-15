// HUME messages component


// ./components/Messages.tsx
import { ConnectionMessage, useVoice } from "@humeai/voice-react";
import { Hume } from "hume";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Messages() {
    // const messages: ReturnType<typeof useVoice>["messages"] = DUMMY_MESSAGES;
    const { messages } = useVoice();

    return (
        <ScrollView>
            {messages.map((msg, index) => {
                if (msg.type === "user_message" || msg.type === "assistant_message") {
                    return (
                        <View style={styles.messageContainer} key={msg.type + index}>
                            <Text style={msg.type === "user_message" ? styles.userMessage : styles.assistantMessage}>{msg.message.content}</Text>
                        </View>
                    );
                }

                return null;
            })}
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
