import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";
import BottomPopup from "./BottomPopup";

import { SimpleLineIcons } from "@expo/vector-icons";

import { fetchLocations } from "../../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";
import useAuthStore from "../../../../store/userAuthStore";

import { Feather } from "@expo/vector-icons";
import { fetchLocations } from "../../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";
import NoDataFound from "../../../../assets/icons/nodata.png";

const Pending = ({ loadSearchBar, toggleSearchBar }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [locations, setLocations] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);

  // Use Zustand store for selected location
  const selectedLocation = useAuthStore((state) => state.selectedLocation);
  const setSelectedLocation = useAuthStore(
    (state) => state.setSelectedLocation
  );

  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const data = await fetchLocations();
        console.log("Locations fetched:", data);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocationsData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchLocation]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serveraddress}fsgr/form/pending/${searchLocation}`
      );
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {loadSearchBar && (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location"
            onChangeText={setSearchLocation}
          />

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
            placeholder="Location"
            searchPlaceholder="Search..."
            value={selectedLocation}
            onChange={(loc) => setSelectedLocation(loc.label)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchData}>
            <SimpleLineIcons
              name="magnifier"
              size={20}
              color="blue"
              style={styles.searchIcon}
            />
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
        <View style={styles.noDataContainer}>
          <Image source={NoDataFound} style={styles.noDataImage} />
          <Text style={styles.noDataText}>Please Select Your Location</Text>
          <TouchableOpacity
            onPress={toggleSearchBar}
            style={styles.searchButtonContainer}
          >
            <Feather name="search" size={22} color="#21005d" />
            <Text style={styles.searchButtonText}>Search FSGR</Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomPopup isVisible={isVisible} setIsVisible={setIsVisible} id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    marginTop: 0,
    marginHorizontal: 20,
    width: "100%",
    alignItems: "center",
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
    alignItems: "flex-start",
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

  noDataContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  noDataImage: {
    height: 300,
    width: "100%",
  },
  noDataText: {
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
  searchButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#21005d1a",
    marginTop: 40,
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 50,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#21005d",
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 10,
  },

  dropdown: {
    width: "90%",
    marginBottom: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignSelf: "center",
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

export default Pending;
