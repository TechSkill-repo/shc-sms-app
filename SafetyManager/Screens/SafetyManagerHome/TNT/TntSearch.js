import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign, Entypo } from "@expo/vector-icons";

const monthData = [
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

const yearData = [
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
];

const DropdownField = ({ style, placeholder, value, onChange, data, icon }) => (
  <View style={styles.fieldContainer}>
    <Dropdown
      style={[styles.dropdown, style]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} name={icon} size={20} />
      )}
    />
  </View>
);

const TntSearch = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  searchFsgr,
  setShowSearch,
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <ScrollView
          style={[
            styles.modalContent,
            { height: windowHeight * 0.6, marginTop: windowHeight * 0.4 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Search Your Tools Tackles</Text>
            <Entypo
              name="cross"
              size={30}
              color="red"
              onPress={() => setShowSearch(false)}
            />
          </View>
          <DropdownField
            placeholder="Location"
            value={selectedLocation}
            onChange={setSelectedLocation}
            data={locations.map((location) => ({
              label: location.name,
              value: location.id,
            }))}
            icon="Safety"
          />
          <DropdownField
            placeholder="Month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            data={monthData}
            icon="calendar"
          />
          <DropdownField
            placeholder="Year"
            value={selectedYear}
            onChange={setSelectedYear}
            data={yearData}
            icon="calendar"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButton} onPress={searchFsgr}>
              <Text style={styles.searchButtonText}>Find Tools & Tackles</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#21005d",
  },
  fieldContainer: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 5,
  },
  icon: { marginRight: 5 },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
  iconStyle: { width: 20, height: 20 },
  inputSearchStyle: { height: 40, fontSize: 16 },
  buttonContainer: { justifyContent: "center", alignItems: "center" },
  searchButton: {
    backgroundColor: "#21005d",
    width: "100%",
    padding: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  searchButtonText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default TntSearch;
