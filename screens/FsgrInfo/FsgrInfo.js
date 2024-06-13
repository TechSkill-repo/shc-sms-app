import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Appbar } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { serveraddress } from "../../assets/values/Constants";
import BottomPopup from "../../components/Global/UnderConstruction/BottomPopup";
import { fetchLocations } from "../../components/Global/Global";

const FsgrInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showSearch, setShowSearch] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchLocationsData() {
      try {
        const data = await fetchLocations();
        console.log("Locations fetched:", data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }
    fetchLocationsData();
  }, []);

  const handleLocationChange = (item) => {
    setSelectedLocation(item);
  };

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };

  const handleYearChange = (item) => {
    setSelectedYear(item);
  };

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

  const searchFsgr = async () => {
    if (!selectedLocation || !selectedMonth || !selectedYear) {
      console.error("Location and month must be selected");
      return;
    }
    console.log(
      "Searching with location:",
      selectedLocation,
      "month:",
      selectedMonth,
      "year:",
      selectedYear
    );
    setLoading(true);
    try {
      const response = await axios.get(
        `${serveraddress}fsgr/${selectedYear.value}/${selectedMonth.value}/${selectedLocation.label}`
      );
      console.log("Response data:", response.data);
      setData(response.data || []);
      setShowSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="FSGR Reports" />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setShowSearch((prevState) => !prevState);
          }}
        />
      </Appbar.Header>
      <View>
        <View style={styles.mainContainer}>
          {showSearch && (
            <View
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 0.5,
                borderRadius: 8,
                backgroundColor: "#ffffff",
                // shadowColor: "#000",
                // // Elevation for Android
                // elevation: 4,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  width: "100%",
                }}
              >
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
                style={{ marginTop: 10, marginHorizontal: 20, width: "100%" }}
              >
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={monthData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Month"
                  value={selectedMonth} // Use selectedMonth here
                  onChange={handleMonthChange}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="calendar"
                      size={20}
                    />
                  )}
                />
              </View>
              <View
                style={{ marginTop: 10, marginHorizontal: 20, width: "100%" }}
              >
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={yearData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Year"
                  value={selectedYear} // Use selectedYear here
                  onChange={handleYearChange}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="calendar"
                      size={20}
                    />
                  )}
                />
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#21005d",
                  padding: 10,
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 30,
                  borderRadius: 5,
                }}
                onPress={searchFsgr}
              >
                <Text
                  style={{ color: "white", fontSize: 14, fontWeight: "bold" }}
                >
                  Find FSGR
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data.length > 0 ? (
            data.map((item) => (
              <TouchableOpacity
                style={styles.container}
                key={item.id}
                onPress={() => {
                  setIsVisible(true);
                  setId(item.id);
                }}
              >
                <View style={styles.itemContainer}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemHeading}>{item.heading}</Text>
                    <View style={styles.itemInfo}>
                      <View style={styles.itemRow}>
                        <Text style={styles.text}>Location</Text>
                        <Text style={styles.textLocation}>
                          {item.location || ""}
                        </Text>
                      </View>
                      <View style={styles.itemRow}>
                        <Text style={styles.itemDate}>
                          {item.createdAt.slice(0, 10)}
                        </Text>
                        <Text style={styles.itemPriority}>
                          {item.priority || ""}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.statusContainer}>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Pending</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No data found</Text>
          )}
          <BottomPopup
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            id={id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  searchInput: {
    width: "90%",
    height: 42,
    borderRadius: 8,
    paddingStart: 10,
    backgroundColor: "white",
    elevation: 5,
    marginTop: 5,
  },
  searchButton: {
    width: "10%",
    position: "absolute",
    left: 300,
    marginTop: 8,
    borderLeftWidth: 0.3,
    borderLeftColor: "grey",
    padding: 5,
    alignSelf: "center",
  },
  searchIcon: {
    marginStart: 8,
  },
  container: {
    backgroundColor: "#fffbfe",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemDetails: {
    width: "70%",
  },
  itemHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#505050",
  },
  itemInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "start",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: "400",
    color: "#505050",
  },
  textLocation: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#21005d",
    marginLeft: 10,
  },
  itemDate: {
    marginRight: 10,
    fontSize: 13,
    fontWeight: "300",
    color: "black",
  },
  itemPriority: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f44336",
  },
  statusContainer: {
    width: "30%",
  },
  statusBadge: {
    backgroundColor: "#fff4e5",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#663c00",
  },

  // dropdown
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

export default FsgrInfo;
