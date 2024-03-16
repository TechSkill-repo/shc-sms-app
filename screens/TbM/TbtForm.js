import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";

import Step1 from "./TbmStepForm/Step1";
import Step2 from "./TbmStepForm/Step2";
import Step3 from "./TbmStepForm/Step3";
import Step4 from "./TbmStepForm/Step4";
import Step5 from "./TbmStepForm/Step5";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const TbtForm = () => {
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

  const [shift, setShift] = useState("");
  useEffect(() => {
    if (hours > 6 && hours < 8) {
      setShift("Morning A Shift");
    } else if (hours > 8 && hours < 12) {
      setShift("Morning General Shift");
    } else if (hours > 12 && hours < 17) {
      setShift("Afternoon B Shift");
    } else {
      setShift("Night C Shift");
    }
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // step:1
    todaysDate: `${day}/${month}/${year}`,
    currentTime: `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
      }`,
    currentShift: shift,
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
    await axios
      .post("http://192.168.241.49:8085/forms/tbm-form", formData, {
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

export default TbtForm;
