import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";
import Sop from "./Sop";
import SopForm from "./SopForm";

const SiSopHeader = () => {
  const [visible, setVisible] = useState(false);
  const [loadSearchBar, setLoadSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setLoadSearchBar((prevState) => !prevState);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="SOP" />
        <Appbar.Action icon="magnify" onPress={toggleSearchBar}/>
        {/* <Appbar.Action
          icon="plus"
          onPress={() => {
            setVisible(true);
          }}
        /> */}
      </Appbar.Header>
      <Sop loadSearchBar={loadSearchBar}/>
      <SopForm isVisible={visible} setIsVisible={setVisible} />
    </ScrollView>
  );
};

export default SiSopHeader;
