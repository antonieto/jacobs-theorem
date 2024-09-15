import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import KYCScreen from "./KYCScreen";
import ReviewScreen from "./ReviewScreen";
import { useVoice } from "@humeai/voice-react";
import DatosPersonales from "./DatosPersonales";
import { useOnboardingContext } from "./context/OnboardingContext";

export default function AIChat() {
  // Estado para controlar si ya se completó la primera parte
  const { step, setStep } = useOnboardingContext();

  const handlePersonalInfoCompletion = () => {
    setStep('kyc');
  };

  const handleReviewSubmit = () => {
    setStep('success');
  };

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      {step === 'personal_info' || step === 'biometric' ? (
        <DatosPersonales onComplete={handlePersonalInfoCompletion} />
      ) : step === 'kyc' ? (
        <KYCScreen progress={2} />
      ) : step === 'review' ? (
        <ReviewScreen onSubmit={handleReviewSubmit} />
      ) : null}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
