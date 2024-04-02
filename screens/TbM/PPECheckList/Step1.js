import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { fetchLocations } from "../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";

const Step1 = ({ onNext, formData, setStep1Data }) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const currentDate = new Date();

  const [workOrderNumber, setworkOrderNumber] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date());

  const [shift, setShift] = useState("");

  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocationsData();
  }, []);

  const handleLocationChange = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setStep1Data((prevState) => ({
      ...prevState,
      location: selectedLocation.label,
    }));
  };

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
        {/* <TextInput
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
        /> */}

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations.map((location) => ({
            label: location.name,
            value: location.id,
          }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={`Location`}
          searchPlaceholder="Search..."
          value={selectedLocation} // Use selectedLocation here
          onChange={handleLocationChange}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
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
          Work order number
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
          placeholder="Work order number"
          value={workOrderNumber}
          onChangeText={(workOrderNumber) => {
            setworkOrderNumber(workOrderNumber);
            setStep1Data({ ...formData, workOrderNumber });
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
            if (workOrderNumber.trim() === "") {
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

const styles = StyleSheet.create({
  dropdown: {
    width: "90%",
    margin: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
