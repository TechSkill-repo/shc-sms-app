import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

const ViewTbt = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="View Details" />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>
    </View>
  );
};

export default ViewTbt;
