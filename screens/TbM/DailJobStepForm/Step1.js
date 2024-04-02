import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import {
  fetchLocations,
  getShiftOptions,
  locationData,
} from "../../../components/Global/Global";

const Step1 = ({ onNext, formData, setFormData }) => {
  const shiftOptions = getShiftOptions();
  // console.log("shift options:", shiftOptions);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // const currentDate = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [workPermitNumber, setworkPermitNumber] = useState("");
  const [location, setLocation] = useState("");

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

  useEffect(() => {
    // Update the current date in formData whenever it changes
    const formattedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    setFormData((prevData) => ({ ...prevData, currentDate: formattedDate }));
  }, [currentDate, setFormData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      currentDate: `${day}/${month}/${year}`,
    }));
  }, [currentDate, setFormData]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      currentTime: `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`,
    }));
  }, [currentTime, setFormData]);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, shift: shift }));
  }, [shift, setFormData]);

  // useEffect(() => {
  //   // Update the current date in formData whenever it changes
  //   setFormData((prevData) => ({ ...prevData, currentDate }));
  // }, [currentDate, setFormData]);
  // Extract hours, minutes, and seconds
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Extract day, month (in number), and year
  const day = currentDate.getDate(); // Returns the day of the month (1-31)
  const month = currentDate.getMonth() + 1; // Returns the month (0-11); adding 1 to get the actual month number
  const year = currentDate.getFullYear(); // Returns the year (e.g., 2024)

  // const handleDateChange = (newDate) => {
  //   setCurrentDate(newDate);
  //   setFormData({ ...formData, currentDate: newDate });
  // };
  // console.log("currentDate", currentDate);

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

  // Function to handle time change
  const handleTimeChange = (newTime) => {
    setCurrentTime(newTime);
  };

  const [selectedValue, setSelectedValue] = useState("");

  // Define the onChange method for the dropdown
  const handleDropdownChange = (selectedValue) => {
    const { label, value } = selectedValue;
    console.log("Selected value:", label);
    // Update formData state with the selected value
    setFormData((prevState) => ({
      ...prevState,
      shift: value, // Assuming 'shift' is the key in formData where you want to store the selected value
    }));
  };

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
    setFormData((prevState) => ({
      ...prevState,
      location: selectedLocation.label,
    }));
  };

  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
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
          // onChangeText={handleDateChange}
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
          // onChangeText={handleTimeChange}
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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={shiftOptions}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={`Shift`}
          searchPlaceholder="Search..."
          value={selectedValue}
          onChange={handleDropdownChange}
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
          Site Location
        </Text>
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
          value={workPermitNumber}
          placeholder="Enter Your Permit Number"
          // onChangeText={(permitNumber)=>{setFormData({...formData, permitNumber})}}
          keyboardType="numeric"
          onChangeText={(workPermitNumber) => {
            setworkPermitNumber(workPermitNumber);
            setFormData({ ...formData, workPermitNumber });
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
