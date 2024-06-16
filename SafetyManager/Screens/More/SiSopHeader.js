import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import Sop from "./Sop";
import SopForm from "./SopForm";

const SiSopHeader = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="SOP" />
        <Appbar.Action icon="magnify" />
        {/* <Appbar.Action
          icon="plus"
          onPress={() => {
            setVisible(true);
          }}
        /> */}
      </Appbar.Header>
      <Sop />
      <SopForm isVisible={visible} setIsVisible={setVisible} />
    </ScrollView>
  );
};

export default SiSopHeader;
