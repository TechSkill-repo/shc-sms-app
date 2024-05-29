import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { serveraddress } from "../../../../assets/values/Constants";
import axios from "axios";
import BottomPopup from "./BottomPopup";

const Pending = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serveraddress}fsgr/form/pending`);
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

    fetchData();
  }, []);
  return (
    <View style={styles.mainContainer}>
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
                    {item.createdAt.slice(0, 10)}
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
