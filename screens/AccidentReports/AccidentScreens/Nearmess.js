import { View, Text, ScrollView } from "react-native";
import React from "react";

const Nearmess = () => {
  const data = [
    {
      Date: "",
      Location: "",
      SupervisorName: "",
      PersonName: "",
      IncidentType: "",
      Message: "",
    },
  ];
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          width: "90%",
        }}
      >
        <Text>Hello</Text>
      </View>
    </View>
  );
};

export default Nearmess;
