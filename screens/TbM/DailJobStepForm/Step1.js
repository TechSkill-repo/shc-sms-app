import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Step1 = ({ onNext }) => {
  const currentDate = new Date();

  const [permitNumber, setPermitNumber] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const navigation = useNavigation();

  const [shift, setShift] = useState("");
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

  // Extract day, month (in number), and year
  const day = currentDate.getDate(); // Returns the day of the month (1-31)
  const month = currentDate.getMonth() + 1; // Returns the month (0-11); adding 1 to get the actual month number
  const year = currentDate.getFullYear(); // Returns the year (e.g., 2024)

  useEffect(() => {
    if (hours > 6 && hours < 8) {
      setShift("Morning A Shift");
    } else if (hours > 8 && hours < 12) {
      setShift("Morning General Shift");
    } else if (hours > 12 && hours < 17) {
      setShift("Afternoon B Shift");
    } else {
      setShift("Night C Shift");
    }
  }, []);
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        // justifyContent: "center",
        flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "#ffaa00a1",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ToolBoxTalk");
          }}
        >
          <AntDesign name="left" size={25} color="#2e2d6e" />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: "#2e2d6e",
              fontSize: 22,
              marginLeft: 20,
              fontWeight: "600",
            }}
          >
            Daily Job Plan
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          Today's Date
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          value={`${day}/${month}/${year}`}
          placeholder="Date"
          editable={false}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          Current Time
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Time"
          value={`${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`}
          editable={false}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          Current Shift
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Shift"
          value={shift}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          Site Location
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          placeholder="Enter Your Site Location"
        />
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontSize: 14,
            paddingHorizontal: 5,
            paddingVertical: 5,
            fontWeight: "600",
            color: "#00308F",
          }}
        >
          Work Order / Permit Number
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            width: "90%",
            backgroundColor: "#F5F5F5",
            elevation: 3,
            borderRadius: 5,
            color: "black",
          }}
          value={permitNumber}
          placeholder="Enter Your Permit Number"
          // onChangeText={(permitNumber)=>{setFormData({...formData, permitNumber})}}
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <TouchableOpacity
          onPress={onNext}
          style={{
            backgroundColor: "#2e2d6e",
            padding: 10,
            borderRadius: 50,
            position: "absolute",
            bottom: 0,
            right: 20,
          }}
        >
          {/* <Button title="Next" onPress={onNext} /> */}
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 0,
                fontSize: 16,
                textAlign: "center",
                fontWeight: "500",
                color: "white",
              }}
            >
              Next
            </Text>
            <AntDesign name="right" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Step1;
