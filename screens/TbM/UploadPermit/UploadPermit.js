import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const UploadPermit = ({ viewUploadPermit, setViewUploadPermit }) => {
  const [parsedText, setParsedText] = useState(null);

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (res.type === "success") {
        const fileUri = res.uri;
        const fileName = res.name;
        const fileType = "application/pdf";

        // 📦 Read file as base64 (optional, for debug)
        const base64Data = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log("Base64 Encoded PDF:", base64Data.slice(0, 200) + "..."); // Print first 200 chars

        // Prepare file to send to backend
        const formData = new FormData();
        formData.append("file", {
          uri: fileUri,
          name: fileName,
          type: fileType,
        });

        // 🌐 Upload to your backend
        const response = await axios.post(
          "http://<your-ip>:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Parsed Text from Backend:", response.data.rawText);
        setParsedText(response.data.rawText);
        Alert.alert("Parsed Text", response.data.rawText.slice(0, 200) + "...");
      } else {
        console.log("Document picking cancelled");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Something went wrong during upload or parsing.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewUploadPermit}
      onRequestClose={() => setViewUploadPermit(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Upload Permit</Text>
          <Text style={styles.description}>
            Upload your permit document as a PDF file.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>Upload PDF</Text>
          </TouchableOpacity>

          {parsedText && (
            <ScrollView style={{ maxHeight: 200, marginTop: 10 }}>
              <Text>{parsedText}</Text>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UploadPermit;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "60%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
  },
  uploadText: {
    color: "#fff",
    fontSize: 16,
  },
});
