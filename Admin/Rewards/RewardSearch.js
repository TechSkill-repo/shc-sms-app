import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { serveraddress } from "../../assets/values/Constants";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { fetchLocations } from "../../components/Global/Global";

const RewardSearch = ({ visible, setVisible, setRewards }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const windowHeight = Dimensions.get("window").height;

  console.log("year:", year);
  console.log("month:", month);
  console.log("location:", selectedLocation);
  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        // console.log(data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocationsData();
  }, []);

  const handleSubmit = async () => {
    if (!year || !month || !selectedLocation) {
      Alert.alert("Error", "Please select all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${serveraddress}rewards/${year}/${month}/${selectedLocation}`
      );
      setRewards(response.data);
      setVisible(false);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch rewards");
      console.error("Error fetching rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  const yearOptions = [
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    // Add more years as needed
  ];

  const monthOptions = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <ScrollView
          style={[
            styles.container,
            { height: windowHeight * 0.6, marginTop: windowHeight * 0.4 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Search</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
          </View>

          <Dropdown
            data={yearOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            value={year}
            onChange={(item) => setYear(item.value)}
            style={styles.dropdown}
          />

          <Dropdown
            data={monthOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Month"
            value={month}
            onChange={(item) => setMonth(item.value)}
            style={styles.dropdown}
          />

          {/* <TextInput
            label="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
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
            value={selectedLocation}
            onChange={(location) => {
              setSelectedLocation(location.label);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Search</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
    color: "#21005d",
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "#21005d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RewardSearch;
