import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import Toast from "react-native-toast-message";

const InitialInvestigationReport = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;

  // State to hold form data
  const [formData, setFormData] = useState({
    issue: "",
    fact: "",
    trouble: "",
    issueArises: "",
    severity: "",
    rating: "",
    conclusion: "",
    recommendation: "",
    investigator: "",
    approver: "",
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const showToast = () => {
    setTimeout(() => {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill out the field.",
        visibilityTimeout: 5000,
        position: "top",
      });
    }, 100);
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key].trim() === "") {
        Alert.alert("Validation Error", `Please fill out the ${key} field.`);
        // showToast();
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    axios
      .patch(`${serveraddress}fsgr/form/${id}`, {
        id,
        what_is_the_issue: formData.issue,
        what_is_the_fact: formData.fact,
        where_the_trouble_arrises: formData.trouble,
        why_did_the_issue_arrises: formData.issueArises,
        how_sevier_this_is: formData.severity,
        how_sevier_rating_this_is: formData.rating,
        conclusion: formData.conclusion,
        recommendation: formData.recommendation,
        investigation_done_by: formData.investigator,
        approval_by: formData.approver,
        status: "progress",
      })
      .then((response) => {
        console.log("resp:", response);
        Alert.alert("Success", "Form Submitted Successfully");
        setIsVisible(false); // Close the modal
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to submit form");
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            height: screenHeight * 0.95,
            marginTop: screenHeight * 0.05,
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 18,
                  color: "#21005d",
                }}
              >
                Initial Investigation Report
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <StepFormNavigation stepNo={1} />
          <View style={{ marginBottom: 20 }}>
            <View style={{ marginBottom: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  paddingHorizontal: 10,
                  fontWeight: "500",
                  paddingVertical: 5,
                  color: "#21005d",
                  marginBottom: 5,
                }}
              >
                What is the issue?
              </Text>
              <TextInput
                placeholder="Please mention the issue in detail..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={formData.issue}
                onChangeText={(text) => handleInputChange("issue", text)}
                style={{
                  borderColor: "gray",
                  backgroundColor: "white",
                  elevation: 4,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
              />
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  What is the fact?
                </Text>
                <TextInput
                  placeholder="Please mention the fact in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.fact}
                  onChangeText={(text) => handleInputChange("fact", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  What is the trouble that arises?
                </Text>
                <TextInput
                  placeholder="Please mention the trouble in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.trouble}
                  onChangeText={(text) => handleInputChange("trouble", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  What is the issue that arises?
                </Text>
                <TextInput
                  placeholder="Please mention the issue in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.issueArises}
                  onChangeText={(text) =>
                    handleInputChange("issueArises", text)
                  }
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  How severe is this issue?
                </Text>
                <TextInput
                  placeholder="Please mention how severe the issue is..."
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                  value={formData.severity}
                  onChangeText={(text) => handleInputChange("severity", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  Rate the issue!
                </Text>
                <TextInput
                  placeholder="Rating"
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                  value={formData.rating}
                  onChangeText={(text) => handleInputChange("rating", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  Conclusion
                </Text>
                <TextInput
                  placeholder="Please write the conclusion..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.conclusion}
                  onChangeText={(text) => handleInputChange("conclusion", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  What is your recommendation?
                </Text>
                <TextInput
                  placeholder="Please mention the recommendation in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.recommendation}
                  onChangeText={(text) =>
                    handleInputChange("recommendation", text)
                  }
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  Investigation done by?
                </Text>
                <TextInput
                  placeholder="Person Name"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.investigator}
                  onChangeText={(text) =>
                    handleInputChange("investigator", text)
                  }
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <View style={{ marginBottom: 5 }}>
              <View style={{ marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    fontWeight: "500",
                    paddingVertical: 5,
                    color: "#21005d",
                    marginBottom: 5,
                  }}
                >
                  Approval will be done by?
                </Text>
                <TextInput
                  placeholder="Officer name"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.approver}
                  onChangeText={(text) => handleInputChange("approver", text)}
                  style={{
                    borderColor: "gray",
                    backgroundColor: "white",
                    elevation: 4,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: "#21005d",
                padding: 10,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 30,
                borderRadius: 5,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default InitialInvestigationReport;
