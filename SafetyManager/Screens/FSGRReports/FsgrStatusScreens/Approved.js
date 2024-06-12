import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput 
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomPopup from "./BottomPopup";
import axios from "axios";
import { serveraddress } from "../../../../assets/values/Constants";
import InitialInvestigationReport from "../../../models/ProcessForms/InitialInvestigationReport";
import { SimpleLineIcons } from "@expo/vector-icons";

const Approved = ({ loadSearchBar }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchLocation]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${serveraddress}fsgr/form/approved/${searchLocation}`
      );
      if (response.data && response.data.length > 0) {
        setData(response.data);
      } else {
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#505050",
                  }}
                >
                  {item?.heading}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "start",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.text}>Location</Text>
                    <Text style={styles.textLocation}>
                      {item.location === null ? "" : item.location}
                    </Text>
                  </View>

                  <Text> {item.createdAt.slice(0, 10)}</Text>
                </View>
              </View>
              <View style={{ width: "30%" }}>
                <View
                  style={{
                    backgroundColor: "#4caf501a",
                    paddingHorizontal: 2,
                    paddingVertical: 5,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#4caf50",
                    }}
                  >
                    Approved
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
      <InitialInvestigationReport
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        id={id}
      />
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
});

export default Approved;
