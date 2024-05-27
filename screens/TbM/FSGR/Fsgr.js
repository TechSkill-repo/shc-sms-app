import {
  View,
  Text,
  ScrollView,
  ImageBackgroundComponent,
  ActivityIndicator,
  Image,
} from "react-native";
import { Appbar } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { serveraddress } from "../../../assets/values/Constants";
import Loading from "../../../assets/logo/Loading.png";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const Fsgr = () => {
  const [loading, setLoading] = useState(false);
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
    reportDate: `${year}-${month}-${day}`,
    reportTime: `${hours}:${minutes}:${seconds}`,
    location: "",
    empName: "",
    empDesignation: "",
    inchargeName: "",
    siteSupervisor: "",
    priority: "",
    status: "pending",
    message: "",
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  }, [navigation]);

  const handleSubmit = () => {
    if (
      !fsgrData.location ||
      !fsgrData.empName ||
      !fsgrData.empDesignation ||
      !fsgrData.inchargeName ||
      !fsgrData.siteSupervisor ||
      !fsgrData.priority ||
      !fsgrData.status ||
      !fsgrData.message
    ) {
      alert("All fields are mandatory");
      return;
    }

    setLoading(true);

    console.log("data", fsgrData);
    axios
      .post(`${serveraddress}fsgr/form`, fsgrData)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Handle success, such as displaying a success message or navigating to another screen
        setLoading(false);

        alert("Form Submited Successfully");
        // showDialog("Form Submitted Successfully");
        navigation.navigate("ToolBoxTalk");
      })
      .catch((error) => {
        setLoading(false);
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
      {loading ? (
        // <ActivityIndicator size="large" color="#0000ff" />
        <Image
          source={Loading}
          style={{
            height: 500,
            width: "100%",
          }}
        />
      ) : (
        <Form
          fsgrData={fsgrData}
          setFsgrData={setFsgrData}
          currentDate={`${day}/${month}/${year}`}
          currentTime={`${hours}:${minutes}:${seconds}`}
          handleSubmit={handleSubmit}
        />
      )}
    </ScrollView>
  );
};

export default Fsgr;
