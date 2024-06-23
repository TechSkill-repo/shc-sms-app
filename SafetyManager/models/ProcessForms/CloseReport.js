import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import { Checkbox } from "react-native-paper";
// import { managePanProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

const screenHeight = Dimensions.get("screen").height;

const CheckboxItemGroup = ({ title, check, setCheck }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {["Excelent", "Good", "Average", "Poor"].map((label) => (
      <Checkbox.Item
        key={label}
        label={label}
        onPress={() => setCheck(label)}
        status={check === label ? "checked" : "unchecked"}
      />
    ))}
  </View>
);

const CloseReport = ({ isVisible, setIsVisible, id }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    management_and_assessment: "",
    priority_of_concern: "",
    completion_of_job: "",
    accuracy: "",
    rate: "",
    currentStatus: "finalClose",
    status: "finalClose",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        Alert.alert("Validation Error", `Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  console.log("Close Report:", formData);

  const handleSubmit = async () => {
    setLoading(true);
    if (!validateForm()) return;

    try {
      const formDataNew = new FormData();

      formDataNew.append(
        "management_and_assessment",
        formData.management_and_assessment
      );
      formDataNew.append("priority_of_concern", formData.priority_of_concern);
      formDataNew.append("completion_of_job", formData.completion_of_job);
      formDataNew.append("accuracy", formData.accuracy);
      formDataNew.append("rate", formData.rate);
      formDataNew.append("currentStatus", "finalClose");
      formDataNew.append("status", "finalClose");

      const response = await fetch(`${serveraddress}fsgr/form/${id}`, {
        method: "PATCH",
        body: formDataNew,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });
      if (!response.ok) {
        const responseData = await response.text();
        console.error("Server response:", responseData);
        throw new Error("Network response was not ok");
      }

      setLoading(false);
      console.log("close report:", response.data);
      Alert.alert("Success", "Form Submitted Successfully");
      setIsVisible(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit form");
      console.error("Error:", error);
    }

    // axios
    //   .patch(`${serveraddress}fsgr/form/${id}`, {
    //     ...formData,
    //     status: "finalClose",
    //   })
    //   .then((response) => {
    //     setLoading(false);
    //     console.log("close report:", response.data);
    //     Alert.alert("Success", "Form Submitted Successfully");
    //     setIsVisible(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     Alert.alert("Error", "Failed to submit form");
    //     console.error("Error:", error);
    //   });
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <ScrollView style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Close Report</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <StepFormNavigation stepNo={4} />
          <Text>Your Feedback Details.</Text>
          <CheckboxItemGroup
            title="Supervisor Management and Assistance"
            check={formData.management_and_assessment}
            setCheck={(value) =>
              handleInputChange("management_and_assessment", value)
            }
          />
          <CheckboxItemGroup
            title="Priority of Closing as per Severity"
            check={formData.priority_of_concern}
            setCheck={(value) =>
              handleInputChange("priority_of_concern", value)
            }
          />
          <CheckboxItemGroup
            title="Completion of Job without Damage"
            check={formData.completion_of_job}
            setCheck={(value) => handleInputChange("completion_of_job", value)}
          />
          <CheckboxItemGroup
            title="Was the Job done accurately"
            check={formData.accuracy}
            setCheck={(value) => handleInputChange("accuracy", value)}
          />
          <CheckboxItemGroup
            title="How would you rate the overall Job"
            check={formData.rate}
            setCheck={(value) => handleInputChange("rate", value)}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "100%",
    height: screenHeight * 0.95,
    marginTop: screenHeight * 0.05,
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#21005d",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#21005d",
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#21005d",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
};

export default CloseReport;
