import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { fetchLocations } from "../../../components/Global/Global";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

const dataPriority = [
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
];

const Form = ({
  handleSubmit,
  fsgrData,
  setFsgrData,
  currentDate,
  currentTime,
  loadingSubmit,
}) => {
  const [locations, setLocations] = useState([]);
  const [locationFocus, setLocationFocus] = useState(false);
  const [priorityFocus, setPriorityFocus] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const data = await fetchLocations();
        setLocations(
          data.map((location) => ({
            label: location.name,
            value: location.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocationsData();
  }, []);

  const handleInputChange = (field, value) => {
    setFsgrData((prevState) => ({ ...prevState, [field]: value }));
  };

  // const openCamera = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Denied",
  //       "Camera permissions are required to take a photo."
  //     );
  //     return;
  //   }
  //   const result = await ImagePicker.launchCameraAsync();
  //   if (!result.cancelled) {
  //     handleInputChange("photoUri", result.uri);
  //   }
  // };

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
        // setPhotoUri(result.assets[0].uri);

        const uri = result.assets[0].uri;
        setPhotoUri(uri);
        handleInputChange("beforeImage", uri);
        console.log("Photo URI:", uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const renderLabel = (label, isFocus) => {
    if (locationFocus || priorityFocus || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.inputRow}>
        <TextInput
          mode="outlined"
          label="Report Date"
          value={currentDate}
          editable={false}
          style={styles.halfWidth}
        />
        <TextInput
          mode="outlined"
          label="Time of Report"
          value={currentTime}
          editable={false}
          style={styles.halfWidth}
        />
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.container}>
          {renderLabel("Location", locationFocus)}
          <Dropdown
            style={[styles.dropdown, locationFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={locations}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={fsgrData.location ? fsgrData.location : "Location"}
            searchPlaceholder="Search..."
            onFocus={() => setLocationFocus(true)}
            onBlur={() => setLocationFocus(false)}
            value={fsgrData.location}
            onChange={(item) => handleInputChange("location", item.label)}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={locationFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        <TextInput
          mode="outlined"
          label="FSGR Title"
          style={styles.fullWidth}
          value={fsgrData.title}
          onChangeText={(text) => handleInputChange("heading", text)}
        />

        <TextInput
          mode="outlined"
          label="Employee Name"
          style={styles.fullWidth}
          value={fsgrData.employeename}
          onChangeText={(text) => handleInputChange("empName", text)}
        />

        <TextInput
          mode="outlined"
          label="Employee Designation"
          style={styles.fullWidth}
          value={fsgrData.employeedesignation}
          onChangeText={(text) => handleInputChange("empDesignation", text)}
        />

        <TextInput
          mode="outlined"
          label="Incharge Name"
          style={styles.fullWidth}
          value={fsgrData.inchargename}
          onChangeText={(text) => handleInputChange("inchargeName", text)}
        />

        <TextInput
          mode="outlined"
          label="Safety Supervisor Name"
          style={styles.fullWidth}
          value={fsgrData.safetysupervisorname}
          onChangeText={(text) => handleInputChange("siteSupervisor", text)}
        />

        <View style={styles.container}>
          {renderLabel("Priority", priorityFocus)}
          <Dropdown
            style={[styles.dropdown, priorityFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataPriority}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!priorityFocus ? "Priority" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => setPriorityFocus(true)}
            onBlur={() => setPriorityFocus(false)}
            value={fsgrData.priority}
            onChange={(item) => handleInputChange("priority", item.value)}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={priorityFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        <TextInput
          mode="outlined"
          label="What is your problem?"
          style={styles.fullWidth}
          value={fsgrData.message}
          onChangeText={(text) => handleInputChange("message", text)}
          multiline
          numberOfLines={3}
        />
        {photoUri ? ( // Show image preview if photoUri is available
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: photoUri }} style={styles.imagePreview} />
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCameraPress}
            style={styles.photoButton}
          >
            <Entypo name="camera" size={20} color="#6750a4" />
            <Text style={styles.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Submit Report</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    padding: 8,
  },
  inputRow: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  halfWidth: {
    width: "45%",
  },
  centerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    width: "100%",
    marginBottom: 0,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
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
  fullWidth: {
    marginTop: 10,
    width: "95%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  photoButton: {
    backgroundColor: "#6750a41a",
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    flexDirection: "row",
  },
  photoButtonText: {
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "700",
    color: "#6750a4",
  },
  submitButton: {
    backgroundColor: "#21005d",
    height: 45,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    width: "45%",
    flexDirection: "row",
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
});

export default Form;
