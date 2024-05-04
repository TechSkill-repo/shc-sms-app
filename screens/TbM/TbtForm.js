import { Alert, Text, View, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";

import Step1 from "./TbmStepForm/Step1";
import Step2 from "./TbmStepForm/Step2";
import Step3 from "./TbmStepForm/Step3";
import Step4 from "./TbmStepForm/Step4";
import Step5 from "./TbmStepForm/Step5";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { serveraddress } from "../../assets/values/Constants";
import Loading from "../../assets/logo/Loading.png"

const TbtForm = () => {
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();

  const day = currentDate.getDate(); // Returns the
  const month = currentDate.getMonth() + 1; //
  const year = currentDate.getFullYear(); // Returns

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Update the current time every second
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the timer
    return () => {
      clearInterval(timerID);
    };
  }, []);

  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // step:1
    todaysDate: `${day}/${month}/${year}`,
    currentTime: `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`,
    shift: "",
    location: "",
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
            onNext={handleConfirmSubmit}
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );

      default:
        return null;
    }
  };

  const navigation = useNavigation();
  const submitForm = async () => {
    setLoading(true);

    // Get the current date and time
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Format date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Log or use the formatted date and time as needed
    console.log("Current Date:", formattedDate);
    console.log("Current Time:", formattedTime);
    await axios
      .post(
        serveraddress + `forms/tbm-form`,
        {
          date: formattedDate,
          time: formattedTime,
          ...formData, // Other formData fields
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
        <Appbar.Content title="Tool Box Talk Form" />
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
            }}
          />
        ) : (
          renderStep()
        )}
      </View>
    </>
  );
};

export default TbtForm;
