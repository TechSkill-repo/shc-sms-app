import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";

const dataRating = [
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];

const InitialInvestigationReport = ({ isVisible, setIsVisible, id }) => {
  const screenHeight = Dimensions.get("screen").height;
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [ratingFocus, setRatingFocus] = useState(false);

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

  console.log("form data:", formData);

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
  const handleSubmit = async () => {
    setLoading(true);
    if (!validateForm()) {
      return;
    }
    try {
      const formDataNew = new FormData();
      formDataNew.append("id", id);
      formDataNew.append("what_is_the_issue", formData.issue);
      formDataNew.append("what_is_the_fact", formData.fact)
      formDataNew.append("where_the_trouble_arrises", formData.trouble);
      formDataNew.append("why_did_the_issue_arrises", formData.issueArises);
      formDataNew.append("how_sevier_this_is", formData.severity);
      formDataNew.append("how_sevier_rating_this_is", formData.rating);
      formDataNew.append("conclusion", formData.conclusion);
      formDataNew.append("recommendation", formData.recommendation);
      formDataNew.append("investigation_done_by", formData.investigator);
      formDataNew.append("approval_by", formData.approver);
      formDataNew.append("status", "progress");

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
      console.log("resp:", response);
      Alert.alert("Success", "Form Submitted Successfully");
      setIsVisible(false); // Close the modal
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit form");
      console.error("Error:", error);
    }

    // axios
    //   .patch(`${serveraddress}fsgr/form/${id}`, {
    //     id,
    //     what_is_the_issue: formData.issue,
    //     what_is_the_fact: formData.fact,
    //     where_the_trouble_arrises: formData.trouble,
    //     why_did_the_issue_arrises: formData.issueArises,
    //     how_sevier_this_is: formData.severity,
    //     how_sevier_rating_this_is: formData.rating,
    //     conclusion: formData.conclusion,
    //     recommendation: formData.recommendation,
    //     investigation_done_by: formData.investigator,
    //     approval_by: formData.approver,
    //     status: "progress",
    //   })
    //   .then((response) => {
    //     setLoading(false);
    //     console.log("resp:", response);
    //     Alert.alert("Success", "Form Submitted Successfully");
    //     setIsVisible(false); // Close the modal
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
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
                onChangeText={(text) => handleInputChange("issueArises", text)}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}

            {/* rate */}
            {/* <View style={{ marginBottom: 5 }}>
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
            </View> */}

            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 14,
                  // paddingHorizontal: 10,
                  fontWeight: "500",
                  // paddingVertical: 5,
                  color: "#21005d",
                  marginBottom: 5,
                }}
              >
                Rate the issue!
              </Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  ratingFocus && { borderColor: "blue" },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataRating}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!ratingFocus ? "Rating" : "Rating"}
                searchPlaceholder="Search..."
                value={selectedRating} // Use selectedLocation here
                onFocus={() => setRatingFocus(true)}
                onBlur={() => setRatingFocus(false)}
                onChange={(item) => {
                  setFormData({ ...formData, rating: item.value }); // Update formData with rating
                  setSelectedRating(item); // Update selected rating for display
                  setRatingFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={ratingFocus ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
                // onChangeText={(Priority) => {
                //   setFsgrData({ ...fsgrData, Priority });
                // }}
              />
            </View>

            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
                onChangeText={(text) => handleInputChange("investigator", text)}
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
            {/* </View> */}
            {/* <View style={{ marginBottom: 5 }}> */}
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
            {/* </View> */}
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
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    width: "107%",
    alignSelf: "center",
  },
  dropdown: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default InitialInvestigationReport;
