import { View, Text, Alert, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { fetchLocations } from "../../../components/Global/Global";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const Form = ({
  handleSubmit,
  fsgrData,
  setFsgrData,
  currentDate,
  currentTime,
}) => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
    setFsgrData((prevState) => ({
      ...prevState,
      Location: selectedLocation.label,
    }));
    setIsFocus(false);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Location
        </Text>
      );
    }
    return null;
  };

  return (
    <ScrollView
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <TextInput
          mode="outlined"
          label="Report Time"
          value={currentDate}
          editable={false}
          style={{
            width: "45%",
          }}
        />
        <TextInput
          mode="outlined"
          value={currentTime}
          label="Time of report"
          style={{
            width: "45%",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <TextInput
          mode="outlined"
          label="Location"
          style={{
            marginTop: 20,
            width: "95%",
          }}
          onChangeText={(Location) => {
            setFsgrData({ ...fsgrData, Location });
          }}
        /> */}

        <View style={styles.container}>
          {renderLabel()}

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={locations.map((Location) => ({
              label: Location.name,
              value: Location.id,
            }))}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Location' : '...'}
            searchPlaceholder="Search..."
            value={selectedLocation} // Use selectedLocation here
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={handleLocationChange}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}

            onChangeText={(Location) => {
              setFsgrData({ ...fsgrData, Location });
            }}
          />
        </View>

        <TextInput
          mode="outlined"
          label="Employee Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Emp_Name) => {
            setFsgrData({ ...fsgrData, Emp_Name });
          }}
        />
        <TextInput
          mode="outlined"
          label="Employee Designation"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Emp_Designation) => {
            setFsgrData({ ...fsgrData, Emp_Designation });
          }}
        />
        <TextInput
          mode="outlined"
          label="Incharge Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Incharge_Name) => {
            setFsgrData({ ...fsgrData, Incharge_Name });
          }}
        />
        <TextInput
          mode="outlined"
          label="Safety Supervisor Name"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Site_Supervisior) => {
            setFsgrData({ ...fsgrData, Site_Supervisior });
          }}
        />
        <TextInput
          mode="outlined"
          label="What is your problem ?"
          style={{
            marginTop: 10,
            width: "95%",
          }}
          onChangeText={(Message) => {
            setFsgrData({ ...fsgrData, Message });
          }}
          multiline
          numberOfLines={3}
        />
        <Button
          icon="camera"
          mode="contained"
          style={{
            backgroundColor: "#1976d2",
            borderRadius: 4,
            marginTop: 10,
            width: "90%",
          }}
          onPress={() => console.log("Pressed")}
        >
          Click Photo
        </Button>
        <Button
          icon="check"
          mode="contained"
          onPress={() => {
            fsgrData.Message === ""
              ? Alert.alert("Please Fill The Form", "", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ])
              : handleSubmit();
          }}
          style={{
            marginTop: 20,
            width: "95%",
          }}
        >
          Submit your FSGR
        </Button>
      </View>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width:"103%",
    marginBottom:-15
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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

