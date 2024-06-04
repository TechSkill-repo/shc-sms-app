import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import DateTimePicker from "@react-native-community/datetimepicker";

const PlanningReport = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [planningDate, setPlanningDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State to hold form data
  const [formData, setFormData] = useState({
    site_supervisor: "",
    initial_investigation_status: "",
    initial_investigation_team: "",
    resource_planning_done_by: "",
    planning_date: "",
    resource_required: "",
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || planningDate;
    setShowDatePicker(Platform.OS === "ios");
    setPlanningDate(currentDate);

    handleInputChange("planning_date", currentDate.toISOString().split("T")[0]);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
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

  console.log("form data:", formData);
  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    axios
      .patch(`${serveraddress}fsgr/form/${id}`, {
        id,
        site_supervisor: formData.site_supervisor,
        initial_investigation_status: formData.initial_investigation_status,
        initial_investigation_team: formData.initial_investigation_team,
        resource_planning_done_by: formData.resource_planning_done_by,
        planning_date: formData.planning_date,
        resource_required: formData.resource_required,
        status: "ssiclose",
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
          <StepFormNavigation stepNo={2} />
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
                Site Supervisor
              </Text>
              <TextInput
                placeholder="Enter the site supervisor's name..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={formData.site_supervisor}
                onChangeText={(text) =>
                  handleInputChange("site_supervisor", text)
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
                Initial Investigation Status
              </Text>
              <TextInput
                placeholder="Describe the initial investigation status..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={formData.initial_investigation_status}
                onChangeText={(text) =>
                  handleInputChange("initial_investigation_status", text)
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
                Initial Investigation Team
              </Text>
              <TextInput
                placeholder="Mention the initial investigation team..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={formData.initial_investigation_team}
                onChangeText={(text) =>
                  handleInputChange("initial_investigation_team", text)
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
                Resource Planning Done By
              </Text>
              <TextInput
                placeholder="Enter the name of the person responsible for resource planning..."
                multiline
                numberOfLines={2}
                textAlignVertical="top"
                value={formData.resource_planning_done_by}
                onChangeText={(text) =>
                  handleInputChange("resource_planning_done_by", text)
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
                Planning Date
              </Text>
              <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                  mode="outlined"
                  label="Planning Date"
                  value={planningDate.toLocaleDateString()}
                  editable={false}
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
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={planningDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

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
                Resources Required
              </Text>
              <TextInput
                placeholder="List the resources required..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={formData.resource_required}
                onChangeText={(text) =>
                  handleInputChange("resource_required", text)
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

export default PlanningReport;
