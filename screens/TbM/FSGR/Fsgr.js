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

const Fsgr = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigation = useNavigation();
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day has 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure month has 2 digits
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Format the current time as hh:mm:ss
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure hours have 2 digits
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure minutes have 2 digits
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Ensure seconds have 2 digits
    return `${hours}:${minutes}:${seconds}`;
  };

  const currentDate = new Date();
  const [currentTime, setCurrentTime] = useState(currentDate);

  // useEffect(() => {
  //   // Update the current time every second
  //   const timerID = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   // Clean up the timer
  //   return () => {
  //     clearInterval(timerID);
  //   };
  // }, []);

  // // Extract hours, minutes, and seconds
  // const hours = currentTime.getHours();
  // const minutes = currentTime.getMinutes();
  // const seconds = currentTime.getSeconds();

  const [fsgrData, setFsgrData] = useState({
    reportDate: formatDate(currentDate),
    reportTime: formatTime(currentDate),
    heading: "",
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

    const timerID = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setFsgrData((prevData) => ({
        ...prevData,
        reportTime: formatTime(now), // Update reportTime every second
      }));
    }, 1000);

    // Clean up the timer
    return () => {
      clearInterval(timerID);
    };
  }, [navigation]);

  const handleSubmit = () => {
    setLoadingSubmit(true);
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
      setLoadingSubmit(false);
      return;
    }

    // // Set current date and time just before making the API call
    // const currentDate = new Date();
    // const day = currentDate.getDate();
    // const month = currentDate.getMonth() + 1;
    // const year = currentDate.getFullYear();
    // const hours = currentDate.getHours();
    // const minutes = currentDate.getMinutes();
    // const seconds = currentDate.getSeconds();

    // // Update fsgrData with current date and time
    // setFsgrData((prevData) => ({
    //   ...prevData,
    //   reportDate: `${year}-${month}-${day}`,
    //   reportTime: `${hours}:${minutes}:${seconds}`,
    // }));

    // setLoading(true);

    console.log("data", fsgrData);
    axios
      .post(`${serveraddress}fsgr/form`, fsgrData)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        // Handle success, such as displaying a success message or navigating to another screen
        // setLoading(false);

        alert("Form Submited Successfully");
        // showDialog("Form Submitted Successfully");
        navigation.navigate("ToolBoxTalk");
      })
      .catch((error) => {
        // setLoading(false);
        console.error("Error sending data:", error);
        // Handle error, such as displaying an error message to the user
      })
      .finally(() => {
        setLoadingSubmit(false);
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
        currentDate={formatDate(currentDate)}
        currentTime={formatTime(currentTime)}
        handleSubmit={handleSubmit}
        loadingSubmit={loadingSubmit}
      />
    </ScrollView>
  );
};

export default Fsgr;
