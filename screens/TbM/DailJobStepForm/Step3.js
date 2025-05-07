import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Step3 = ({ onNext, onPrev, formData, setFormData, loading }) => {
  const hazardPlaceholders = ["North", "South", "East", "West", "Top", "Bottom"];

  const [hazardsInputList, setHazardsInputList] = useState(
    Array.from({ length: 6 }, (_, index) => ({ id: index + 1, text: "" }))
  );
  const [stepsInputList, setStepsInputList] = useState([{ id: 1, text: "" }]);
  const [stepsIdCounter, setStepsIdCounter] = useState(2);

  // Handle Hazard Input Change
  const handleHazardInputChange = (text, id) => {
    const updatedList = hazardsInputList.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setHazardsInputList(updatedList);

    const updatedHazardsDesc = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, hazardsDescription: updatedHazardsDesc });
  };

  // Handle Step Input Change
  const handleStepInputChange = (text, id) => {
    const updatedList = stepsInputList.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setStepsInputList(updatedList);

    const updatedSteps = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, necessarySteps: updatedSteps });
  };

  const handleAddStepInput = () => {
    setStepsInputList([...stepsInputList, { id: stepsIdCounter, text: "" }]);
    setStepsIdCounter(stepsIdCounter + 1);
  };

  const handleRemoveStepInput = (idToRemove) => {
    const updatedList = stepsInputList.filter((item) => item.id !== idToRemove);
    setStepsInputList(updatedList);

    const updatedSteps = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, necessarySteps: updatedSteps });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Hazards Inputs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enter Hazards Description</Text>

        {hazardsInputList.map((input, index) => (
          <View key={input.id} style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input.text}
              onChangeText={(text) => handleHazardInputChange(text, input.id)}
              placeholder={`Hazard - ${hazardPlaceholders[index]}`}
              placeholderTextColor="#999"
            />
          </View>
        ))}
      </View>

      {/* Necessary Steps Inputs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enter Necessary Steps Taken</Text>

        {stepsInputList.map((input, index) => (
          <View key={input.id} style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={input.text}
              onChangeText={(text) => handleStepInputChange(text, input.id)}
              placeholder={`Necessary Step ${index + 1}`}
              placeholderTextColor="#999"
            />
            {index > 0 && (
              <TouchableOpacity
                onPress={() => handleRemoveStepInput(input.id)}
                style={styles.deleteButton}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddStepInput} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Step</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onPrev} style={styles.prevButton}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} style={styles.submitButton}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.submitContent}>
              <Text style={styles.buttonText}>SUBMIT</Text>
              <MaterialIcons name="done" size={18} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Step3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00308F",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    elevation: 2,
    borderRadius: 5,
    color: "black",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
  },
  addButton: {
    width: "50%",
    marginTop: 10,
    backgroundColor: "#244aca",
    paddingVertical: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  prevButton: {
    backgroundColor: "rgb(120, 69, 172)",
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  submitButton: {
    backgroundColor: "#209920",
    padding: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  submitContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginRight: 5,
  },
});
