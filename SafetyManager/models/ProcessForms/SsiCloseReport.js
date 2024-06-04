import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";

const SsiCloseReport = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;

  // State to hold form data
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    suggestion: "",
    benifits: "",
    implementation: "",
    date_of_ssi: "",
    duration_of_completion: "",
    after_image: "none",
    status: "close",
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    axios
      .patch(`${serveraddress}fsgr/form/${id}`, {
        id,
        description: formData.description,
        category: formData.category,
        suggestion: formData.suggestion,
        benifits: formData.benifits,
        implementation: formData.implementation,
        date_of_ssi: formData.date_of_ssi,
        duration_of_completion: formData.duration_of_completion,
        after_image: formData.after_image,
        status: "close",
      })
      .then((response) => {
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
                  fontWeight: "500",
                  fontSize: 18,
                  color: "#21005d",
                }}
              >
                SSI CLOSE Report
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
          <StepFormNavigation stepNo={3} />
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
                Description
              </Text>
              <TextInput
                placeholder="Enter the description..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                // value={formData.site_supervisor}
                onChangeText={(text) => handleInputChange("description", text)}
                style={{
                  backgroundColor: "white",
                  elevation: 2,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
              />
            </View>
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
                Category
              </Text>
              <TextInput
                placeholder="Category..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                // value={formData.initial_investigation_status}
                onChangeText={(text) => handleInputChange("category", text)}
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
                Suggestion
              </Text>
              <TextInput
                placeholder="Suggestion..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                // value={formData.initial_investigation_team}
                onChangeText={(text) => handleInputChange("suggestion", text)}
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
                Benifits
              </Text>
              <TextInput
                placeholder="Enter the benifits..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                // value={formData.resource_planning_done_by}
                onChangeText={(text) => handleInputChange("benifits", text)}
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
                Implementation
              </Text>
              <TextInput
                placeholder="Enter implementation..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                // value={formData.planning_date}
                onChangeText={(text) =>
                  handleInputChange("implementation", text)
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
                Date of ssi
              </Text>
              <TextInput
                placeholder="Date of ssi..."
                multiline
                numberOfLines={1}
                textAlignVertical="top"
                // value={formData.resource_required}
                onChangeText={(text) => handleInputChange("date_of_ssi", text)}
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
                Duration of completion
              </Text>
              <TextInput
                placeholder="Duration of completion..."
                multiline
                numberOfLines={1}
                textAlignVertical="top"
                // value={formData.resource_required}
                onChangeText={(text) =>
                  handleInputChange("duration_of_completion", text)
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
            <View style={{ marginBottom: 5 }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f443361a",
                  padding: 6,
                  borderRadius: 50,
                }}
              >
                <Entypo name="camera" size={22} color="#f44336" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#f44336",
                  }}
                >
                  After Image
                </Text>
              </TouchableOpacity>
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

export default SsiCloseReport;

const styles = StyleSheet.create({});
