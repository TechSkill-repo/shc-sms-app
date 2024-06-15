import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { serveraddress } from "../../../../assets/values/Constants";

const TrainingTest = () => {
  const [testName, setTestName] = useState("");
  const [location, setLocation] = useState("");
  const [aboutTest, setAboutTest] = useState("");
  const [students, setStudents] = useState([
    { empName: "", empMarks: "", testStatus: "" },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const isFormValid = () => {
      if (!testName || !location || !aboutTest) return false;
      return students.every(
        (student) => student.empName && student.empMarks && student.testStatus
      );
    };
    setIsSubmitDisabled(!isFormValid());
  }, [testName, location, aboutTest, students]);

  const addStudent = () => {
    setStudents([...students, { empName: "", empMarks: "", testStatus: "" }]);
  };

  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  const handleSubmit = async () => {
    const payload = {
      testName,
      location,
      aboutTest,
      marks: students,
    };

    try {
      const response = await fetch(`${serveraddress}training/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert("Success", "Exam data submitted successfully");
        setTestName("");
        setLocation("");
        setAboutTest("");
        setStudents([{ empName: "", empMarks: "", testStatus: "" }]);
      } else {
        Alert.alert("Error", "Failed to submit exam data");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting the data");
    }
  };

  const renderStudentInput = (student, index) => (
    <View key={index} style={styles.studentInputContainer}>
      <TextInput
        label="Name"
        mode="outlined"
        value={student.empName}
        onChangeText={(text) => handleInputChange(index, "empName", text)}
        style={styles.studentInput}
      />
      <TextInput
        label="Marks"
        mode="outlined"
        value={student.empMarks}
        onChangeText={(text) => handleInputChange(index, "empMarks", text)}
        style={styles.studentInput}
      />
      <TextInput
        label="Status"
        mode="outlined"
        value={student.testStatus}
        onChangeText={(text) => handleInputChange(index, "testStatus", text)}
        style={styles.studentInput}
      />
      <MaterialIcons
        name="delete"
        size={25}
        color="#f44336"
        onPress={() => removeStudent(index)}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="Training Exam" />
      </Appbar.Header>
      <Text style={styles.headerText}>Conduct Exam</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Test Name"
          mode="outlined"
          value={testName}
          onChangeText={(text) => setTestName(text)}
          style={styles.input}
        />
        <TextInput
          label="Locations"
          mode="outlined"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />
        <TextInput
          label="About Test"
          mode="outlined"
          multiline
          value={aboutTest}
          onChangeText={(text) => setAboutTest(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.studentsContainer}>
        {students.map(renderStudentInput)}
        <TouchableOpacity onPress={addStudent} style={styles.addButton}>
          <Entypo name="plus" size={20} color="#21005d" />
          <Text style={styles.addButtonText}>Add Employee Marks</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          style={[
            styles.submitButton,
            { backgroundColor: isSubmitDisabled ? "#ccc" : "#21005d" },
          ]}
        >
          <Text style={styles.submitButtonText}>Submit Exam</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  headerText: {
    margin: 10,
    fontSize: 22,
    paddingHorizontal: 10,
    fontWeight: "500",
    color: "#21005d",
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  studentsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  studentInputContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studentInput: {
    marginBottom: 5,
    width: "30%",
  },
  addButton: {
    backgroundColor: "#21005d1a",
    width: "50%",
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    textAlign: "center",
    color: "#21005d",
    fontWeight: "600",
    fontSize: 12,
  },
  submitContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitButton: {
    width: "90%",
    paddingVertical: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});

export default TrainingTest;
