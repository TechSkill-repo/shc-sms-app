import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TbmPage = () => {
  const navigation = useNavigation();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    }, 1000); // Update the current date every second

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = monthNames[monthIndex];
    return `${day} - ${month} - ${year}`;
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffaa00a1",
          height: 200,
        }}
      >
        <Text
          style={{
            paddingHorizontal: 25,
            paddingTop: 40,
            fontSize: 25,
            fontWeight: "700",
            color: "#2e2d6e",
          }}
        >
          Tool Box Meeting
        </Text>
        <Text
          style={{
            paddingHorizontal: 25,
            paddingVertical: 5,
            fontSize: 14,
            fontWeight: "300",
            color: "#2e2d6e",
          }}
        >
          Fill this tool box meeting which contains all the safety measures and
          principles.
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 25,
            paddingVertical: 20,
            alignItems: "center",
          }}
        >
          <AntDesign name="calendar" color="#2e2d6e" size={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "300",
              marginLeft: 5,
              color: "#2e2d6e",
            }}
          >
            {currentDate}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TbtForm");
          }}
          style={{
            marginTop: 40,
            backgroundColor: "#2e2d6e",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="file-waveform"
              size={20}
              color="#ffaa00"
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Tool Box Talk Form
            </Text>
          </View>
          <AntDesign name="right" size={20} color="#ffaa00" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DailyJobPlan");
          }}
          style={{
            marginTop: 30,
            backgroundColor: "#2e2d6e",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="person-running"
              size={20}
              color="#ffaa00"
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Daily Job Plan
            </Text>
          </View>
          <AntDesign name="right" size={20} color="#ffaa00" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ppeChecklist");
          }}
          style={{
            marginTop: 30,
            backgroundColor: "#2e2d6e",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="helmet-safety"
              size={20}
              color="#ffaa00"
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
              }}
            >
              PPE Check List
            </Text>
          </View>
          <AntDesign name="right" size={20} color="#ffaa00" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("toolsTackles");
          }}
          style={{
            marginTop: 30,
            backgroundColor: "#2e2d6e",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo
              name="tools"
              size={20}
              color="#ffaa00"
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
              }}
            >
              Tools and Tackles
            </Text>
          </View>
          <AntDesign name="right" size={20} color="#ffaa00" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("toolsTackles");
          }}
          style={{
            marginTop: 30,
            backgroundColor: "#2e2d6e",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="gripfire"
              size={20}
              color="#ffaa00"
              style={{
                marginRight: 15,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
              }}
            >
              F.S.G.R
            </Text>
          </View>
          <AntDesign name="right" size={20} color="#ffaa00" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TbmPage;
