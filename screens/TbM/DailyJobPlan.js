import { View, Text, Button } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import Step1 from "./DailJobStepForm/Step1";
import Step2 from "./DailJobStepForm/Step2";
import Step3 from "./DailJobStepForm/Step3";

const DailyJobPlan = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} />;

      case 2:
        return <Step2 onNext={nextStep} onPrev={prevStep} />;

      case 3:
        return <Step3 onPrev={prevStep} />;

      default:
        return null;
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text>Tbt Form</Text> */}
      {/* <Button title="Next" /> */}
      {renderStep()}
    </View>
  );
};

export default DailyJobPlan;
