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
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

const ppeItemData = [
  { label: "Safety Shoes", value: "safetyShoes" },
  { label: "Safety Helmet with chain Strap", value: "safetyHelmet" },
  { label: "Safety Ear Plug", value: "safetyEarPlug" },
  { label: "Safety Hand Gloves", value: "safetyHandGlove" },
  { label: "Safety Goggles", value: "safetyGoggles" },
  { label: "Safety Florescent Jacket", value: "safetyJacket" },
  { label: "Safety Resistant Jacket", value: "safetyResistant" },
  { label: "Safety Heat Jacket", value: "safetyHeat" },
  { label: "Safety Dust Mask", value: "safetyDustMask" },
  { label: "Safety Leg Guard", value: "safetyLegGuard" },
  { label: "Safety Face Shield", value: "safetyFaceShield" },
];

const Step2 = ({ onNext, onPrev, formData, setStep2Data, step1Data, loading }) => {
  const [idCounter, setIdCounter] = useState(2);
  const [inputList, setInputList] = useState([
    {
      id: 1,
      empName: "",
      ppeStatus: ppeItemData.reduce((acc, item) => {
        acc[item.value] = null; // null = not selected, true = good, false = bad
        return acc;
      }, {}),
    },
  ]);

  const handleAddInput = () => {
    const newInput = {
      id: idCounter,
      empName: "",
      ppeStatus: ppeItemData.reduce((acc, item) => {
        acc[item.value] = null;
        return acc;
      }, {}),
    };
    setInputList([...inputList, newInput]);
    setIdCounter(idCounter + 1);
  };

  const handleRemoveInput = (idToRemove) => {
    const updatedList = inputList.filter((item) => item.id !== idToRemove);
    setInputList(updatedList);
    const updatedPPE = formData.empId?.filter((item) => item.id !== idToRemove) || [];
    setStep2Data({ ...formData, empId: updatedPPE });
  };

  const handleInputChange = (text, id, field) => {
    const updatedList = inputList.map((item) =>
      item.id === id ? { ...item, [field]: text } : item
    );
    setInputList(updatedList);
    setStep2Data({ ...formData, ppe: updatedList });
  };

  const handlePPEStatusChange = (id, itemKey, status) => {
    const updatedList = inputList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ppeStatus: { ...item.ppeStatus, [itemKey]: status },
        };
      }
      return item;
    });
    setInputList(updatedList);
    setStep2Data({ ...formData, ppe: updatedList });
  };

  const handleNext = () => {
    const combinedFormData = {
      ...step1Data,
      ...formData,
      ppe: inputList,
    };
    console.log("Form data:", combinedFormData);
    onNext();
  };

  return (
    <ScrollView style={{ backgroundColor: "white", width: "100%" }}>
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>PPE</Text>

        {inputList.map((input, index) => (
          <View key={input.id} style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={input.empName}
              onChangeText={(text) => handleInputChange(text, input.id, "empName")}
              placeholder={`Employee Name ${index + 1}`}
            />

            <View style={{ width: "100%" }}>
              {ppeItemData.map((ppe, ppeIndex) => (
                <View key={ppeIndex} style={styles.ppeItemRow}>
                  <Text style={{ fontSize: 12 }}>{ppe.label}</Text>
                  <View style={styles.iconRow}>
                    <TouchableOpacity
                      onPress={() => handlePPEStatusChange(input.id, ppe.value, true)}
                    >
                      <AntDesign
                        name="checkcircle"
                        size={18}
                        color={
                          input.ppeStatus[ppe.value] === true ? "green" : "grey"
                        }
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handlePPEStatusChange(input.id, ppe.value, false)}
                    >
                      <Entypo
                        name="circle-with-cross"
                        size={18}
                        color={
                          input.ppeStatus[ppe.value] === false ? "red" : "grey"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {index > 0 && (
              <TouchableOpacity
                onPress={() => handleRemoveInput(input.id)}
                style={styles.deleteButton}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddInput} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Tools</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={onPrev} style={styles.prevButton}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.submitButton}>
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

export default Step2;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00308F",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  textInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    color: "black",
  },
  ppeItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  iconRow: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  addButton: {
    backgroundColor: "#244aca",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 30,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  submitContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
