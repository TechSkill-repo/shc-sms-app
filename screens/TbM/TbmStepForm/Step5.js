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

const Step5 = ({ onNext, onPrev, formData, setFormData }) => {
  const [inputList, setInputList] = useState([{ id: 1, text: "" }]);
  const [idCounter, setIdCounter] = useState(2); // Counter for generating unique ids

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
          Enter Employee Names
        </Text>

        {inputList.map((input, index) => (
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
              onChangeText={(text) => handleInputChange(text, input.id)}
              placeholder={`Employee Name ${index + 1}`}
            />
            {index > 0 && ( // Render remove button for all inputs except the first one
              <TouchableOpacity
                onPress={() => handleRemoveInput(input.id)}
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
          onPress={handleAddInput}
          style={{
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
            + Add Employee
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
            backgroundColor: "rgb(120, 69, 172)",
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
            backgroundColor: "#209920",
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
export default Step5;
