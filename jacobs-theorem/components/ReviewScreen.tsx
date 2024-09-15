import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useOnboardingContext, KYCPayload } from "./context/OnboardingContext";
import NumericalInput from "./NumericalInput";
import CustomTextInput from "./TextInput";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useVoice } from "@humeai/voice-react";

interface Props {
    onSubmit: () => void;
}

export default function ReviewScreen({ onSubmit }: Props) {
    const { connect, mute, disconnect } = useVoice();
    const { kycPayload } = useOnboardingContext();

    const [form, setForm] = useState<KYCPayload>({
        occupation: "",
        incomeSource: "",
        moneyUsage: "",
        primaryFinancialActivities: "",
        fundingSource: "",
        averageMonthlyBalance: 0,
        withdrawals: {
            count: 0,
            amount: 0,
        },
        deposits: {
            count: 0,
            amount: 0,
        },
    });

    useEffect(() => {
        connect();
        mute();
        return () => {
            mute();
            disconnect();
        }
    }, [])

    useEffect(() => {
        if (kycPayload) {
            setForm(kycPayload);
        }
    }, [kycPayload]);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header fixed at 20% height */}
            <View style={styles.headerContainer}>
                <Header progress={4} />
            </View>

            <Text style={styles.title}>Are these details correct?</Text>

            { /* horizontal two button group */}
            <View style={styles.buttonGroupContainer}>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={{ color: "white" }}>Submit</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.middleContainer}>
                <ScrollView>
                    { /* populate form with kyc payload fields */}
                    <CustomTextInput
                        label="Occupation"
                        value={form.occupation}
                        onChangeText={(text) => {
                            setForm({ ...form, occupation: text });
                        }}
                    />
                    <CustomTextInput
                        label="Income Source"
                        value={form.incomeSource}
                        onChangeText={(text) => {
                            setForm({ ...form, incomeSource: text });
                        }}
                    />
                    <CustomTextInput
                        label="Money Usage"
                        value={form.moneyUsage}
                        onChangeText={(text) => {
                            setForm({ ...form, moneyUsage: text });
                        }}
                    />
                    <CustomTextInput
                        label="Primary Financial Activities"
                        value={form.primaryFinancialActivities}
                        onChangeText={(text) => {
                            setForm({ ...form, primaryFinancialActivities: text });
                        }}
                    />
                    <CustomTextInput
                        label="Funding Source"
                        value={form.fundingSource}
                        onChangeText={(text) => {
                            setForm({ ...form, fundingSource: text });
                        }}
                    />
                    <CustomTextInput
                        label="Average Monthly Balance"
                        value={String(form.averageMonthlyBalance)}
                        onChangeText={(text) => {
                            setForm({ ...form, averageMonthlyBalance: Number(text) });
                        }}
                    />

                    <View style={styles.horizontalInputContainer}>
                        <CustomTextInput
                            label="Withdrawals Count"
                            value={String(form.withdrawals.count)}
                            multiline={false}
                            onChangeText={(text) => {
                                setForm({ ...form, withdrawals: { ...form.withdrawals, count: Number(text) } });
                            }}
                        />
                        <CustomTextInput
                            label="Withdrawals Amount"
                            value={String(form.withdrawals.amount)}
                            onChangeText={(text) => {
                                setForm({ ...form, withdrawals: { ...form.withdrawals, amount: Number(text) } });
                            }}
                        />
                    </View>

                    <CustomTextInput
                        label="Deposits Count"
                        value={String(form.deposits.count)}
                        onChangeText={(text) => {
                            setForm({ ...form, deposits: { ...form.deposits, count: Number(text) } });
                        }}
                    />
                    <CustomTextInput
                        label="Deposits Amount"
                        value={String(form.deposits.amount)}
                        onChangeText={(text) => {
                            setForm({ ...form, deposits: { ...form.deposits, amount: Number(text) } });
                        }}
                    />
                </ScrollView>
            </View>

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        flex: 1,
    },
    // Header takes up 20% of the screen height
    headerContainer: {
        justifyContent: "flex-start", // Align header content at the bottom of this section
        alignItems: "center",
    },
    // Middle section (Messages, AISymbol, Question, Controls) takes up 60%
    middleContainer: {
        flex: 1,
        alignItems: "center", // Center the content horizontally
        width: "100%",
    },
    // User input takes up 10% at the bottom
    userInputContainer: {
        flex: 6,
        alignItems: "center",
        padding: 20,
    },
    horizontalInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "nowrap",
    },
    buttonGroupContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        margin: 10,
    }
});

