import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

const Step1 = ({ onNext, formData, setStep1Data }) => {
  const currentDate = new Date();

  const [permitNumber, setPermitNumber] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

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

  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
  }, [navigation]);

  // Extract day, month (in number), and year
  const day = currentDate.getDate(); // Returns the day of the month (1-31)
  const month = currentDate.getMonth() + 1; // Returns the month (0-11); adding 1 to get the actual month number
  const year = currentDate.getFullYear(); // Returns the year (e.g., 2024)

  const todaysDate = `${day}/${month}/${year}`;

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
            Tools and Tackles
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
        // onChangeText={(todaysDate) => { setFormData({ ...formData, todaysDate }) }}
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
          Location
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
          placeholder="Location"
          value={formData.location}
          // editable={false}
          onChangeText={(location) => { setStep1Data({ ...formData, location }) }}
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
          Work permit number
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
          placeholder="Work permit number"
          value={permitNumber}
          onChangeText={(permitNumber) => {
            setPermitNumber(permitNumber); setStep1Data({ ...formData, permitNumber })
          }}
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
          onPress={() => {
            if (permitNumber.trim() === "") {
              // Show alert message if text is empty
              Alert.alert("Error", "Please Enter a Permit Number");
            } else {
              // Show success message if text is not empty
              onNext();
            }
          }}
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