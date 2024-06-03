import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";

const CloseReport = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;

  const [formData, setFormData] = useState({
    managment_and_assisment: "",
    priority_of_cuncurn: "",
    completion_of_job: "",
    accuricy: "",
    rate: "",
    currentStatus: "",
    status: "close",
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .patch(`${serveraddress}fsgr/form/${id}`, {
        id,
        management_and_assessment: formData.managment_and_assisment,
        priority_of_concern: formData.priority_of_cuncurn,
        completion_of_job: formData.completion_of_job,
        accuracy: formData.accuricy,
        rate: formData.rate,
        currentStatus: formData.currentStatus,
        status: "finalClose",
      })
      .then((response) => {
        console.log("close report:", response.data);
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
                Requirements & Planning Report
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
          <StepFormNavigation stepNo={4} />
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
                Managment and assisment
              </Text>
              <TextInput
                placeholder="Managment and assisment..."
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                // value={formData.site_supervisor}
                onChangeText={(text) =>
                  handleInputChange("managment_and_assisment", text)
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
                Priority of cuncurn
              </Text>
              <TextInput
                placeholder="Priority of cuncurn..."
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                // value={formData.initial_investigation_status}
                onChangeText={(text) =>
                  handleInputChange("priority_of_cuncurn", text)
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
                Completion of job
              </Text>
              <TextInput
                placeholder="Completion of job..."
                multiline
                numberOfLines={1}
                textAlignVertical="top"
                // value={formData.initial_investigation_team}
                onChangeText={(text) =>
                  handleInputChange("completion_of_job", text)
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
                Accuricy
              </Text>
              <TextInput
                placeholder="accuricy..."
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                // value={formData.resource_planning_done_by}
                onChangeText={(text) => handleInputChange("accuricy", text)}
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
                Rate
              </Text>
              <TextInput
                placeholder="Enter rate..."
                multiline
                numberOfLines={1}
                textAlignVertical="top"
                // value={formData.planning_date}
                onChangeText={(text) => handleInputChange("rate", text)}
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
                Current Status
              </Text>
              <TextInput
                placeholder="Current Status..."
                multiline
                numberOfLines={1}
                textAlignVertical="top"
                // value={formData.resource_required}
                onChangeText={(text) =>
                  handleInputChange("currentStatus", text)
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

export default CloseReport;
