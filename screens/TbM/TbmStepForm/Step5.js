import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Step5 = ({
  onNext,
  onPrev,
  formData,
  setFormData,
  loading,
  createPdf,
}) => {
  const [inputList, setInputList] = useState([{ id: 1, text: "" }]);
  const [idCounter, setIdCounter] = useState(2);

  const handleAddInput = () => {
    const newInput = { id: idCounter, text: "" };
    setInputList([...inputList, newInput]);
    setIdCounter(idCounter + 1);
  };

  const handleRemoveInput = (idToRemove) => {
    const updatedList = inputList.filter((item) => item.id !== idToRemove);
    setInputList(updatedList);

    const updatedAttendance = formData.attendance.filter(
      (item, index) => index !== idToRemove - 1
    );
    setFormData({ ...formData, attendance: updatedAttendance });
  };

  const handleInputChange = (text, id) => {
    const updatedList = inputList.map((item) =>
      item.id === id ? { ...item, text: text } : item
    );
    setInputList(updatedList);

    const updatedAttendance = updatedList
      .map((item) => item.text.trim())
      .filter(Boolean);
    setFormData({ ...formData, attendance: updatedAttendance });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Employee Names</Text>

        {inputList.map((input, index) => (
          <View key={input.id} style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={input.text}
              onChangeText={(text) => handleInputChange(text, input.id)}
              placeholder={`Employee Name ${index + 1}`}
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => handleRemoveInput(input.id)}
                style={styles.removeButton}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddInput} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Employee</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPrev} style={styles.prevButton}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.submitButton}>
          <View style={styles.submitContent}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <>
                <Text style={styles.buttonText}>SUBMIT</Text>
                <MaterialIcons name="done" size={18} color="white" />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={createPdf} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download as PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "left",
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: "600",
    color: "#00308F",
    paddingRight: 15,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: "90%",
    backgroundColor: "#F5F5F5",
    elevation: 3,
    borderRadius: 5,
    color: "black",
  },
  removeButton: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "#244aca",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  prevButton: {
    backgroundColor: "rgb(120, 69, 172)",
    padding: 10,
    borderRadius: 50,
  },
  submitButton: {
    backgroundColor: "#209920",
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  submitContent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  downloadButton: {
    backgroundColor: "#00308F",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    width: "40%",
  },
  downloadButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
});

export default Step5;
