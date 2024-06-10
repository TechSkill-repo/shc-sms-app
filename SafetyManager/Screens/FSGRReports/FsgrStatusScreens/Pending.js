import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { serveraddress } from "../../../../assets/values/Constants";
import axios from "axios";
import BottomPopup from "./BottomPopup";
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";

const Pending = ({ loadSearchBar }) => {
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
      const response = await axios.get(`${serveraddress}fsgr/form/pending/${searchLocation}`
      //   , {
      //   params: {
      //     location: searchLocation, // Pass location as a query parameter
      //   },
      // }
    );
      if (response.data) {
        setData(response.data);
        console.log(response.data);
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
      {loadSearchBar ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TextInput
            style={{
              width: "90%",
              height: 42,
              borderWidth: 0.5,
              // alignSelf: "center",
              borderRadius: 8,
              paddingStart: 10,
            }}
            placeholder="Search by location"
            onChangeText={(text) => setSearchLocation(text)}
          />
          <TouchableOpacity
            style={{
              display: "flex",
              width: "10%",
              position: "absolute",
              left: 300,
              marginTop: 8,
              borderLeftWidth: 0.3,
              borderLeftColor: "grey",
              padding: 3,
              alignSelf: "center",
            }}
            onPress={fetchData}
          >
            <SimpleLineIcons
              name="magnifier"
              size={20}
              color="blue"
              style={{ marginStart: 8 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        data.map((item) => {
          return (
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
                    {item.heading}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "start",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.text}>Location</Text>
                      <Text style={styles.textLocation}>
                        {item.location === null ? "" : item.location}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: 13,
                          fontWeight: "300",
                          color: "black",
                        }}
                      >
                        {item.createdAt.slice(0, 10)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: "#f44336",
                        }}
                      >
                        {item.priority === null ? "" : item.priority}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: "30%" }}>
                  <View
                    style={{
                      backgroundColor: "#fff4e5",
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
                        color: "#663c00",
                      }}
                    >
                      Pending
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      ) : dataNotFound ? (
        <Text>No data found</Text>
      ) : null}

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

export default Pending;
