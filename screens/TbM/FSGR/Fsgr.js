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
    beforeImage: "",
  });

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "flex",
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
  }, []);

  // console.log("before image", fsgrData.beforeImage);

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    if (!fsgrData.location || !fsgrData.empName) {
      alert("All fields are mandatory");
      setLoadingSubmit(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("reportDate", formatDate(currentDate));
      formData.append("reportTime", formatTime(currentDate));
      formData.append("location", fsgrData.location);
      formData.append("empName", fsgrData.empName);
      formData.append("heading", formData.heading);
      formData.append("empDesignation", fsgrData.empDesignation);
      formData.append("inchargeName", fsgrData.inchargeName);
      formData.append("siteSupervisor", fsgrData.siteSupervisor);
      formData.append("priority", fsgrData.priority);
      formData.append("status", fsgrData.status);
      formData.append("message", fsgrData.message);

      if (fsgrData.beforeImage) {
        const filename = fsgrData.beforeImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("beforeImage", {
          uri: fsgrData.beforeImage,
          name: filename,
          type: type,
        });
      }

      // Send the form data using Axios
      const response = await fetch(`${serveraddress}fsgr/form/`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Data sent successfully:", response.data);
      alert("Form Submitted Successfully");
      navigation.navigate("ToolBoxTalk");
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      console.error("Error sending data:", error);
      console.log("Error response:", error.response);
    }
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
