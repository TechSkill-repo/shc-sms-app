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
import Loading from "../../assets/logo/Loading.png";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";

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
            loading={loading}
            createPdf={createPDF}
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

  const createPDF = async () => {
    alert("create pdf");
    const html = `
     <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
   body { font-family: Arial, sans-serif; background-color: #f5f5f5; color: #333; padding: 20px; display: flex; justify-content: center; }
   .container { width: 100%; max-width: 700px; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
   header { text-align: center; margin-bottom: 20px; }
   header h1 { font-size: 1.5em; color: #333; }
   header h2, header h3 { font-size: 1.2em; margin: 5px 0; }
   header p { font-size: 0.9em; color: #666; margin-top:10 }
   .form-section { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
   .form-group { display: flex; flex-direction: column; }
   .form-group label { font-weight: bold; font-size: 0.9em; color: #555; margin-bottom: 5px; }
   .form-group input[type="text"] { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 0.9em; background-color: #f9f9f9; }
   .form-group input[type="text"]::placeholder { color: #888; }
   .details, .representatives, .items-discussed { margin-bottom: 20px; }
   .items-discussed h4 { margin-bottom: 10px; font-size: 1.1em; color: #444; }
   .items-discussed p { font-weight: bold; margin-top: 10px; font-size: 0.9em; }
   .items-discussed textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical; height: 80px; margin-top: 5px; font-size: 0.9em; background-color: #f9f9f9; }

   /* Adding a margin-top to push section 5 to the next page */
   .section-reminder { margin-top: 50px; }

   @media (max-width: 600px) { .form-section { grid-template-columns: 1fr; } }

      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>S. H. Construction Co.</h1>
          <h2>Jamshedpur</h2>
          <h3>Tool Box Meeting</h3>
          <p>Form # SHC/OHS/TBM-01</p>
        </header>
        <section class="form-section">
          <div class="form-group">
            <label for="date-time">Date</label>
            <input type="text" id="date-time" value="${formData.todaysDate}" readonly>
          </div>
          <div class="form-group">
            <label for="time">Time</label>
            <input type="text" id="time" value="${formData.currentTime}" readonly>
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input type="text" id="location" value="${formData.location}" readonly>
          </div>
          <div class="form-group">
            <label for="department">Department</label>
            <input type="text" id="department" value="${formData.department}" readonly>
          </div>
          <div class="form-group">
            <label for="supervisor">Company Supervisor/Line Manager</label>
            <input type="text" id="supervisor" value="${formData.companySupervisor}" readonly>
          </div>
          <div class="form-group">
            <label for="safety-rep">Safety Representative</label>
            <input type="text" id="safety-rep" value="${formData.safetyRepresentative}" readonly>
          </div>
          <div class="form-group">
            <label for="contractor-rep">Contractor's Representative</label>
            <input type="text" id="contractor-rep" value="${formData.contractorRepresentative}" readonly>
          </div>
          <div class="form-group">
            <label for="contractor-employee">Contact Employee</label>
            <input type="text" id="contractor-employee" value="${formData.contractorEmployee}" readonly>
          </div>
        </section>
        <section class="items-discussed">
          <h4>ITEMS DISCUSSED:(Indicate if not discussed)</h4>
          <p>1. Safety contract and review of action items from last meeting.</p>
          <textarea readonly>${formData.safetyContractReviewItems}</textarea>
          <p>2. Items of General Safety Importance to the total work site.(ask Employees to mention any Incident/
          near miss during the past day which may have or have resulted into damage to property or injury to
          company or Contract personnel.)</p>
          <textarea readonly>${formData.itemsOfGeneralSafetyImportance}</textarea>
          <p>3. Items of Safety Interest to this Group.(e.g. Red Strips, Orange Strips, Green Strips, Safety alertLD#3
            tips for Safety communications, hazards or Safety conditions applicable to this group's work area))</p>
          <textarea readonly>${formData.queries}</textarea>
          <p>4. Standard Operating Procedures (SOP) relevant to this group.</p>
          <textarea readonly>${formData.sop}</textarea>
          <p>5. Reminder to Employees of their personal responsibilities to ensure and maintain  (Personal
            Protective Equipment, Housekeeping, iool and tackles, Electrical Equipment condition, Six directional
              Hazards, Special requirement (e.g. Permit to work, No Alcohol regulations, No horse play, Safe
              behaviour, team work approach, any Hazardous material etc.)</p>
          <textarea readonly>${formData.responsibilities}</textarea>
          <p>6. SSafety message Hand-outs/Circular to be shared with Contract Employees.</p>
          <textarea readonly>${formData.safetyMessage}</textarea>
          <p>7. Action resulting from meeting and points raised by Contract Employee and Supervisor..</p>
          <textarea readonly>${formData.actionResulting}</textarea>
        </section>
      </div>
    </body>
    `;

    // let options = {
    //   html,
    //   fileName: "ToolBoxTalkForm",
    //   directory: "Documents",
    // };

    // let file = await reactNativeHtmlToPdf.convert(options);

    // // Use Expo's Sharing to share/download the PDF
    // await Sharing.shareAsync(file.filePath);

    // Create a PDF from the HTML
    const { uri } = await Print.printToFileAsync({ html });

    // Use Expo's Sharing to share/download the PDF
    await Sharing.shareAsync(uri);

    // await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
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
        {/* {loading ? (
          // <ActivityIndicator size="large" color="#0000ff" />
          <Image
            source={Loading}
            style={{
              height: 500,
              width: "100%",
            }}
          />
        ) : ( */}
        {renderStep()}
        {/* )} */}
      </View>
    </>
  );
};

export default TbtForm;
