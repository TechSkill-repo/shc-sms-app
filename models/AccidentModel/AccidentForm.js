import {
  View,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchLocations } from "../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";

const data = [
  { label: "Near Miss", value: "Near Miss" },
  { label: "First Aid", value: "First Aid" },
  { label: "Lost Time", value: "Lost Time" },
  { label: "Disable", value: "Disable" },
];

const AccidentForm = ({ isVisible, setIsVisible }) => {
  const windowHeight = Dimensions.get("window").height;
  const [accidentDate, setAccidentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [safetySupervisor, setSafetySupervisor] = useState("");
  const [personName, setPersonName] = useState("");

  const [acidentType, setAcidentType] = useState([]);
  const [selectedAcidentType, setSelectedAcidentType] = useState(null);

  const [accidentNote, setAccidentNote] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || accidentDate;
    setShowDatePicker(Platform.OS === "ios");
    setAccidentDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
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
    // setSelectedLocation(selectedLocation);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   location: selectedLocation.label,
    // }));
    setSelectedLocation(selectedLocation);
  };

  const handleActionTypeChange = (selectedActionType) => {
    setSelectedAcidentType(selectedActionType);
  };

  const handleSubmit = async () => {
    const formData = {
      accidentDate,
      location: selectedLocation.label,
      safetySupervisor,
      personName,
      accidentType: selectedAcidentType.value,
      accidentNote,
    };

    try {
      const response = await axios.post(
        serveraddress + `/accident/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to submit form");
      }

      // Reset form fields or close the modal
      setAccidentDate(new Date());
      setSelectedLocation(null);
      setSafetySupervisor("");
      setPersonName("");
      setSelectedAcidentType(null);
      setAccidentNote("");

      setIsVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      transparent
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        }}
      >
        <ScrollView
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            height: windowHeight * 0.9, // 70% of the screen height
            marginTop: windowHeight * 0.1, // 30% from the top
            padding: 25,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#21005d",
              }}
            >
              Accident Form
            </Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "300",
            }}
          >
            Fill in the details as for your report
          </Text>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                mode="outlined"
                label="Accident Date"
                value={accidentDate.toLocaleDateString()}
                editable={false}
                style={{
                  backgroundColor: "white",
                  marginBottom: 10,
                }}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={accidentDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

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
            <TextInput
              mode="outlined"
              label="Safety Supervisor"
              value={safetySupervisor}
              onChangeText={setSafetySupervisor}
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <TextInput
              mode="outlined"
              label="Person Name"
              value={personName}
              onChangeText={setPersonName}
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={`Acident Type`}
              searchPlaceholder="Search..."
              value={selectedAcidentType} // Use selectedLocation here
              onChange={handleActionTypeChange}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
            />
            <TextInput
              mode="outlined"
              label="Write a Accident Note..."
              value={accidentNote}
              onChangeText={setAccidentNote}
              multiline
              numberOfLines={4} // Set the number of lines you want to display
              style={{
                backgroundColor: "white",
                marginBottom: 10,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#21005d",
              height: 45,
              borderRadius: 50,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "white",
              }}
            >
              SUBMIT REPORT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AccidentForm;

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 7,
    padding: 12,
    borderColor: "#212121",
    borderWidth: 0.8,
    marginVertical: 10,
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
