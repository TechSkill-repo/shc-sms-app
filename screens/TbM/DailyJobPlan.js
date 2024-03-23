import { View, Text, Button, Alert } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SERVER_ADDRESS } from "@env"
import { serveraddress } from "../../assets/values/Constants";

import Step1 from "./DailJobStepForm/Step1";
import Step2 from "./DailJobStepForm/Step2";
import Step3 from "./DailJobStepForm/Step3";
import axios from "axios";

const DailyJobPlan = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // step:1
    // todaysDate: "",
    // currentTime: "",
    dateTime: dateTime,
    shift: "",
    ocation: "",
    permitNumber: "",

    //step:2
    typeOfWork: "",
    nameOfSupervisor: "",
    sopNumber: "",
    jobDescription: "",

    // step:3
    hazardsDescription: [],
    necessarySteps: []
  })

  // useEffect(() => {
  //   // Update the current date in formData whenever it changes
  //   const formattedDate = new Date(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate());
  //   setDateTime((prevData) => ({ ...prevData, dateTime: formattedDate }));
  // }, [dateTime, setDateTime]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  console.log("formdata", formData);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} formData={formData} setFormData={setFormData} />;

      case 2:
        return <Step2 onNext={nextStep} onPrev={prevStep} formData={formData} setFormData={setFormData} />;

      case 3:
        return <Step3 onPrev={prevStep} onNext={handleConfirmSubmit} formData={formData} setFormData={setFormData} />;

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

  const submitForm = async () => {
    // Get the current date and time
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();

    // Combine date and time into a single dateTime string
    const dateTime = `${currentDate.toISOString()} ${currentTime}`;

    // Update formData with current date and time
    setFormData((prevData) => ({
      ...prevData,
      dateTime: dateTime,
    }));
    await axios
      .post(serveraddress + `forms/daily-job-plans`, formData, {
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
      {/* <Text>Tbt Form</Text> */}
      {/* <Button title="Next" /> */}
      {renderStep()}
    </View>
  );
};

export default DailyJobPlan;
