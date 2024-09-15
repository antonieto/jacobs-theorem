import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import KYCScreen from "./KYCScreen";
import { useVoice } from "@humeai/voice-react";
import DatosPersonales from "./DatosPersonales";

export default function AIChat() {
  // Estado para controlar si ya se completó la primera parte
  const [isDatosPersonalesComplete, setIsDatosPersonalesComplete] =
    useState(false);

  // Función que se pasa a DatosPersonales para saber cuándo está completo
  const handleCompletion = () => {
    setIsDatosPersonalesComplete(true);
  };

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      {isDatosPersonalesComplete ? (
        // Renderizamos KYCScreen si DatosPersonales está completo
        <KYCScreen
          question="What do you do for a living?"
          section="Questions about yourself"
          progress={1}
        />
      ) : (
        // Renderizamos DatosPersonales si aún no está completo
        <DatosPersonales onComplete={handleCompletion} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
