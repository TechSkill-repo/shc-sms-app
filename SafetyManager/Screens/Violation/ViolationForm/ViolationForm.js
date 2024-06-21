import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator, 
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { fetchLocations } from "../../../../components/Global/Global";
import * as ImagePicker from "expo-image-picker";
import { serveraddress } from "../../../../assets/values/Constants";

const duringOptions = [
  { label: "Line Walk", value: "LineWalk" },
  { label: "Option 2", value: "option2" },
];

const severityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
  { label: "Very High", value: "very_high" },
  { label: "Severe", value: "severe" },
];

const typeOptions = [
  { label: "Violation", value: "violation" },
  { label: "Good Observation", value: "good_observation" },
];

const ViolationForm = ({ visible, setVisible }) => {
  const windowHeight = Dimensions.get("window").height;
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reportedBy, setReportedBy] = useState("");
  const [during, setDuring] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [type, setType] = useState(null);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilityOfClosure, setResponsibilityOfClosure] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocationsData();
  }, []);

  const handleCameraPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
        console.log("Photo URI:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("location", selectedLocation);
      formData.append("reportedBy", reportedBy);
      formData.append("during", during);
      formData.append("severity", severity);
      formData.append("type", type);
      formData.append("comment", comment);
      formData.append("discription", description);
      formData.append("responsiblePerson", responsibilityOfClosure);
      formData.append("status", "pending");

      // Append the image file
      if (photoUri) {
        const filename = photoUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("violationBeforeImage", {
          uri: photoUri,
          name: filename,
          type: type,
        });
      }

      // Send the form data
      const response = await fetch(`${serveraddress}violation/`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });

      console.log("response violation:", response);

      if (!response.ok) {
        const responseData = await response.text();
        console.error("Server response:", responseData);
        throw new Error("Network response was not ok");
      }

      Alert.alert("Success", "Form submitted successfully!");

      // Reset form fields after successful submission
      setSelectedLocation(null);
      setReportedBy("");
      setDuring(null);
      setSeverity(null);
      setType(null);
      setComment("");
      setDescription("");
      setResponsibilityOfClosure("");
      setPhotoUri(null);
      setVisible(false);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to submit the form. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <ScrollView
          style={{
            ...styles.scrollView,
            height: windowHeight * 0.8,
            marginTop: windowHeight * 0.2,
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>VIOLATION & DAILY OBSERVATION</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setVisible(false)}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={locations.map((location) => ({
                label: location.name,
                value: location.id,
              }))}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={`Location`}
              searchPlaceholder="Search..."
              value={selectedLocation}
              onChange={(location) => {
                setSelectedLocation(location.label);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            <TextInput
              label="Reported By"
              mode="outlined"
              style={styles.input}
              value={reportedBy}
              onChangeText={setReportedBy}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={duringOptions}
              labelField="label"
              valueField="value"
              placeholder="During"
              searchPlaceholder="Search..."
              value={during}
              onChange={(item) => setDuring(item.value)}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={severityOptions}
              labelField="label"
              valueField="value"
              placeholder="Severity"
              searchPlaceholder="Search..."
              value={severity}
              onChange={(item) => setSeverity(item.value)}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={typeOptions}
              labelField="label"
              valueField="value"
              placeholder="Type"
              searchPlaceholder="Search..."
              value={type}
              onChange={(item) => setType(item.value)}
            />
            <TextInput
              label="Comment"
              mode="outlined"
              style={styles.input}
              value={comment}
              onChangeText={setComment}
            />
            <TextInput
              label="Description"
              mode="outlined"
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              label="Responsibility Of Closure"
              mode="outlined"
              style={styles.input}
              value={responsibilityOfClosure}
              onChangeText={setResponsibilityOfClosure}
            />
            {photoUri && (
              <View style={styles.photoPreviewContainer}>
                <Image source={{ uri: photoUri }} style={styles.photoPreview} />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleCameraPress}
                style={styles.photoButton}
              >
                <Entypo name="camera" size={20} color="#4caf50" />
                <Text style={styles.photoButtonText}>Before Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#21005d",
  },
  input: {
    marginVertical: 5,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 40,
  },
  photoButton: {
    backgroundColor: "#4caf501a",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    flexDirection: "row",
  },
  photoButtonText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "700",
    color: "#4caf50",
  },
  submitButton: {
    backgroundColor: "#21005d",
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  photoPreviewContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default ViolationForm;
