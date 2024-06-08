import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const SopForm = ({ isVisible, setIsVisible }) => {
  const windowHeight = Dimensions.get("window").height;
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
            height: windowHeight * 0.6, // 70% of the screen height
            marginTop: windowHeight * 0.4, // 30% from the top
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "500", color: "#21005d" }}>
              SOP Form
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <TextInput mode="outlined" label="SOP Title" />
            <TextInput
              style={{
                marginTop: 20,
              }}
              mode="outlined"
              label="SOP Description"
              multiline
              numberOfLines={3}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#376fd01a",
              padding: 10,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              // Assuming the correct import for DocumentPicker

              DocumentPicker.getDocumentAsync({
                type: "application/pdf", // Only PDFs
                copyToCacheDirectory: true,
              })
                .then((response) => {
                  if (response.type === "success") {
                    console.log("File URI:", response.uri); // Handle the file URI as needed
                  }
                })
                .catch((error) => {
                  console.error("Error picking document:", error);
                });
            }}
          >
            <AntDesign name="file1" size={20} color="#376fd0" />
            <Text
              style={{
                marginLeft: 10,
                color: "#376fd0",
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Upload SOP PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#21005d",
              padding: 10,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              // Submit the form data
              console.log("Submit button pressed");
              // Add your form submission logic here
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Submit SOP
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SopForm;
