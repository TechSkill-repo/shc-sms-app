import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { serveraddress } from "../../../../assets/values/Constants";
import { useNavigation } from "@react-navigation/native";
import { fetchLocations } from "../../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";

const passData = [
  { label: "Pass", value: "pass" },
  { label: "Fail", value: "fail" },
];

const TrainingTest = () => {
  const [testName, setTestName] = useState("");
  const [aboutTest, setAboutTest] = useState("");
  const [students, setStudents] = useState([
    { empName: "", empMarks: "", testStatus: "" },
  ]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const [passFocus, setPassFocus] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);

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

  const handleLocationChange = (selectedLocation) => {
    setSelectedLocation(selectedLocation.label);
  };

  useEffect(() => {
    const isFormValid = () => {
      if (!testName || !selectedLocation || !aboutTest) return false;
      return students.every(
        (student) => student.empName && student.empMarks && student.testStatus
      );
    };
    setIsSubmitDisabled(!isFormValid());
  }, [testName, selectedLocation, aboutTest, students]);

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
    setIsLoading(true);

    const transformedStudents = students.map((student) => ({
      ...student,
      testStatus: student.testStatus.value, // Extract only the value of testStatus
    }));

    const payload = {
      testName,
      selectedLocation,
      aboutTest,
      marks: transformedStudents,
    };

    console.log(JSON.stringify(payload));
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
        setSelectedLocation("");
        setAboutTest("");
        setStudents([{ empName: "", empMarks: "", testStatus: "" }]);
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to submit exam data");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "An error occurred while submitting the data");
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePassChange = (value, index) => {
  //   const newStudents = [...students];
  //   newStudents[index].testStatus = value; // Update testStatus for the selected student
  //   setStudents(newStudents);
  // };

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
      {/* <TextInput
        label="Pass/Fail"
        mode="outlined"
        value={student.testStatus}
        onChangeText={(text) => handleInputChange(index, "testStatus", text)}
        style={styles.studentInput}
      /> */}
      <Dropdown
        style={{
          width: "30%",
          height: 50,
          borderRadius: 7,
          padding: 12,
          borderColor: "#212121",
          borderWidth: 0.8,
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={passData}
        labelField="label"
        valueField="value"
        placeholder="P/F"
        searchPlaceholder="Search..."
        value={student.testStatus}
        onChange={(item) => handleInputChange(index, "testStatus", item)}
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
        {/* <TextInput
          label="Locations"
          mode="outlined"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        /> */}
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
          disabled={isSubmitDisabled || isLoading} // Disable while loading
          style={[
            styles.submitButton,
            {
              backgroundColor:
                isSubmitDisabled || isLoading ? "#ccc" : "#21005d",
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" /> // Show loading spinner
          ) : (
            <Text style={styles.submitButtonText}>Submit Exam</Text>
          )}
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
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 7,
    padding: 12,
    borderColor: "#212121",
    borderWidth: 0.8,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
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

export default TrainingTest;
