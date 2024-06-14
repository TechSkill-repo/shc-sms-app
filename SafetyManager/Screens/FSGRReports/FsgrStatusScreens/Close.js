import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";
import SsiCloseReport from "../../../models/ProcessForms/SsiCloseReport";
import CloseReport from "../../../models/ProcessForms/CloseReport";
import { SimpleLineIcons } from "@expo/vector-icons";

import { fetchLocations } from "../../../../components/Global/Global";
import { Dropdown } from "react-native-element-dropdown";
import useAuthStore from "../../../../store/userAuthStore";

const Close = ({ loadSearchBar }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const [locations, setLocations] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState(null);

  const selectedLocation = useAuthStore((state) => state.selectedLocation);
  const setSelectedLocation = useAuthStore(
    (state) => state.setSelectedLocation
  );

  useEffect(() => {
    fetchData();
  }, [searchLocation]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serveraddress}fsgr/form/close/${searchLocation}`
      );
      if (response.data && response.data.length > 0) {
        setData(response.data);
      } else {
        ``;
        setDataNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
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
          <View style={styles.dropdownContainer}>
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
              onChange={(loc) => {
                setSelectedLocation(loc.label);
                fetchData();
              }}
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
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : dataNotFound ? (
        <Text>No data found</Text>
      ) : (
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
              <View style={styles.textContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                <View style={styles.subContainer}>
                  <Text style={styles.text}>Location: </Text>
                  <Text style={styles.location}>
                    {item.location === null ? "" : item.location}
                  </Text>
                </View>
                <Text style={styles.createdAt}>
                  {item.createdAt.slice(0, 10)}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.status,
                    {
                      backgroundColor:
                        item.status === "progress" ? "#f44336" : "#4caf50",
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {item.status === "progress" ? "Planning Phase" : "Close"}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
      <CloseReport isVisible={isVisible} setIsVisible={setIsVisible} id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
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
  color: {
    color: "#21005d",
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

  // dropdown
  dropdown: {
    width: "90%",
    marginBottom: 10,
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
    alignSelf: "center",
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

export default Close;
