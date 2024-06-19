import React from "react";
import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

const duringOptions = [
  { label: "Option 1", value: "option1" },
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
            <TextInput
              label="Location Dropdown"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Reported By"
              mode="outlined"
              style={styles.input}
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
              onChange={(item) => console.log(item.value)}
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
              onChange={(item) => console.log(item.value)}
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
              onChange={(item) => console.log(item.value)}
            />
            <TextInput label="Comment" mode="outlined" style={styles.input} />
            <TextInput
              label="Description"
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Responsibility Of Closure"
              mode="outlined"
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.photoButton}>
                <Entypo name="camera" size={20} color="#4caf50" />
                <Text style={styles.photoButtonText}>Before Image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
});

export default ViolationForm;
