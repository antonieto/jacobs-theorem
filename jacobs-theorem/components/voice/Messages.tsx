// HUME messages component

// ./components/Messages.tsx
import { useVoice } from "@humeai/voice-react";
import { Text, View } from "react-native";

export default function Messages() {
    const { messages } = useVoice();

    return (
        <View>
            {messages.map((msg, index) => {
                if (msg.type === "user_message" || msg.type === "assistant_message") {
                    return (
                        <View key={msg.type + index}>
                            <Text>{msg.message.role}</Text>
                            <Text>{msg.message.content}</Text>
                        </View>
                    );
                }

                return null;
            })}
        </View>
    );
}
