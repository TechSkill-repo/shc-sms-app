import { View, Text, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Form from "./Form";
import { useState, useEffect } from "react";

const Fsgr = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [fsgrData, setFsgrData] = useState({
    Report_Date: currentDate,
    Report_Time: currentTime,
    Location: "",
    Emp_Name: "",
    Emp_Designation: "",
    Incharge_Name: "",
    Site_Supervisior: "",
    Message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      setCurrentDate(`${date}-${month}-${year}`);
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    console.log(fsgrData);
  };

  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate("ToolBoxTalk");
          }}
        />
        <Appbar.Content title="FSGR" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Form
        fsgrData={fsgrData}
        setFsgrData={setFsgrData}
        currentDate={currentDate}
        currentTime={currentTime}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

export default Fsgr;
