import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { VoiceProvider, useVoice } from "@humeai/voice-react";
import { CameraView } from "expo-camera";
import CheckBox from "expo-checkbox";
import Header from "./Header";

interface DatosPersonalesProps {
  onComplete: () => void; // Property to notify when completed
}

const DatosPersonales: React.FC<DatosPersonalesProps> = (props) => {
  return (
    <VoiceProvider
      auth={{
        type: "apiKey",
        value: process.env.EXPO_PUBLIC_HUME_API_KEY!,
      }}
      configId="31e91dae-d653-44b7-a247-2c5c89a435d9"
    >
      <DatosPersonalesContent {...props} />
    </VoiceProvider>
  );
};

const DatosPersonalesContent: React.FC<DatosPersonalesProps> = ({
  onComplete,
}) => {
  const { connect, disconnect, lastVoiceMessage, lastUserMessage } = useVoice();
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleNextStep = async () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Text style={styles.text}>
            Hello! I’m Maya, and I’ll guide you through your onboarding process!
          </Text>
        );
      case 2:
        return (
          <ScrollView contentContainerStyle={styles.stepTwoContainer}>
            <Text style={styles.stepTitle}>
              Take a picture of the front and back of your ID (INE/IFE)
            </Text>
            <Text style={styles.subtitle}>
              Please consider these recommendations:
            </Text>
            <Text style={styles.bulletPoint}>
              • Your ID must be original and valid.
            </Text>
            <Text style={styles.bulletPoint}>
              • Make sure your details are legible and your address is complete.
            </Text>
            <Text style={styles.bulletPoint}>
              • You should have good lighting, preferably natural light.
            </Text>
            <Text style={styles.bulletPoint}>
              • Avoid shadows or reflections.
            </Text>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxText}>
                I ACCEPT TO GIVE MY CONSENT FOR BANORTE TO PROCESS MY DATA
                ACCORDING TO ITS PRIVACY NOTICE AND AUTHORIZE BANORTE TO USE MY
                GEOGRAPHICAL LOCATION THROUGH THE GEOLOCATION SERVICE.
              </Text>
            </View>
          </ScrollView>
        );
      case 3:
        // [TODO]: find better labels for the text in each step
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.label}>
              Take a photo of the FRONT face of your INE
            </Text>
            <CameraView style={styles.camera} />;
          </View>
        );
      case 4:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.label}>
              Take a photo of the BACK face of your INE
            </Text>
            <CameraView style={styles.camera} />;
          </View>
        );
      case 5:
        return (
          <View>
            <Text style={styles.text}>Now it's time to take a selfie</Text>
          </View>
        );
      case 6:
        return <CameraView style={styles.camera} facing="front" />;
      case 7:
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.formTitle}>Data collected from your ID</Text>

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={styles.input}
              value="Juan Pérez García"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>CURP:</Text>
            <TextInput
              style={styles.input}
              value="PEPJ800101HDFRRR09"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Elector Key:</Text>
            <TextInput
              style={styles.input}
              value="ELT1234567890"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Issue Number:</Text>
            <TextInput
              style={styles.input}
              value="01"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Issue Option:</Text>
            <TextInput style={styles.input} value="A" onChangeText={() => { }} />

            <Text style={styles.label}>Section:</Text>
            <TextInput
              style={styles.input}
              value="1234"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Registration Year:</Text>
            <TextInput
              style={styles.input}
              value="2022"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>State:</Text>
            <TextInput
              style={styles.input}
              value="Ciudad de México"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Municipality:</Text>
            <TextInput
              style={styles.input}
              value="Benito Juárez"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Locality:</Text>
            <TextInput
              style={styles.input}
              value="Del Valle"
              onChangeText={() => { }}
            />

            <Text style={styles.label}>Validity:</Text>
            <TextInput
              style={styles.input}
              value="2028"
              onChangeText={() => { }}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header progress={(currentStep / 5) * 100} />

      <View style={styles.contentContainer}>{renderStepContent()}</View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { opacity: currentStep === 2 && !isChecked ? 0.5 : 1 },
          ]}
          onPress={handleNextStep}
          disabled={currentStep === 2 && !isChecked}
        >
          <Text style={styles.buttonText}>
            {currentStep === 3 || currentStep === 4 || currentStep === 6
              ? "Take Photo"
              : currentStep === 5
                ? "Open camera"
                : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
    margin: 15,
  },
  buttonContainer: {
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: "80%",
    backgroundColor: "#FAFAFA",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  stepTwoContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    flexGrow: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  button: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DatosPersonales;
