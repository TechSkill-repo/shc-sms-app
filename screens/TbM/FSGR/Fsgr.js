import { View, Text, ScrollView, ImageBackgroundComponent } from "react-native";
import { Appbar } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";

const Fsgr = () => {
  const navigation = useNavigation();

  const currentDate = new Date();

  const day = currentDate.getDate(); // Returns the
  const month = currentDate.getMonth() + 1; //
  const year = currentDate.getFullYear(); // Returns

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    // Update the current time every second
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the timer
    return () => {
      clearInterval(timerID);
    };
  }, []);

  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const [fsgrData, setFsgrData] = useState({
    Report_Date: `${year}-${month}-${day}`,
    Report_Time: `${hours}:${minutes}:${seconds}`,
    Location: "",
    Emp_Name: "",
    Emp_Designation: "",
    Incharge_Name: "",
    Site_Supervisior: "",
    Message: "",
  });

  const handleSubmit = () => {
    axios
      .post(`${serveraddress}fsgr/table`, fsgrData)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Handle success, such as displaying a success message or navigating to another screen
        navigation.navigate("ToolBoxTalk");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        // Handle error, such as displaying an error message to the user
      });
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
        currentDate={`${day}/${month}/${year}`}
        currentTime={`${hours}:${minutes}:${seconds}`}
        handleSubmit={handleSubmit}
      />
    </ScrollView>
  );
};

export default Fsgr;
