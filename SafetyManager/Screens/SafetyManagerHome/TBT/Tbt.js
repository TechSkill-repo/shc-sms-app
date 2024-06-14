// FsgrInfo.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Appbar } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import BottomPopup from "./BottomPopup";
import SearchForm from "./TbtSearch";
import NotFound from "../../../../assets/icons/nodata.png";
import { Feather } from "@expo/vector-icons";
import { serveraddress } from "../../../../assets/values/Constants";
import { fetchLocations } from "../../../../components/Global/Global";

const Tbt = () => {
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
    const fetchLocationsData = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocationsData();
  }, []);

  const searchFsgr = async () => {
    if (!selectedLocation || !selectedMonth || !selectedYear) {
      console.error("Location, month, and year must be selected");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${serveraddress}forms/tbm-form/${selectedYear.value}/${selectedMonth.value}/${selectedLocation.label}`
      );
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
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="TBM" />
        <Appbar.Action
          icon="magnify"
          onPress={() => setShowSearch(!showSearch)}
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.mainContainer}>
          {showSearch && (
            <SearchForm
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              searchFsgr={searchFsgr}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              setShowSearch={setShowSearch}
            />
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : data.length > 0 ? (
            data.map((item) => (
              <TouchableOpacity
                style={styles.itemContainer}
                key={item.id}
                onPress={() => {
                  setIsVisible(true);
                  setId(item.id);
                }}
              >
                <View style={styles.itemContent}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemHeading}>
                      Permit.No {item.permitNumber}
                    </Text>
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
                      <Text style={styles.statusText}>View More</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Image source={NotFound} style={styles.noDataImage} />
              <Text style={styles.noDataText}>
                Please Search your Required TBM
              </Text>
              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={styles.searchButton}
              >
                <Feather name="search" size={22} color="#21005d" />
                <Text style={styles.searchButtonText}>Search TBM</Text>
              </TouchableOpacity>
            </View>
          )}
          <BottomPopup
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            id={id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  mainContainer: {
    marginTop: 20,
    height: "100%",
    alignItems: "center",
  },
  itemContainer: {
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
  itemContent: {
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
    backgroundColor: "#3764d01a",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3764d0",
  },
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
  searchButton: {
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
});

export default Tbt;