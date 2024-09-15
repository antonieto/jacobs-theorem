// ./components/Controls.tsx
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { Audio } from 'expo-av';
import { useEffect } from "react";

export default function Controls() {
    const { connect, disconnect, readyState } = useVoice();
    
    useEffect(() => {

    });

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

    return null;
}
