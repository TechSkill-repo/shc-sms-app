import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import ViolationForm from "./ViolationForm/ViolationForm";
import ViolationCard from "./ViolationCards/ViolationCard";

const Violation = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction />
        <Appbar.Content title="VIOLATION & OBSERVATION" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            setVisible(true);
          }}
        />
      </Appbar.Header>
      <ViolationForm visible={visible} setVisible={setVisible} />
      <ViolationCard />
    </ScrollView>
  );
};

export default Violation;
