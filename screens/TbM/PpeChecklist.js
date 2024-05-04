import { View, Text, Alert, ActivityIndicator, Image } from "react-native";
import React, { useState } from "react";
import Step1 from "./PPECheckList/Step1";
import Step2 from "./PPECheckList/Step2";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";
import { Appbar } from "react-native-paper";
import Loading from "../../assets/logo/Loading.png";

const PpeChecklist = () => {
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({
    date: dateTime,
    location: "",
    permitNumber: "",
  });

  const [step2Data, setStep2Data] = useState({});

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

  const formData = {
    ...step1Data,
    ...step2Data,
  };
  console.log("form data", formData);
  const navigation = useNavigation();

  const submitForm = async () => {
    setLoading(true);
    const currentDate = new Date();

    // Extract hours, minutes, and seconds
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format hours, minutes, and seconds with leading zeros if needed
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Combine date and time into a single dateTime string
    const dateTime = `${
      currentDate.toISOString().split("T")[0]
    } ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // Update formData with current date and time
    setDateTime((prevData) => ({
      ...prevData,
      dateTime: dateTime,
    }));
    console.log("datetime:", dateTime);
    const formData = {
      ...step1Data,
      ...step2Data,
    };
    await axios
      .post(serveraddress + `forms/ppe-checklist`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Form Submited Successfully:", response.data);
        setLoading(false);
        alert("Form Submited Successfully");
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
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
            // alert("Form submitted successfully");
            submitForm();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("ToolBoxTalk");
          }}
        />
        <Appbar.Content title="PPE Checklist " />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
          // <ActivityIndicator size="large" color="#0000ff" />
          <Image
          source={Loading}
          style={{
            height: 500,
            width: "100%",
          }}/>
        ) : (
          renderStep()
        )}
      </View>
    </>
  );
};

export default PpeChecklist;
