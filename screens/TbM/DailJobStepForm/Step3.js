import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Step3 = ({ onNext, onPrev, formData, setFormData }) => {
  const [hazardsInputList, setHazardsInputList] = useState([{ id: 1, text: "" }]);
  const [stepsInputList, setStepsInputList] = useState([{ id: 1, text: "" }]);
  const [hazardsIdCounter, setHazardsIdCounter] = useState(2);
  const [stepsIdCounter, setStepsIdCounter] = useState(2);

  const [inputList, setInputList] = useState([{ id: 1, text: "" }]);
  const [idCounter, setIdCounter] = useState(2); // Counter for generating unique ids

  const handleAddHazardInput = () => {
    const newInput = { id: hazardsIdCounter, text: "" };
    setHazardsInputList([...hazardsInputList, newInput]);
    setHazardsIdCounter(hazardsIdCounter + 1);
  };

  const handleRemoveHazardInput = (idToRemove) => {
    const updatedList = hazardsInputList.filter((item) => item.id !== idToRemove);
    setHazardsInputList(updatedList);

    const updatedHazardsDesc = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, hazardsDescription: updatedHazardsDesc });
  };

  const handleHazardInputChange = (text, id) => {
    const updatedList = hazardsInputList.map((item) =>
      item.id === id ? { ...item, text: text } : item
    );
    setHazardsInputList(updatedList);

    const updatedHazardsDesc = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, hazardsDescription: updatedHazardsDesc });
  };

  // necessary steps
  const handleAddStepInput = () => {
    const newInput = { id: stepsIdCounter, text: "" };
    setStepsInputList([...stepsInputList, newInput]);
    setStepsIdCounter(stepsIdCounter + 1);
  };

  const handleRemoveStepInput = (idToRemove) => {
    const updatedList = stepsInputList.filter((item) => item.id !== idToRemove);
    setStepsInputList(updatedList);

    const updatedSteps = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, necessarySteps: updatedSteps });
  };

  const handleStepInputChange = (text, id) => {
    const updatedList = stepsInputList.map((item) =>
      item.id === id ? { ...item, text: text } : item
    );
    setStepsInputList(updatedList);

    const updatedSteps = updatedList.map((item) => item.text.trim());
    setFormData({ ...formData, necessarySteps: updatedSteps });
  };
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "#ffaa00a1",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "#2e2d6e",
              fontSize: 22,
              marginLeft: 0,
              fontWeight: "600",
            }}
          >
            Hazards & Necessary Steps
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          //   justifyContent: "center",
          //   alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
            paddingRight: 15,
            marginBottom: 10,
          }}
        >
          Enter Hazards Description
        </Text>

        {hazardsInputList.map((input, index) => (
          <View
            key={input.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                width: "90%",
                backgroundColor: "#F5F5F5",
                elevation: 3,
                borderRadius: 5,
                color: "black",
              }}
              value={input.text}
              onChangeText={(text) => handleHazardInputChange(text, input.id)}
              placeholder={`Hazards Description ${index + 1}`}
            />
            {index > 0 && ( // Render remove button for all inputs except the first one
              <TouchableOpacity
                onPress={() => handleRemoveHazardInput(input.id)}
                style={{
                  marginTop: 10,
                  // backgroundColor: "#244aca",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 50,
                  // marginLeft: 10,
                }}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {/* <Button title="+" onPress={handleAddInput} /> */}
        <TouchableOpacity
          onPress={handleAddHazardInput}
          style={{
            width: "50%",
            marginTop: 10,
            backgroundColor: "#244aca",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            + Add Hazard
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          //   justifyContent: "center",
          //   alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
            paddingRight: 15,
            marginBottom: 10,
          }}
        >
          Enter Necessary Steps Taken
        </Text>

        {stepsInputList.map((input, index) => (
          <View
            key={input.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                width: "90%",
                backgroundColor: "#F5F5F5",
                elevation: 3,
                borderRadius: 5,
                color: "black",
              }}
              value={input.text}
              onChangeText={(text) => handleStepInputChange(text, input.id)}
              placeholder={`Necessary Step ${index + 1}`}
            />
            {index > 0 && ( // Render remove button for all inputs except the first one
              <TouchableOpacity
                onPress={() => handleRemoveStepInput(input.id)}
                style={{
                  marginTop: 10,
                  // backgroundColor: "#244aca",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 50,
                  // marginLeft: 10,
                }}
              >
              <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {/* <Button title="+" onPress={handleAddInput} /> */}
        <TouchableOpacity
          onPress={handleAddStepInput}
          style={{
            width: "50%",
            marginTop: 10,
            backgroundColor: "#244aca",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#fff",
            }}
          >
            + Add Step
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={onPrev}
          style={{
            backgroundColor: "#2e2d6e",
            padding: 10,
            borderRadius: 50,
          }}
        >
          {/* <Button title="Next" onPress={onNext} /> */}
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 0,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "500",
              color: "white",
            }}
          >
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 10,
            borderRadius: 50,
            marginLeft: 10,
          }}
          onPress={onNext}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 0,
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
                color: "white",
              }}
            >
              SUBMIT
            </Text>
            <MaterialIcons name="done" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Step3;
