import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AccidentPopup from "../../../models/AccidentModel/AccidentPopup";
import { serveraddress } from "../../../assets/values/Constants";
import axios from "axios";
import Loading from "../../../assets/logo/Loading.png";

const FirstAde = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${serveraddress}accident/first_aid/`);
        if (response.data) {
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

    fetchData(); // Fetch data when component mounts
  }, []);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Image
          source={Loading}
          style={{
            height: 500,
            width: "100%",
          }}
        />
      ) : data ? (
        data.map((data) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
                setId(data.id);
              }}
              key={data.id}
              style={styles.container}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "#505050",
                  }}
                >
                  Date {data.Date.slice(0, 10)}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.text}>Location</Text>
                  <Text style={styles.textLocation}>
                    {data.Location === null ? "" : data.Location}
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign
                  name="right"
                  size={20}
                  opacity={0.5}
                  color="#21005d"
                />
              </View>
            </TouchableOpacity>
          );
        })
      ) : dataNotFound ? (
        <Text>No data found</Text>
      ) : null}

      <AccidentPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        id={id}
        endPoint="first_aid"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
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

export default FirstAde;
