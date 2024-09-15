// Context for onboarding steps

import { createContext, useContext, useState } from "react";

export type KYCPayload = {
    occupation: string;
    incomeSource: string;
    moneyUsage: string;
    primaryFinancialActivities: string;
    fundingSource: string;
    averageMonthlyBalance: number;
    withdrawals: {
        count: number;
        amount: number;
    };
    deposits: {
        count: number;
        amount: number;
    };
};

type Step = 'personal_info' | 'biometric' | 'kyc' | 'review' | 'success';

interface OnboardingContextType {
    step: Step;
    setStep: (step: Step) => void;
    kycPayload: KYCPayload | null;
    setKycPayload: (payload: KYCPayload) => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
    step: 'personal_info',
    setStep: () => { },
    kycPayload: null,
    setKycPayload: () => { },
});

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState<Step>('personal_info');
    const [kycPayload, setKycPayload] = useState<KYCPayload | null>(null);
    return (
        <OnboardingContext.Provider value={{ step, setStep, kycPayload, setKycPayload }}>
            {children}
        </OnboardingContext.Provider>
    );
}
export const useOnboardingContext = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboardingContext must be used within an OnboardingProvider');
    }
    return context;
}