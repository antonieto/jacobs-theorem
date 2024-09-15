// ./components/Controls.tsx
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { TouchableOpacity, Text, Alert, StyleSheet, View } from "react-native";
import { Audio } from 'expo-av';
import { useEffect, useState } from "react";

const messages = [
    "What's your name?",
];

export default function Controls() {
    const { connect, disconnect, readyState, sendAssistantInput, lastUserMessage } = useVoice();
    const [messageStep, setMessageStep] = useState(0);

    useEffect(() => {
        if (lastUserMessage) {
            console.log(lastUserMessage);
        }
    }, [lastUserMessage])


    const requestMicrophonePermission = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        return status === 'granted';
    };

    const handleStartSession = async () => {
        try {
            const hasPermission = await requestMicrophonePermission();
            if (hasPermission) {
                console.log("has permissions");
                await connect();
                console.log("Connected to Hume");
            } else {
                throw new Error("Microphone permission denied");
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert(
                "Connection Error",
                `Failed to connect: ${(error as Error).message}. Please check your microphone settings and try again.`
            );
        }
    };

    const toggleMessage = () => {
        setMessageStep((prevStep) => (prevStep + 1) % messages.length);
        const result = sendAssistantInput(messages[messageStep]);
    };

    if (readyState === VoiceReadyState.OPEN) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={disconnect}>
                    <Text>End Session</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: "white" }}
                    onPress={toggleMessage}
                >
                    <Text>Send manual message</Text>
                </TouchableOpacity>
            </View>
        );
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ backgroundColor: "white" }}
                onPress={handleStartSession}
            >
                <Text>Start Session</Text>
            </TouchableOpacity>

        </View>

    );
}

// Horizontal buttons container
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 4,
    }
});
