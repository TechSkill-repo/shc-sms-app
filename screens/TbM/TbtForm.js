import { View } from "react-native";
import React, { useState } from "react";

import Step1 from "./TbmStepForm/Step1";
import Step2 from "./TbmStepForm/Step2";
import Step3 from "./TbmStepForm/Step3";
import Step4 from "./TbmStepForm/Step4";
import Step5 from "./TbmStepForm/Step5";

const TbtForm = () => {
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
        return <Step3 onNext={nextStep} onPrev={prevStep} />;

      case 4:
        return <Step4 onNext={nextStep} onPrev={prevStep} />;

      case 5:
        return <Step5 onNext={nextStep} onPrev={prevStep} />;

      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Text>Tbt Form</Text> */}
      {/* <Button title="Next" /> */}
      {renderStep()}
    </View>
  );
};

export default TbtForm;
