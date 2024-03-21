import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import Step1 from "./ToolsTacklesStepForm/Step1";
import Step2 from "./ToolsTacklesStepForm/Step2";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";



const ToolsTackles = () => {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({
    todaysDate: "",
    location: "",
    permitNumber: "",
  });

  const [step2Data, setStep2Data] = useState({});

  const formData = {
    ...step1Data, ...step2Data
  }
  console.log(formData);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNext={nextStep}
            setStep1Data={setStep1Data}
            formData={step1Data}
          />
        );

      case 2:
        return (
          <Step2
            onNext={handleConfirmSubmit}
            onPrev={prevStep}
            setStep2Data={setStep2Data}
            step1Data={step1Data}
            formData={step2Data}
          />
        );

      default:
        return null;
    }
  };

  const navigation = useNavigation();
  const submitForm = async () => {
    const formData = {
      ...step1Data, ...step2Data
    }
    await axios
      .post(serveraddress+`forms/tools-tackle`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Form Submited Successfully:", response.data);
        alert("Form Submited Successfully");
        navigation.goBack();
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

  const handleConfirmSubmit = () => {
    Alert.alert(
      "Confirm Submission",
      "Do you want to submit the form?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: () => {
            alert("Form submitted successfully");
            submitForm();
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {renderStep()}
    </View>
  );
};

export default ToolsTackles;