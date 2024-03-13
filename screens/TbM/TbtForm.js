import { View } from "react-native";
import React, { useState } from "react";

import Step1 from "./TbmStepForm/Step1";
import Step2 from "./TbmStepForm/Step2";
import Step3 from "./TbmStepForm/Step3";
import Step4 from "./TbmStepForm/Step4";
import Step5 from "./TbmStepForm/Step5";
import axios from "axios";
import Toast from "react-native-toast-message";

const TbtForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // step:1
    todaysDate: "",
    currentTime: "",
    currentShift: "",
    siteLocation: "",
    permitNumber: "",

    // step:2
    companySupervisor: "",
    safetyRepresentative: "",
    department: "",
    contractorRepresentative: "",
    contractorEmployee: "",

    // step:3
    safetyContractReviewItems: "",
    itemsOfGeneralSafetyImportance: "",
    queries: "",

    // step:4
    sop: "",
    responsibilities: "",
    safetyMessage: "",
    actionResulting: "",

    // step:5
    totalNumberOfPeopleAssign: "", //interger
    attendance: [],
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const updateStep1FormData = (data) => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  console.log("formdata", formData);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNext={nextStep}
            setFormData={setFormData}
            formData={formData}
            updateFormData={updateStep1FormData}
          />
        );

      case 2:
        return (
          <Step2
            onNext={nextStep}
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );

      case 3:
        return (
          <Step3
            onNext={nextStep}
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );

      case 4:
        return (
          <Step4
            onNext={nextStep}
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );

      case 5:
        return (
          <Step5
            onNext={submitForm}
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );

      default:
        return null;
    }
  };

  const submitForm = async () => {
    await axios
      .post("http://192.168.1.7:8080/forms/tbm-form", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Form Submited Successfully:", response.data);
        alert("Form Submited Successfully");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        if (error.response) {
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
      });
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
