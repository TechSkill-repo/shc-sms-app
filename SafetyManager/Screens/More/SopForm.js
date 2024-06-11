import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { serveraddress } from "../../../assets/values/Constants";

const SopForm = ({ isVisible, setIsVisible }) => {
  const windowHeight = Dimensions.get("window").height;
  const [loading, setLoading] = useState(false);
  const [sopTitle, setSopTitle] = useState("");
  const [sopDescription, setSopDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);

  const handleDocumentPick = useCallback(async () => {
    try {
      setLoading(true);
      const response = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      console.log("Document Picker Response:", response);
      if (!response.canceled && response.assets && response.assets.length > 0) {
        const selectedFile = response.assets[0];
        setFile(selectedFile);
        console.log("File URI:", selectedFile.uri);
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!sopTitle || !sopDescription || !location || !file) {
      Alert.alert("Error", "Please fill all fields and upload a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("sopTitle", sopTitle);
    formData.append("sopDescription", sopDescription);
    formData.append("location", location);
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: "application/pdf", // explicitly set the MIME type
    });

    try {
      setLoading(true);
      const response = await fetch(`${serveraddress}sop/send`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Success", "SOP submitted successfully.");
        setIsVisible(false);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", `Failed to submit SOP: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting SOP:", error);
      Alert.alert("Error", "An error occurred while submitting SOP.");
    } finally {
      setLoading(false);
    }
  }, [sopTitle, sopDescription, location, file, setIsVisible]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <ScrollView
          style={[
            styles.container,
            { height: windowHeight * 0.6, marginTop: windowHeight * 0.4 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>SOP Form</Text>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="SOP Title"
              value={sopTitle}
              onChangeText={setSopTitle}
            />
            <TextInput
              style={styles.textArea}
              mode="outlined"
              label="SOP Description"
              multiline
              numberOfLines={3}
              value={sopDescription}
              onChangeText={setSopDescription}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleDocumentPick}
            disabled={loading}
          >
            <AntDesign name="file1" size={20} color="#376fd0" />
            <Text style={styles.uploadButtonText}>
              {file ? file.name : loading ? "Uploading..." : "Upload SOP PDF"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Submitting..." : "Submit SOP"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
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
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "#21005d",
  },
  inputContainer: {
    marginTop: 20,
  },
  textArea: {
    marginTop: 20,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: "#376fd01a",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    marginLeft: 10,
    color: "#376fd0",
    fontWeight: "500",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#21005d",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
};

export default SopForm;
