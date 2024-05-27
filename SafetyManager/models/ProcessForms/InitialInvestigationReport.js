import {
  View,
  Text,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import StepFormNavigation from "../../components/StepFormNavigation/StepFormNavigation";

const InitialInvestigationReport = ({ isVisible, setIsVisible }) => {
  const screenHeight = Dimensions.get("screen").height;
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
          <StepFormNavigation />
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
                What is the issue ?
              </Text>
              <TextInput
                placeholder="Please mention the issue in detail..."
                multiline
                numberOfLines={3}
                textAlignVertical="top"
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
                  What is the fact ?
                </Text>
                <TextInput
                  placeholder="Please mention the fact in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
                  What is the trouble arrises ?
                </Text>
                <TextInput
                  placeholder="Please mention the trouble in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
                  What is the issue arrises ?
                </Text>
                <TextInput
                  placeholder="Please mention the issue in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
                  How saviour this issue is ?
                </Text>
                <TextInput
                  placeholder="Please mention how saviour issue is..."
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
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
                  What is your Recommendation ?
                </Text>
                <TextInput
                  placeholder="Please mention the Recommendation in detail..."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
                  Investigation Done by ?
                </Text>
                <TextInput
                  placeholder="Person Name ?."
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
                  Approval will be done by ?
                </Text>
                <TextInput
                  placeholder="Officer name"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
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
              onPress={() => {
                // Handle submit action
                alert("Form Submitted");
              }}
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
